/*
    Rutas de Eventos
    host + /api/events
*/

// Todas tienen que pasar por la validación del JWT
const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
} = require("../controllers/events");

const router = Router();
router.use(validarJWT);

// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
    "/",
    [
        check("title", "El título es oblogatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalización es obligatoria").custom(isDate),
        validarCampos,
    ],
    crearEvento
);

// Actualizar Evento
router.put("/:id", actualizarEvento);

// Borrar Evento
router.delete("/:id", eliminarEvento);

module.exports = router;
