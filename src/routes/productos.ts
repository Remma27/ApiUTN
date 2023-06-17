import { Router } from "express";
import ProductosControlller from "../controller/ProductosController";
import { checkjwt } from "../middleware/jwt";
import { checkRoles } from "../middleware/roles";

const routes = Router();

routes.get("", checkjwt, checkRoles(["admin"]), ProductosControlller.getAll);
routes.get("/:id", ProductosControlller.getById);
routes.post("", ProductosControlller.add);
routes.patch("", ProductosControlller.update);
routes.delete("/:id", ProductosControlller.delete);

export default routes;
