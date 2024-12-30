const Usuario = require('../api/modelos/usuario');
const { crearUsuario, ingresarUsuario } = require('../api/Controladores/usuario');
const jwt = require('jsonwebtoken');

jest.mock('../api/modelos/usuario'); // Mock del modelo de usuario
jest.mock('jsonwebtoken'); // Mock del JWT

describe('Usuario Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks antes de cada prueba
  });

  describe('crearUsuario', () => {
    it('debería devolver un error si faltan campos obligatorios', async () => {
      const req = { body: { nombre: 'Test', email: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Todos los campos son obligatorios' });
    });

    it('debería devolver un error si el correo ya está en uso', async () => {
      Usuario.findOne.mockResolvedValue({ email: 'test@example.com' });

      const req = { body: { nombre: 'Test', email: 'test@example.com', contrasena: '1234' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'El correo ya está en uso' });
    });

    it('debería crear un usuario y devolver un token', async () => {
      Usuario.findOne.mockResolvedValue(null);
      jest.spyOn(Usuario.prototype, 'save').mockResolvedValue({ _id: '1234', email: 'test@example.com' });
      jwt.sign.mockReturnValue('mockToken');

      const req = { body: { nombre: 'Test', email: 'test@example.com', contrasena: '1234' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await crearUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Usuario creado exitosamente', token: 'mockToken' });
    });
  });

  describe('ingresarUsuario', () => {
    it('debería devolver un error si faltan campos obligatorios', async () => {
      const req = { body: { email: '', contrasena: '' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ingresarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Todos los campos son obligatorios' });
    });

    it('debería devolver un error si los datos son incorrectos', async () => {
      Usuario.findOne.mockResolvedValue(null);

      const req = { body: { email: 'wrong@example.com', contrasena: '1234' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ingresarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Datos incorrectos' });
    });

    it('debería devolver un token si los datos son correctos', async () => {
      Usuario.findOne.mockResolvedValue({
        email: 'test@example.com',
        contrasena: '1234',
        _id: '1234',
      });
      jwt.sign.mockReturnValue('mockToken');

      const req = { body: { email: 'test@example.com', contrasena: '1234' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ingresarUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Bienvenido', token: 'mockToken' });
    });
  });
});
