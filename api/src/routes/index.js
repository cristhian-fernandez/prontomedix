const { Router } = require('express');
// Importar todos los routers;
const testRoutes = require('./pruebaRoutes'); 


const router = Router();

// Configurar los routers
router.use('/tests',testRoutes);                     //  http://localhost:3001/api/prueba/


module.exports = router;

