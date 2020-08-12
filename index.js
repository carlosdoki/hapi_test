import appdynamics from "appdynamics";

appdynamics.profile({
  controllerHostName: "kroton.saas.appdynamics.com",
  controllerPort: 443,
  controllerSslEnabled: true, // Set to true if controllerPort is SSL
  accountName: "kroton",
  accountAccessKey: "", //required
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
