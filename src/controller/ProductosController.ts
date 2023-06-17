import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";
import { validate } from "class-validator";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);
      // Método asíncrono, await significa "espera", lo cual indica que se espera la respuesta del servidor.
      // Buscar en la tabla "productos" los productos cuyo estado sea verdadero.
      // Esto es para eliminar de la lista los productos con estado falso.
      const listaProductos = await productosRepo.find({
        where: { estado: true },
      });
      // Condición en caso de que no haya productos.
      if (listaProductos.length === 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontraron resultados." });
      }
      // Si hay productos, se imprime la lista de productos.
      return resp.status(200).json({ listaProductos });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);
      const id = parseInt(req.params["id"]);
      //Valida que no llega o no se indica el ID
      if (!id) {
        id;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      let producto;
      try {
        producto = await productosRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }
      return resp.status(200).json({ producto });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //destructuring
      const { id, nombre, precio, stock, fechaIngreso } = req.body;
      //Validacion de datos de entrada
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el ID" });
      }
      if (!nombre) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el nombre del producto" });
      }
      if (!precio) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar el precio del producto" });
      }
      if (precio < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar un precio mayor a 0" });
      }
      if (!stock) {
        return resp.status(404).json({ mensaje: "Debe indicar el stock" });
      }
      if (stock < 0) {
        return resp
          .status(404)
          .json({ mensaje: "Debe indicar un stock mayor a 0" });
      }

      //Validaciones de reglas de negocio
      const productosRepo = AppDataSource.getRepository(Producto);
      const pro = await productosRepo.findOne({ where: { id } });
      if (pro) {
        return resp
          .status(404)
          .json({ mensaje: "El producto ya existe en la base de datos." });
      }
      const fecha = new Date();
      let producto = new Producto();
      producto.id = id;
      producto.nombre = nombre;
      producto.precio = precio;
      producto.stock = stock;
      producto.fechaIngreso = fecha;
      producto.estado = true;

      //Validar con classvalidator
      const errors = await validate(producto, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await productosRepo.save(producto);
      return resp.status(201).json({ mensaje: "Producto creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    //destructuring
    const { id, nombre, precio, stock, fechaIngreso } = req.body;

    //Validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del producto" });
    }
    if (!precio) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el precio del producto" });
    }
    if (precio < 0) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar un precio mayor a 0" });
    }
    if (!stock) {
      return resp.status(404).json({ mensaje: "Debe indicar el stock" });
    }
    if (stock < 0) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar un stock mayor a 0" });
    }

    //Validaciones de reglas de negocio
    const productosRepo = AppDataSource.getRepository(Producto);
    let pro: Producto;
    try {
      pro = await productosRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return resp.status(404).json({ mensaje: "No existe el producto" });
    }

    pro.nombre = nombre;
    pro.precio = precio;
    pro.stock = stock;

    //Validar con classvalidator
    const errors = await validate(pro, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await productosRepo.save(pro);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No existe el producto" });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el Id" });
      }
      const productosRepo = AppDataSource.getRepository(Producto);
      let pro: Producto;
      try {
        pro = await productosRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro el producto" });
      }
      //como el estado es true siempre que haya producto
      //al ponerle false se borra automaticamente
      pro.estado = false;
      try {
        await productosRepo.save(pro);
        return resp
          .status(200)
          .json({ mensaje: "Producto eliminado correctamente" });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default ProductosController;
