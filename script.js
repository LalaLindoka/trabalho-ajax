document.addEventListener("DOMContentLoaded", () => {
    listarTodosClientes();
});

function listarTodosClientes() {
    fetch("listarClientes.php",
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(clientes => inserirClientes(clientes))
        .catch(error => console.log(error));
}

function inserirClientes(clientes) {
    for (const cliente of clientes) {
        inserirCliente(cliente);
    }
}

function inserirCliente(cliente) {
    let tbody = document.getElementById('clientes');
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    tdId.innerHTML = cliente.id_cliente;
    let tdNome = document.createElement('td');
    tdNome.innerHTML = cliente.nome;
    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = cliente.email;
    let tdCpf = document.createElement('td');
    tdCpf.innerHTML = cliente.cpf; 
    let tdAlterar = document.createElement('td');
    let btnAlterar = document.createElement('button');
    btnAlterar.innerHTML = "Alterar";
    btnAlterar.addEventListener("click", buscaCliente, false);
    btnAlterar.id_cliente = cliente.id_cliente;
    tdAlterar.appendChild(btnAlterar);
    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.addEventListener("click", excluirCliente, false);
    btnExcluir.id_cliente = cliente.id_cliente;
    btnExcluir.innerHTML = "Excluir";
    tdExcluir.appendChild(btnExcluir);
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCpf);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}

function excluir(evt) {
    let id_cliente = evt.currentTarget.id_cliente;
    let excluir = confirm("Você tem certeza que deseja excluir este cliente?");
    if (excluir == true) {
        fetch('excluir.php?id_cliente=' + id_cliente,
            {
                method: "GET",
                headers: { 'Content-Type': "application/json; charset=UTF-8" }
            }
        )
            .then(response => response.json())
            .then(retorno => excluirCliente(retorno, id_cliente))
            .catch(error => console.log(error));
    }
}

function excluirCliente(retorno, id_cliente) {
    if (retorno == true) {
        let tbody = document.getElementById('clientes');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_cliente) {
                tbody.removeChild(tr);
            }
        }
    }
}

function alterarCliente(cliente) {
    let tbody = document.getElementById('clientes');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML == cliente.id_cliente) {
            tr.children[1].innerHTML = cliente.nome;
            tr.children[2].innerHTML = cliente.email;
            tr.children[3].innerHTML = cliente.cpf;
        }
    }
}

function buscaCliente(evt) {
    let id_cliente = evt.currentTarget.id_cliente;
    fetch('buscaCliente.php?id_cliente=' + id_cliente,
        {
            method: "GET",
            headers: { 'Content-Type': "application/json; charset=UTF-8" }
        }
    )
        .then(response => response.json())
        .then(cliente => preencheForm(cliente))
        .catch(error => console.log(error));
}

function preencheForm(cliente) {
    let inputIDCliente = document.getElementsByName("id_cliente")[0];
    inputIDCliente.value = cliente.id_cliente;
    let inputNome = document.getElementsByName("nome")[0];
    inputNome.value = cliente.nome;
    let inputEmail = document.getElementsByName("email")[0];
    inputEmail.value = cliente.email;
    let inputCpf = document.getElementsByName("cpf")[0];
    inputCpf.value = cliente.cpf;
}

function salvarCliente(event) {
    event.preventDefault();
    let inputIDCliente = document.getElementsByName("id_cliente")[0];
    let id_cliente = inputIDCliente.value;

    let inputNome = document.getElementsByName("nome")[0];
    let nome = inputNome.value;
    let inputEmail = document.getElementsByName("email")[0];
    let email = inputEmail.value;
    let inputCpf = document.getElementsByName("cpf")[0];
    let cpf = inputCpf.value;

    if (id_cliente == "") {
        cadastrarCliente(id_cliente, nome, email, cpf); 
    } else {
        alterarCliente(id_cliente, nome, email, cpf);
    }
    document.getElementsByTagName('form')[0].reset();
}