import Hapi from "@hapi/hapi";
import os from "os";
import inert from "inert";

const server = new Hapi.Server({
  port: process.env.PORT || 8081,
  host: os.platform() === "win32" ? "localhost" : "0.0.0.0",
  routes: { cors: { origin: ["*"], credentials: true } },
  query: { parser: (query) => qs.parse(query) },
  debug: { request: ["error"] },
});

const init = async () => {
  // await jwtRegister();

  // server.route(routes);
  await server.initialize();

  return server;
};

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  log(`Server running at: ${server.info.uri}`);

  return server;
};

// route
server.route({
  method: "GET",
  path: "/aboutus",
  handler: (req, h) => {
    return "<h1>About Us</h1>";
  },
});

server.route({
  method: "GET",
  path: "/staticpage",
  handler: (req, h) => {
    return h.file("./public/static.html");
  },
});

const bootUpServer = async () => {
  await server.register(inert);
  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
};

bootUpServer();

export { init, start };
