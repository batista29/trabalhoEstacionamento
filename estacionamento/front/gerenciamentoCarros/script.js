const lancamentos = document.querySelector(".lista-carros");
const lancamento = document.querySelector(".linhamodelo");

var carros = []

var estacionamento = [];
fetch("http://localhost:3000/carros")
    .then(resp => { return resp.json() })
    .then(lancamento => {
        estacionamento = lancamento;
        listaDeCarros();
    });

function listaDeCarros() {
    estacionamento.forEach(info => {

        var lista = lancamento.cloneNode(true);
        lista.classList.remove("model")
        lista.querySelector("#idCli").innerHTML = info.id_cliente;
        lista.querySelector("#idCarro").innerHTML = info.id_carro;
        lista.querySelector("#placa").innerHTML = info.placa;
        lista.querySelector("#tipo").innerHTML = info.tipo;
        lista.querySelector("#marca").innerHTML = info.marca;
        lista.querySelector("#modelo").innerHTML = info.modelo;
        lista.querySelector("#cor").innerHTML = info.cor;
        lista.querySelector("#descricao").innerHTML = info.descricao;
        lancamentos.appendChild(lista);
    })
}
var modal = document.querySelector(".modal");

function abrirModal() {
    modal.classList.toggle("model");
}

function cadastrar() {
    let id = document.querySelector(".idCli").value;
    let placa = document.querySelector(".placaCar").value;
    let tipo = document.querySelector(".tipoCar").value;
    let marca = document.querySelector(".marcaCar").value;
    let modelo = document.querySelector(".modeloCar").value;
    let cor = document.querySelector(".corCar").value;
    let desc = document.querySelector(".desc").value;

    let options = JSON.stringify({
        "id_cliente": id,
        "placa": placa,
        "tipo": tipo,
        "marca": marca,
        "modelo": modelo,
        "cor": cor,
        "descricao": desc
    });

    fetch("http://localhost:3000/carros", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(resp => { return resp })
        .then(resp => {
            alert("Carro cadastrado com sucesso!");
            window.location.reload();
            abrirModal();
        })
}

function deletarUser(e) {
    var idCarro = e.parentNode.parentNode.querySelector('#idCarro').innerHTML
    console.log(idCarro);

    let data = {
        "id_carro": idCarro
    }
      
      fetch("http://localhost:3000/carros", {
        "method":"DELETE",
        "headers": {
            "Content-Type":"application/json"
        },
        "body":JSON.stringify(data)

    })
        .then(res => { return res.json() })
        .then(resp => {
            console.log(resp)
              window.location.reload();
              alert("Carro deletado com sucesso!");
          
        })
     }





 var tela = document.querySelector(".tela");

 var idGeral
function abrirModal2 (e){
  tela.classList.toggle("tela2");

  var idCarro2 = e.parentNode.parentNode.querySelector("#idCarro").innerHTML
  idGeral = idCarro2

  console.log(idCarro2)


  const options = {method: 'GET'}

  fetch('http://localhost:3000/carros/' + idCarro2, options)
  .then(resp => resp.json())
  .then(resp => {
      resp.forEach(c => {
        let idCliente = document.querySelector("#idCli");
        let placa = document.querySelector("#placaCar");
        let tipo = document.querySelector("#tipoCar");
        let marca = document.querySelector("#marcaCar");
        let modelo = document.querySelector("#modeloCar");
        let cor = document.querySelector("#corCar");
        let desc = document.querySelector("#desc");

          idCliente.value = c.id_cliente;
          placa.value = c.placa;
          tipo.value = c.tipo
          marca.value = c.marca;
          modelo.value = c.modelo;
          cor.value = c.cor;
          desc.value = c.descricao;

          console.log(c)
      })
  })


}

function fecharModal(){
  tela.classList.toggle("tela2");
}

function usual(e){
  fetch("http://localhost:3000/carros")
  .then(resp => {return resp.json()})
  .then(data => {
      carros = data;
      abrirModal2(e);
  });
}




 function atualizar(){

  console.log(idGeral)

    let idCliente = document.querySelector("#idCli").value;
    let placa = document.querySelector("#placaCar").value;
    let tipo = document.querySelector("#tipoCar").value;
    let marca = document.querySelector("#marcaCar").value;
    let modelo = document.querySelector("#modeloCar").value;
    let cor = document.querySelector("#corCar").value;
    let desc = document.querySelector("#desc").value;

  let options = JSON.stringify({
    "id_cliente": idCliente,
    "placa": placa,
    "tipo": tipo,
    "marca": marca,
    "modelo": modelo,
    "cor": cor,
    "descricao": desc

  });

  fetch("http://localhost:3000/carros", {
      "method": "PUT",
      "headers": {
          "Content-Type": "application/json"
      },
      "body": options
  })
  .then(resp=> {return resp})
  .then(resp => {
          alert("Carro ATUALIZADO com sucesso!");
          window.location.reload();
          fecharModal();
  })
}

setTimeout(() => (
    contarCli()
), 1000)
function contarCli(){
    var tr = document.querySelectorAll("tr");
    var total = tr.length - 2;
    console.log(total)
    document.querySelector(".tot").innerHTML = "Total de carros: " + total;
}

