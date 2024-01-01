const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRoutes = require("./routes/userRoutes");
const dataBase = require("./setup/dbConfig");

const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major < 10 || (major === 10 && minor <= 0)) {
  console.log("Please go to nodejs.org and download version 10 or greater");
  process.exit();
}

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Manual CORS setup
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
//   res.header("Access-Control-Expose-Headers", "Content-Length");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Accept, Authorization, x-auth-token, Content-Type, X-Requested-With, Range"
//   );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   } else {
//     return next();
//   }
// });

// settingUp swagger

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeJS application testing",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./index.js","./routes/userRoutes.js","./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - HealthCheck
 *     summary: This is a health-checkUp API
 *     description: This Swagger doc is my first API doc, and I'm very excited
 *     responses:
 *       '200':
 *         description: To test whether the server is started or not
 */

 
//setting up environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

//database Connection
dataBase.connect();

// server setup
app.listen(PORT, (error) => {
  if (error) {
    console.error(`Failed to start server at port ${PORT}`);
    process.exit(1);
  } else {
    console.log(`Server is started at port ${PORT}`);
  }
});

//mounting the api routes
app.use("/api/v1", userRoutes);

//only for testing ignore it ---> suyash vikram singh
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello Suyash vikram Singh",
  });
});
