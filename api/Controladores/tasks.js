const Tasks = require('../modelos/task');


exports.crearTarea = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
    
        // Validaciones
        if (!titulo) {
          return res.status(400).json({ message: 'El título es obligatorio.' });
        }
    
        // Validación adicional (por ejemplo, longitud mínima/máxima)
        if (titulo.length < 3 || titulo.length > 100) {
          return res.status(400).json({ message: 'El título debe tener entre 3 y 100 caracteres.' });
        }
    
        if (descripcion.length < 0 || descripcion.length > 300) {
          return res.status(400).json({ message: 'La descripción debe tener entre 5 y 300 caracteres.' });
        }
    
        // Generar el número automáticamente
        const lastTask = await Tasks.findOne().sort({ number: -1 }); // Busca la tarea con el número más alto
        const number = lastTask ? lastTask.number + 1 : 1;
    
        // Crear nueva tarea
        const newTask = new Tasks({
          number,
          titulo,
          descripcion,
          status: true, 
        });
    

        await newTask.save();
      
        // Responder con éxito
        res.json({ message: 'Tarea guardada', task: newTask });
      } catch (error) {

        res.status(500).json({ message: 'Ocurrió un error al crear la tarea.' });
      }
};



exports.obtenerTareas = async (req, res) => {
    try {
        const tasks = await Tasks.find();

        res.json(tasks);

      } catch (error) {

        res.status(500).json({ message: 'Ocurrió un error al obtener las tareas.' });
      }
}

exports.obtenerTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Tasks.findById(id);

        if (!task) {
          return res.status(404).json({ message: 'Tarea no encontrada.' });
        }

        res.json(task);

      } catch (error) {

        res.status(500).json({ message: 'Ocurrió un error al obtener la tarea.' });
      }
}

exports.actualizarTarea = async (req, res) => {
  try {
      const { id } = req.params;
      const { titulo, descripcion, status1 } = req.body;


      if (!titulo || titulo.length < 3 || titulo.length > 100) {
          return res.status(400).json({ message: 'El título debe tener entre 3 y 100 caracteres.' });
      }

      if (descripcion.length < 0 || descripcion.length > 300) {
          return res.status(400).json({ message: 'La descripción debe tener entre 5 y 300 caracteres.' });
      }

      if (typeof status1 !== 'boolean') {
          return res.status(400).json({ message: 'El estado debe ser verdadero o falso.' });
      }

      const updatedTask = await Tasks.findByIdAndUpdate(
          id,
          { titulo, descripcion, status: Boolean(status1) },
          { new: true, runValidators: true }
      );

      if (!updatedTask) {
          return res.status(404).json({ message: 'Tarea no encontrada.' });
      }

      res.json({ message: 'Tarea actualizada', updatedTask });
  } catch (error) {

      res.status(500).json({ message: 'Ocurrió un error al actualizar la tarea.' });
  }
};



exports.eliminarTarea = async (req, res) => {
  try {
      const { id } = req.params; 

      // Verifica si el ID es válido
      if (!id) {
          return res.status(400).json({ message: 'No se proporcionó un ID válido.' });
      }

      // Buscar la tarea
      const task = await Tasks.findById(id);

      if (!task) {
          return res.status(404).json({ message: 'Tarea no encontrada.' });
      }
      // Eliminar la tarea
      await task.deleteOne();

      res.json({ message: 'Tarea eliminada' });
  } catch (error) {

      res.status(500).json({ message: 'Ocurrió un error al eliminar la tarea.' });
  }
};

