const Tasks = require('../api/modelos/task');
const {
  crearTarea,
  obtenerTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
} = require('../api/Controladores/tasks');

jest.mock('../api/modelos/task'); // Mock del modelo Tasks

describe('Controladores de tareas', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('crearTarea', () => {
    it('debería devolver un error si faltan campos obligatorios', async () => {
      req.body = { titulo: '', descripcion: '' };

      await crearTarea(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'El título es obligatorio.',
      });
    });

  });

  describe('obtenerTareas', () => {
    it('debería devolver una lista de tareas', async () => {
      const tasksMock = [{ titulo: 'Tarea 1' }, { titulo: 'Tarea 2' }];
      Tasks.find.mockResolvedValue(tasksMock);

      await obtenerTareas(req, res);

      expect(res.json).toHaveBeenCalledWith(tasksMock);
    });

    it('debería manejar errores al obtener tareas', async () => {
      Tasks.find.mockRejectedValue(new Error('Error al obtener tareas'));

      await obtenerTareas(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Ocurrió un error al obtener las tareas.',
      });
    });
  });

  describe('obtenerTarea', () => {
    it('debería devolver una tarea existente', async () => {
      req.params.id = '123';
      const taskMock = { id: '123', titulo: 'Tarea existente' };
      Tasks.findById.mockResolvedValue(taskMock);

      await obtenerTarea(req, res);

      expect(res.json).toHaveBeenCalledWith(taskMock);
    });

    it('debería devolver un error si la tarea no existe', async () => {
      req.params.id = '123';
      Tasks.findById.mockResolvedValue(null);

      await obtenerTarea(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tarea no encontrada.',
      });
    });
  });

  describe('actualizarTarea', () => {
    it('debería actualizar una tarea y devolverla', async () => {
      req.params.id = '123';
      req.body = { titulo: 'Tarea actualizada', descripcion: 'Nueva descripción', status1: true };

      const updatedTaskMock = {
        id: '123',
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        status: req.body.status1,
      };

      Tasks.findByIdAndUpdate.mockResolvedValue(updatedTaskMock);

      await actualizarTarea(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: 'Tarea actualizada',
        updatedTask: updatedTaskMock,
      });
    });

    it('debería manejar el error si la tarea no existe', async () => {
      req.params.id = '123';
      req.body = { titulo: 'Tarea actualizada', descripcion: 'Nueva descripción', status1: true };

      Tasks.findByIdAndUpdate.mockResolvedValue(null);

      await actualizarTarea(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tarea no encontrada.',
      });
    });
  });

  describe('eliminarTarea', () => {
    it('debería eliminar una tarea existente', async () => {
      req.params.id = '123';
      Tasks.findById.mockResolvedValue({ deleteOne: jest.fn() });

      await eliminarTarea(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Tarea eliminada' });
    });

    it('debería manejar el error si la tarea no existe', async () => {
      req.params.id = '123';
      Tasks.findById.mockResolvedValue(null);

      await eliminarTarea(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Tarea no encontrada.',
      });
    });
  });
});
