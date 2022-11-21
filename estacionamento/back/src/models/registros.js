const toCreate  = (model) =>{
    return `INSERT INTO registro VALUES (${model.id_cliente}, ${model.id_carro},${model.id_vaga}, '${model.hora_entrada}','${model.hora_saida}', '${model.data}')`;
}

const toReadAll = () => {
return "SELECT * FROM registro ORDER BY id_vaga asc"
}

const toUpdate = (model) => {
return `UPDATE registro SET Hora_saida = '${model.hora_saida}' where id_vaga = ${model.id_vaga}`;
}

module.exports = {
toReadAll,
toCreate,
toUpdate
}