const Usuario = require('../modelos/usuario');

const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
  try {

      if (!req.body) {
          return res.status(400).json({ msg: 'No se enviaron datos en la solicitud' });
      }
      // Desestructurar el cuerpo de la solicitud
      const { nombre, contrasena, email } = req.body;
      // Validar campos obligatorios
      if (!nombre || !contrasena || !email) {
          return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
      }
      // Verificar si el correo ya existe
      const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
          return res.status(400).json({ msg: 'El correo ya está en uso' });
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({ msg: 'El formato del correo no es válido' });
      }
   
      // Crear un nuevo usuario
      const newUser = new Usuario({
          nombre,
          contrasena,
          email
      });
      // Guardar el usuario en la base de datos
      await newUser.save();
      
      
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET
      );
  
      // Devolver respuesta con token
      return res.status(201).json({ msg: 'Usuario creado exitosamente', token });
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error en el servidor');
  }
};

exports.ingresarUsuario = async (req, res) => {
  try {
      if (!req.body) {
          return res.status(400).json({ msg: 'No se enviaron datos en la solicitud' });
      }

      // Desestructurar el cuerpo de la solicitud
      const { email, contrasena } = req.body;
      // Validar campos obligatorios
      if (!email || !contrasena) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
      }


      // Verificar si el correo existe
      const usuarioExistente = await Usuario.findOne({ email });
      if (!usuarioExistente) {
          return res.status(400).json({ msg: 'Datos incorrectos' });
      }

      // Verificar si la contraseña es correcta (sin cifrado)
      if (usuarioExistente.contrasena !== contrasena || usuarioExistente.email !== email) {
          return res.status(400).json({ msg: 'Datos incorrectos' });
      }

      // Generar un token JWT
      const token = jwt.sign(
 
          { id: usuarioExistente._id, email: usuarioExistente.email },
          process.env.JWT_SECRET 
      );

      return res.status(200).json({ msg: 'Bienvenido', token });
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error en el servidor');
  }
};
