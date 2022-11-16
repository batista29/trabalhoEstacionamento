const Express = require('express');

const router = Express.Router();

const ClientesController = require("./controllers/ClientesController");
const TelefonesCliController = require("./controllers/TelefonesCliController");
const TelefonesFuncController = require("./controllers/TelefonesFuncController");
const CarrosController = require("./controllers/CarrosController");
const FuncController = require("./controllers/FuncionariosController");
const Pagamentos = require("./controllers/PagamentoController");
const Vagas = require("./controllers/VagasController");
const Registros = require("./controllers/RegistrosController");
//falta controller funcionario

router.get("/clientes", ClientesController.listarClientes);
router.post("/clientes", ClientesController.cadastrarCliente);
router.delete("/clientes", ClientesController.excluirCliente);
router.put("/clientes", ClientesController.editarCliente);

router.get("/telefonesCli", TelefonesCliController.listarTelefones);
router.delete("/telefonesCli", TelefonesCliController.excluirTelefones);
router.put("/telefonesCli", TelefonesCliController.editarTelefones);
router.post("/telefonesCli", TelefonesCliController.cadastrarTelefones);

router.get("/telefonesFunc", TelefonesFuncController.listarTelefones);
router.delete("/telefonesFunc", TelefonesFuncController.excluirTelefones);
router.put("/telefonesFunc", TelefonesFuncController.editarTelefones);
router.post("/telefonesFunc", TelefonesFuncController.cadastrarTelefones);

router.get("/carros", CarrosController.listarCarros);
router.delete("/carros", CarrosController.excluirCarros);
router.post("/carros", CarrosController.cadastrarCarros);
router.put("/carros", CarrosController.editarCarros);

router.get("/funcionarios", FuncController.listarFuncionarios);
router.delete("/funcionarios", FuncController.excluirFuncionarios);
router.post("/funcionarios", FuncController.cadastrarFuncionarios);
router.put("/funcionarios", FuncController.editarFuncionarios);

router.get("/pagamentos", Pagamentos.listarPagamento);

router.get("/vagas", Vagas.listarVagas);
router.put("/vagas", Vagas.editarVagas);
router.post("/vagas", Vagas.cadastrarVagas);

router.get("/registros", Registros.listarRegistros);
router.put("/registros", Registros.editarRegistros);
router.post("/registros", Registros.cadastrarRegistros);

module.exports = router;