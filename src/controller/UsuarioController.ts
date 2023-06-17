import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { validate } from "class-validator";

class UsuarioController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const UsuarioRepo = AppDataSource.getRepository(Usuario);
      const listaUsuarios = await UsuarioRepo.find({
        where: { estado: true },
      });
      if (listaUsuarios.length === 0) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontraron resultados." });
      }
      return resp.status(200).json({ listaUsuarios });
    } catch (error) {
      return resp.status(400).json({ mensaje: error.message });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const UsuarioRepo = AppDataSource.getRepository(Usuario);
      const id = parseInt(req.params["id"]);
      if (!id) {
        id;
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      let usuario;
      try {
        usuario = await UsuarioRepo.findOneOrFail({
          where: { id, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el usuario con ese ID" });
      }
      return resp.status(200).json({ usuario });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { id, nombre, apellido1, apellido2, correo, contrasena, rol } =
        req.body;

      let fecha: Date;
      let usuario = new Usuario();
      usuario.id = id;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.fecha_ingreso = fecha;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      //Validar con classvalidator
      const errors = await validate(Usuario, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      //Validaciones de reglas de negocio
      const UsuarioRepo = AppDataSource.getRepository(Usuario);
      let usuarioExist = await UsuarioRepo.findOne({ where: { id } });
      if (usuarioExist) {
        return resp
          .status(400)
          .json({ mensaje: "El usuario ya existe en la base de datos." });
      }

      usuarioExist = await UsuarioRepo.findOne({ where: { correo: correo } });
      if (usuario) {
        resp
          .status(400)
          .json({ mensaje: "Ya existe un usuario registrado con el correo" });
      }

      await UsuarioRepo.save(usuario);
      return resp.status(201).json({ mensaje: "Usuario creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    //destructuring
    const {
      id,
      nombre,
      apellido1,
      apellido2,
      correo,
      contrasena,
      rol,
      estado,
    } = req.body;

    //Validacion de datos de entrada
    if (!id) {
      return resp.status(404).json({ mensaje: "Debe indicar el ID" });
    }
    if (!nombre) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el nombre del usuario" });
    }
    if (!apellido1) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el apellido del usuario" });
    }
    if (!apellido2) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el apellido del usuario" });
    }
    if (!correo) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el correo del usuario" });
    }
    if (!contrasena) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar la contrasena del usuario" });
    }
    if (!rol) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el rol del usuario" });
    }
    if (!estado) {
      return resp
        .status(404)
        .json({ mensaje: "Debe indicar el estado del usuario" });
    }

    //Validaciones de reglas de negocio
    const UsuarioRepo = AppDataSource.getRepository(Usuario);
    const usu = await UsuarioRepo.findOne({ where: { id } });
    if (usu) {
      return resp
        .status(404)
        .json({ mensaje: "El usuario ya existe en la base de datos." });
    }

    usu.nombre = nombre;
    usu.apellido1 = apellido1;
    usu.apellido2 = apellido2;
    usu.correo = correo;
    usu.contrasena = contrasena;
    usu.rol = rol;
    usu.estado = true;

    //Validar con classvalidator
    const errors = await validate(usu, {
      validationError: { target: false, value: false },
    });

    if (errors.length > 0) {
      return resp.status(400).json(errors);
    }

    try {
      await UsuarioRepo.save(usu);
      return resp.status(200).json({ mensaje: "Se guardo correctamente" });
    } catch (error) {
      return resp.status(400).json({ mensaje: "No existe el usuario" });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        return resp.status(404).json({ mensaje: "Debe indicar el Id" });
      }
      const UsuarioRepo = AppDataSource.getRepository(Usuario);
      let usu: Usuario;
      try {
        usu = await UsuarioRepo.findOneOrFail({
          where: { id: id, estado: true },
        });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se encontro el usuario" });
      }
      //como el estado es true siempre que haya producto
      //al ponerle false se borra automaticamente
      usu.estado = false;
      try {
        await UsuarioRepo.save(usu);
        return resp
          .status(200)
          .json({ mensaje: "Usuario eliminado correctamente" });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se pudo eliminar" });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "No se pudo eliminar" });
    }
  };
}

export default UsuarioController;
