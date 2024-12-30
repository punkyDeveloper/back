const jwt = require('jsonwebtoken');
const auth = require('../api/middleware/autenticacion');

jest.mock('jsonwebtoken'); // Mock de la librería jwt

describe('Middleware de autenticación', () => {
  let req, res, next;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('debería devolver un error si no se proporciona un token', () => {
    req.header.mockReturnValue(null);

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Acceso denegado, no se proporcionó un token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería devolver un error si el token es inválido', () => {
    req.header.mockReturnValue('Bearer invalidToken');
    jwt.verify.mockImplementation(() => {
      throw new Error('Token inválido');
    });

    auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Token inválido o expirado' });
    expect(next).not.toHaveBeenCalled();
  });

 
});
