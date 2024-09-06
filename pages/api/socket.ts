import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";

const rooms: { [key: string]: { host?: string; opponent?: string; choices: { [key: string]: string } } } = {};

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: Server;
    };
  };
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const determineWinner = (host: string, opponent: string, choices: any): {
  winner?: string;
  draw: boolean;
} => {
  const hostChoice = choices[host]
  const opponentChoice = choices[opponent]

  if (hostChoice === opponentChoice) return { draw: true }
  if (
    (hostChoice === "rock" && opponentChoice === "scissors") ||
    (hostChoice === "scissors" && opponentChoice === "paper") ||
    (hostChoice === "paper" && opponentChoice === "rock")
  ) {
    return {
      winner: host,
      draw: false
    }
  }
  return {
    winner: opponent,
    draw: false
  }
};

const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket) {
    res.status(500).send("Socket not available");
    return;
  }

  if (res.socket.server.io) {
    console.log("Socket.io server already running");
    res.end();
    return;
  }

  const httpServer = res.socket.server as unknown as HTTPServer;
  const io = new Server(httpServer, {
    path: "/api/socket",
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("createRoom", (roomCode) => {
      if (!rooms[roomCode]) {
        rooms[roomCode] = { host: socket.id, opponent: undefined, choices: {} };
        socket.join(roomCode);
        socket.emit("socketCreateRoom", {roomCode, hostId: socket.id});
      } else {
        socket.emit("roomExists");
      }
    });

    socket.on("joinRoom", (roomCode) => {
      if (rooms[roomCode]) {

        if(!rooms[roomCode].opponent) {
          rooms[roomCode].opponent = socket.id;
        } else {
          socket.emit("roomBusy");
        }

        socket.join(roomCode);
        socket.emit("joinedRoom", {roomCode, playerId: socket.id});
        socket.to(roomCode).emit("playerJoined");
      } else {
        socket.emit("roomNotFound");
      }
    });

    socket.on("play", (roomCode, playerId, choice) => {
      if (rooms[roomCode]) {
        // Save player's choice
        rooms[roomCode].choices[playerId] = choice;
    
        // Emit the current state to both players
        Object.keys(rooms[roomCode].choices).forEach((player) => {
          io.to(player).emit("gameState", rooms[roomCode].choices[playerId]);
        });
    
        // If both players have made a choice
        if (Object.keys(rooms[roomCode].choices).length === 2) {
          const result = determineWinner(
            rooms[roomCode].host!,
            rooms[roomCode].opponent!,
            rooms[roomCode].choices,
          );
          console.log("Game results are ready", result, rooms[roomCode].choices);
    
          // Emit the game result to both players
          Object.keys(rooms[roomCode].choices).forEach((player) => {
            io.to(player).emit("gameResult", {
              result,
              choices: rooms[roomCode].choices,
            });
          });
        }
      }
    });
    
    socket.on('playAgain', (roomCode) => {
      if (rooms[roomCode]) {
          rooms[roomCode].choices = {};
          const host = rooms[roomCode].host!
          const opponent = rooms[roomCode].opponent!

          io.to(host).emit("replay", host);
          io.to(opponent).emit("replay", opponent);
      }
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      // Clean up room data if necessary
      for (const roomCode in rooms) {
          delete rooms[roomCode].host
          delete rooms[roomCode].opponent
          delete rooms[roomCode].choices[socket.id];
          if (!rooms[roomCode].host && !rooms[roomCode].opponent) {
            delete rooms[roomCode];
          }
          break;
      }
    });
  });

  res.end();
};

export default socketHandler;