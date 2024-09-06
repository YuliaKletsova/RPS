module.exports = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "": undefined,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};
