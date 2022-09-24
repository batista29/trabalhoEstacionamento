const Express = require('express');

const router = Express.Router();

const ClientesController = require("./controllers/ClientesController");

router.get("/clientes", ClientesController.listarClientes);
router.post("/clientes", ClientesController.cadastrarCliente);
router.delete("/clientes", ClientesController.excluirCliente);
router.put("/clientes", ClientesController.editarCliente);

module.exports = router;