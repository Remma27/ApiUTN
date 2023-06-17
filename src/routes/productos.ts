import { Router } from "express";
import ProductosControlller from "../controller/ProductosController";

const routes = Router();

routes.get('', ProductosControlller.getAll);
routes.get('/getById/:id', ProductosControlller.getById);
routes.post('', ProductosControlller.add);
routes.patch('',ProductosControlller.update);
routes.delete('/:id',ProductosControlller.delete);

export default routes;