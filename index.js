import appdynamics from "appdynamics";

appdynamics.profile({
  controllerHostName: "ec2-54-188-162-226.us-west-2.compute.amazonaws.com",
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

import { start } from "./server.js";
start();
