const toCreate  = (model) =>{
    return `INSERT INTO registro VALUES (${model.id_cliente}, ${model.id_carro},${model.id_vaga}, '${model.hora_entrada}','${model.hora_saida}', '${model.data}')`;
}

const toReadAll = () => {
return "SELECT * FROM registro ORDER BY id_vaga asc"
}

const toUpdate = (model) => {
return `UPDATE registro SET id_cliente = ${model.id_cliente}, id_carro = ${model.id_carro}, id_vaga = ${model.id_vaga}, hora_entrada = '${model.id_carro}', hora_saida = '${model.hora_saida}', data = '${model.data}' where id_vaga = ${model.id_vaga}`;
}

module.exports = {
toReadAll,
toCreate,
toUpdate
}