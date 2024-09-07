import {
  ReactNode,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

type ContextType = {
    roomCode?: string;
    setRoomCode?: Dispatch<SetStateAction<string | undefined>>;
};

const Context = createContext<ContextType>({});

export const useStore = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [roomCode, setRoomCode] =
        useState<ContextType['roomCode']>(undefined);

  return (
    <Context.Provider value={{ roomCode, setRoomCode }}>
      {children}
    </Context.Provider>
  );
};

export default StoreProvider;
