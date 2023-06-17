import { Router } from "express";
import producto from "./productos";
import usuario from "./usuario";
import auth from "./auth";

const routes = Router();

routes.use("/productos", producto);
routes.use("/usuarios", usuario);
routes.use("/auth", auth);

export default routes;
