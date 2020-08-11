import Hapi from "@hapi/hapi";
import debug from "debug";
import os from "os";
import qs from "qs";
import inert from "inert";
import appdynamics from "appdynamics";

const log = debug("export:server");
const error = debug("export:server:error");

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
  appdynamics.profile({
    controllerHostName: "ec2-54-214-166-126.us-west-2.compute.amazonaws.com",
    controllerPort: 8090,
    controllerSslEnabled: false, // Set to true if controllerPort is SSL
    accountName: "customer1",
    accountAccessKey: "16ff4175-95c7-4c2f-807d-fb083e398055", //required
    applicationName: "hub-precos",
    tierName: "export",
    nodeName: "hub-precos-export",
    reuseNode: true,
    reuseNodePrefix: "hub-precos-export",
    noNodeNameSuffix: false,
    logging: {
      logfiles: [
        {
          root_directory: "./logs",
          filename: "echo_%N.log",
          level: "DEBUG",
          max_size: 5242880,
          max_files: 10,
          // outputType: "console", // Set this parameter if you want to log to STDOUT/STDERR. Omit this parameter if you want to log to a file.
        },
      ],
    },
  });
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
