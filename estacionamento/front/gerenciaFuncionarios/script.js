const lancamentos = document.querySelector(".lista-func");
const lancamento = document.querySelector(".linhamodelo");

var estacionamento = [];
fetch("http://localhost:3000/funcionarios")
.then(resp => {return resp.json()})
.then(lancamento => {
        estacionamento = lancamento;
        listaDeFuncionarios();
    });

function listaDeFuncionarios() {
    estacionamento.forEach(info => {

        var date = new Date(info.data_nasc); 
        let dataFromatada = date.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

        var lista = lancamento.cloneNode(true);
        lista.classList.remove("model")
        lista.querySelector("#idfunc").innerHTML = info.id_func;
        lista.querySelector("#nomefunc").innerHTML = info.nome_func;
        lista.querySelector("#emailfunc").innerHTML = info.email;
        lista.querySelector("#datafunc").innerHTML = dataFromatada;
        lista.querySelector("#CPFfunc").innerHTML = info.cpf;
        lista.querySelector("#bairrofunc").innerHTML = info.bairro;
        lista.querySelector("#ruafunc").innerHTML = info.rua;
        lista.querySelector("#cepfunc").innerHTML = info.cep;
        lista.querySelector("#complefunc").innerHTML = info.complemento;
        lista.querySelector("#munifunc").innerHTML = info.municipio;
        lancamentos.appendChild(lista);
    })
}

var modal = document.querySelector(".modal");

function abrirModal (){
      modal.classList.toggle("model");
}

function cadastrar(){
    let nome = document.querySelector(".nome").value;
    let email = document.querySelector(".email").value;
    let data = document.querySelector(".data").value;
    let cpf = document.querySelector(".CPF").value;
    let cargo = document.querySelector(".cargo").value;
    let bairro = document.querySelector(".bairro").value;
    let rua = document.querySelector(".rua").value;
    let cep = document.querySelector(".CEP").value;
    let complemento = document.querySelector(".com").value;
    let municipio = document.querySelector(".muni").value;

    let options = JSON.stringify({
        "nome_func": nome,
		"email": email,
		"data_nasci": data,
		"cpf": cpf,
        "cargo": cargo,
		"bairro": bairro,
        "rua": rua,
		"cep": cep,
		"complemento": complemento,
		"municipio": municipio
    });

    fetch("http://localhost:3000/funcionarios", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
    .then(resp=> {return resp})
    .then(resp => { 
            alert("Funcionario cadastrado com sucesso!");
            window.location.reload();
            abrirModal();
    })
}

function deletarUser(e) {
    var idFunc = e.parentNode.parentNode.querySelector('#idfunc').innerHTML
    console.log(idFunc);

    let data = {
        "id_func": idFunc
  };
  fetch("http://localhost:3000/funcionarios", {
      "method":"DELETE",
      "headers": {
          "Content-Type":"application/json"
      },
      "body":JSON.stringify(data)
  })
  .then(res => { return res.json() })
      .then(resp => {
          if (resp.id_func !== undefined) {
            window.location.reload();
            alert("Funcionario deletado com sucesso!");
        }
      })
   }

   var tela = document.querySelector(".tela");

   var idGeral 
function abrirModal2 (e){
    tela.classList.toggle("tela2");

    var idFunc2 = e.parentNode.parentNode.querySelector("#idfunc").innerHTML
    idGeral = idFunc2

    console.log(idFunc2)


    const options = {method: 'GET'}

    fetch('http://localhost:3000/funcionarios/' + idFunc2, options)
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(c => {
            let nome = document.querySelector("#nome");
            let email = document.querySelector("#email");
            let data = document.querySelector("#data");
            let cpf = document.querySelector("#CPF");
            let bairro = document.querySelector("#bairro");
            let rua = document.querySelector("#rua");
            let cep = document.querySelector("#CEP");
            let complemento = document.querySelector("#com");
            let municipio = document.querySelector("#muni");

            nome.value = c.nome_func;
            email.value = c.email;
            data.value = c.data_nasc
            cpf.value = c.cpf;
            bairro.value = c.bairro;
            rua.value = c.rua;
            cep.value = c.cep;
            complemento.value = c.complemento;
            municipio.value = c.municipio;
        })
    })


}

function fecharModal(){
    tela.classList.toggle("tela2");
}

function usual(e){
    fetch("http://localhost:3000/funcionarios")
    .then(resp => {return resp.json()})
    .then(data => {
        funcionarios = data;
        abrirModal2(e);
    });
}




   function atualizar(){

    console.log(idGeral)

    let nome = document.querySelector("#nome").value;
    let email = document.querySelector("#email").value;
    let data = document.querySelector("#data").value;
    let cpf = document.querySelector("#CPF").value;
    let bairro = document.querySelector("#bairro").value;
    let rua = document.querySelector("#rua").value;
    let cep = document.querySelector("#CEP").value;
    let complemento = document.querySelector("#com").value;
    let municipio = document.querySelector("#muni").value;

    let options = JSON.stringify({
        "nome_func": nome,
		"email": email,
		"data_nasc": data,
		"cpf": cpf,
		"bairro": bairro,
        "rua": rua,
		"cep": cep,
		"complemento": complemento,
		"municipio": municipio,
        "id_func": idGeral
    });

    fetch("http://localhost:3000/funcionarios", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
    .then(resp=> {return resp})
    .then(resp => { 
            alert("Funcionario ATUALIZADO com sucesso!");
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
    document.querySelector(".tot").innerHTML = "Total de funcionários: " + total;
}

