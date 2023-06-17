import { Router } from "express";
import UsuarioController from "../controller/UsuarioController";

const routes = Router();

routes.get("", UsuarioController.getAll);
routes.get("/getById/:id", UsuarioController.getById);
routes.post("", UsuarioController.add);
routes.patch("", UsuarioController.update);
routes.delete("/:id", UsuarioController.delete);

export default routes;
