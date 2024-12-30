const Usuario = require('../Controladores/usuario');
const Tasks = require('../Controladores/tasks');
// eslint-disable-next-line no-unused-vars

const express = require('express');
// eslint-disable-next-line new-cap
const router =express.Router();
// usuario
/**
 * @swagger
 * /api/crearUsuario:
 *   post:
 *     summary: Crear un usuario
 *     tags:
 *       - Usuario
 *     description: Permite registrar un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 description: Correo electrónico único del usuario.
 *                 example: juan.perez@example.com
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: contraseñaSegura123
 *             required:
 *               - nombre
 *               - email
 *               - contrasena
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: Usuario creado exitosamente
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error en los datos enviados (faltan campos o el correo ya está en uso).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Todos los campos son obligatorios
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Hubo un error en el servidor
 */


router.post('/crearUsuario', Usuario.crearUsuario);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags:
 *       - Usuario
 *     description: Permite iniciar sesión con correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: usuario@example.com
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: contraseña123
 *             required:
 *               - email
 *               - contrasena
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de bienvenida.
 *                   example: Bienvenido
 *                 token:
 *                   type: string
 *                   description: Token de autenticación generado.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Error en los datos enviados (faltan campos o credenciales incorrectas).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: El correo o la contraseña son incorrectos
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Descripción del error del servidor.
 *                   example: Hubo un error en el servidor
 */


router.post('/login', Usuario.ingresarUsuario);

// tasks
// Tareas
/**
 * @swagger
 * /api/crearTarea:
 *   post:
 *     summary: Crear una tarea
 *     tags:
 *       - Tareas
 *     description: Permite registrar una nueva tarea en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la tarea.
 *                 example: Comprar leche
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la tarea.
 *                 example: Comprar leche en la tienda de la esquina
 *             required:
 *               - titulo
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: Tarea guardada
 *                 task:
 *                   type: object
 *                   description: Datos de la tarea creada.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Identificador único de la tarea.
 *                       example: 60b6c9b8a0f6b4d0b4a4b4d0
 *                     number:
 *                       type: number
 *                       description: Número de la tarea.
 *                       example: 1
 *                     titulo:
 *                       type: string
 *                       description: Título de la tarea.
 *                       example: Comprar leche
 *                     descripcion:
 *                       type: string
 *                       description: Descripción de la tarea.
 *                       example: Comprar leche en la tienda de la esquina
 *                     status:
 *                       type: boolean
 *                       description: Estado de la tarea.
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación de la tarea.
 *                       example: 2021-06-01T00:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de actualización de la tarea.
 *                       example: 2021-06-01T00:00:00.000Z
 *       400:
 *         description: Error en los datos enviados (faltan campos o errores de validación).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: El título debe tener entre 3 y 100 caracteres.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Ocurrió un error al crear la tarea.
 */


router.post('/crearTarea', Tasks.crearTarea);
/**
 * @swagger
 * /api/obtenerTareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags:
 *       - Tareas
 *     description: Permite obtener todas las tareas registradas en la base de datos.
 *     responses:
 *       200:
 *         description: Tareas encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Identificador único de la tarea.
 *                     example: 60b6c9b8a0f6b4d0b4a4b4d0
 *                   number:
 *                     type: number
 *                     description: Número de la tarea.
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     description: Título de la tarea.
 *                     example: Comprar leche
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la tarea.
 *                     example: Comprar leche en la tienda de la esquina
 *                   status:
 *                     type: boolean
 *                     description: Estado de la tarea.
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de creación de la tarea.
 *                     example: 2021-06-01T00:00:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de actualización de la tarea.
 *                     example: 2021-06-01T00:00:00.000Z
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Ocurrió un error al obtener las tareas.
 */

router.get('/obtenerTareas', Tasks.obtenerTareas);
/**
 * @swagger
 * /api/obtenerTarea/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags:
 *       - Tareas
 *     description: Permite obtener una tarea específica en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la tarea.
 *         schema:
 *           type: string
 *           example: 60b6c9b8a0f6b4d0b4a4b4d0
 *     responses:
 *       200:
 *         description: Tarea encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Identificador único de la tarea.
 *                   example: 60b6c9b8a0f6b4d0b4a4b4d0
 *                 number:
 *                   type: number
 *                   description: Número de la tarea.
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   description: Título de la tarea.
 *                   example: Comprar leche
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la tarea.
 *                   example: Comprar leche en la tienda de la esquina
 *                 status:
 *                   type: boolean
 *                   description: Estado de la tarea.
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de creación de la tarea.
 *                   example: 2021-06-01T00:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha de actualización de la tarea.
 *                   example: 2021-06-01T00:00:00.000Z
 *       404:
 *         description: Tarea no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Tarea no encontrada.
 *       400:
 *         description: Error en los datos enviados (faltan campos o errores de validación).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: El identificador proporcionado no es válido.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 *                   example: Ocurrió un error al obtener la tarea.
 */


router.get('/obtenerTarea/:id', Tasks.obtenerTarea);
/**
 * @swagger
 * /api/actualizarTarea/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags:
 *       - Tareas
 *     description: Permite actualizar una tarea específica en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la tarea.
 *         schema:
 *           type: string
 *           example: 60b6c9b8a0f6b4d0b4a4b4d0
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la tarea.
 *                 example: Comprar leche
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la tarea.
 *                 example: Comprar leche en la tienda de la esquina
 *               status1:
 *                 type: boolean
 *                 description: Estado de la tarea.
 *                 example: true
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea actualizada
 *                 updatedTask:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El título debe tener entre 3 y 100 caracteres.
 *       404:
 *         description: Tarea no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea no encontrada.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al actualizar la tarea.
 */


router.put('/actualizarTarea/:id', Tasks.actualizarTarea);
/**
 * @swagger
 * /api/eliminarTarea/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags:
 *       - Tareas
 *     description: Permite eliminar una tarea específica en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la tarea.
 *         schema:
 *           type: string
 *           example: 60b6c9b8a0f6b4d0b4a4b4d0
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada
 *       400:
 *         description: Error en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No se proporcionó un ID válido.
 *       404:
 *         description: Tarea no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea no encontrada.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ocurrió un error al eliminar la tarea.
 */
router.delete('/eliminarTarea/:id', Tasks.eliminarTarea);

module.exports=router;