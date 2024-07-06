import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const verifyToken = (token) => {
    try {
        return verify(token, process.env.KEY_TOKEN);
    } catch (error) {
        return null;
    }
}

const validateToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send({ error: "No hay token" });
    }
    
    const token = req.headers.authorization.split(' ').pop();

    if (!token) {
        return res.status(400).send({ error: "Token no encontrado" });
    }

    const tokenData = await verifyToken(token);
  
    if (tokenData && tokenData.uuid) {
        next();
    } else {
        return res.status(401).send({ error: "Token inválido" });
    }
};

export default { validateToken };
