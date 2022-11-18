const conDB = require('../dao/dbEstacionamento');
const Registros = require('../models/registros')

function listarRegistros(req, res) {
    conDB.query(Registros.toReadAll(), (err, result) => {
        if(err == null) {
            res.json(result).status(200).end();
        }else {
            res.json(err).status(400).end();
        }
    })
};

function cadastrarRegistros(req, res) {
    conDB.query(Registros.toCreate(req.body), (err, result) => {
        if(err == null) {
            res.status(201).json(req.body).end();
        }else {
            res.status(400).json(err).end();
        }
    });
};

function editarRegistros(req, res){
    conDB.query(Registros.toUpdate(req.body), (err, result) => {
        if(err == null) {
            res.status(200).json(req.body).end();
        }else {
            res.status(400).json(err).end();
        }
    });
};

module.exports = {
    listarRegistros,
    cadastrarRegistros,
    editarRegistros
}