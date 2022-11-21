const toCreate  = (model) =>{
    return `INSERT INTO vagas VALUES (${model.id_vaga}, ${model.ocupada})`;
}

const toReadAll = () => {
return "SELECT * FROM vagas ORDER BY id_vaga asc"
}

const toUpdate = (model) => {
return `UPDATE vagas SET id_vaga = ${model.id_vaga}, ocupada = ${model.ocupada} where id_vaga = ${model.id_vaga}`;
}

module.exports = {
toReadAll,
toCreate,
toUpdate
}