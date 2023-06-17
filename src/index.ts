import * as express from "express";
import { AppDataSource } from "./data-source";
import cors = require("cors");
import helmet from "helmet";
import routes from "./routes";

const PORT = process.env.port || 3000;

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use("/", routes);

    // start express server
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto: ${PORT}`)
    );
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/Productos to see results"
    );
  })
  .catch((error) => console.log(error));
