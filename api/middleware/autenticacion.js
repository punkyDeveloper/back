const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    // Verificar si se proporcionó un token
    if (!token) {
        return res.status(401).json({ msg: 'Acceso denegado, no se proporcionó un token' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET );
        req.user = decoded; // Adjuntar el usuario decodificado a la solicitud
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido o expirado' });
    }
};

module.exports = auth;
