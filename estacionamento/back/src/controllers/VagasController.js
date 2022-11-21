const conDB = require('../dao/dbEstacionamento');
const Vagas = require('../models/vagas')

function listarVagas(req, res) {
    conDB.query(Vagas.toReadAll(), (err, result) => {
        if(err == null) {
            res.json(result).status(200).end();
        }else {
            res.json(err).status(400).end();
        }
    })
};

function cadastrarVagas(req, res) {
    conDB.query(Vagas.toCreate(req.body), (err, result) => {
        if(err == null) {
            res.status(201).json(req.body).end();
        }else {
            res.status(400).json(err).end();
        }
    });
};

function editarVagas(req, res){
    conDB.query(Vagas.toUpdate(req.body), (err, result) => {
        if(err == null) {
            res.status(200).json(req.body).end();
        }else {
            res.status(400).json(err).end();
        }
    });
};

module.exports = {
    cadastrarVagas,
    listarVagas,
    editarVagas
}