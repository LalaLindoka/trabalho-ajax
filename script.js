document.addEventListener("DOMContentLoaded", () => {
    listarTodosClientes();
    document.getElementById("btn-gerar-pdf").addEventListener("click", gerarPDF);
    M.Modal.init(document.querySelectorAll('.modal'));
});

function listarTodosClientes() {
    fetch("listarClientes.php", {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(clientes => {
            window.clientesCache = clientes;
            inserirClientes(clientes);
        })
        .catch(error => console.log(error));
}

function inserirClientes(clientes) {
    const tbody = document.getElementById("clientes");
    tbody.innerHTML = "";
    clientes.forEach(cliente => inserirCliente(cliente));
}

function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    if (!window.clientesCache || window.clientesCache.length === 0) {
        M.toast({ html: "Nenhum cliente disponível para gerar o PDF.", classes: "red darken-4" });
        return;
    }

    
    doc.setTextColor(255, 105, 180);  // Cor rosa (RGB)
    doc.setFontSize(16);


    const logo = 'hello.png';
    doc.addImage(logo, 'PNG', 15, 10, 30, 30); 

    
    doc.text("Lista de Clientes", 60, 20);

    
    const colunas = ["ID", "Nome", "Email", "CPF"];
    const linhas = [];

    window.clientesCache.forEach(cliente => {
        linhas.push([cliente.id_cliente, cliente.nome, cliente.email, cliente.cpf]);
    });

    
    doc.autoTable({
        head: [colunas],
        body: linhas,
        startY: 40, 
        theme: 'grid', 
        headStyles: {
            fillColor: [255, 105, 180],
            textColor: [255, 255, 255], 
            fontSize: 12, 
            halign: 'center', 
            font: 'helvetica',
        },
        bodyStyles: {
            fontSize: 10, 
            halign: 'center', 
            textColor: [0, 0, 0], 
            lineColor: [255, 105, 180], 
            lineWidth: 0.3, 
        },
        alternateRowStyles: {
            fillColor: [255, 240, 245] 
        },
    });

    // Salvando o PDF
    doc.save("clientes_hello_kitty.pdf");

    M.toast({ html: "PDF gerado com sucesso!", classes: "green darken-4" });
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
    btnAlterar.classList.add('btn', 'blue', 'darken-4');
    btnAlterar.addEventListener("click", buscaCliente, false);
    btnAlterar.id_cliente = cliente.id_cliente;
    tdAlterar.appendChild(btnAlterar);

    let tdExcluir = document.createElement('td');
    let btnExcluir = document.createElement('button');
    btnExcluir.innerHTML = "Excluir";
    btnExcluir.classList.add('btn', 'red', 'darken-4');
    btnExcluir.addEventListener("click", abrirModalConfirmacao, false);
    btnExcluir.id_cliente = cliente.id_cliente;
    tdExcluir.appendChild(btnExcluir);

    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdCpf);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);

    tbody.appendChild(tr);
}

function abrirModalConfirmacao(evt) {
    let id_cliente = evt.currentTarget.id_cliente;
    let modal = M.Modal.getInstance(document.getElementById('modal-confirmacao'));
    let btnConfirmar = document.getElementById('btn-confirmar-exclusao');
    let btnCancelar = document.getElementById('btn-cancelar-exclusao');

    modal.open();  // Abre o modal

    btnConfirmar.onclick = function () {
        excluir(id_cliente);
        modal.close();  // Fecha o modal
    };

    btnCancelar.onclick = function () {
        modal.close();  // Fecha o modal
    };
}

function excluir(id_cliente) {
    fetch('excluir.php?id_cliente=' + id_cliente, {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(retorno => excluirCliente(retorno, id_cliente))
        .catch(error => console.log(error));
}

function excluirCliente(retorno, id_cliente) {
    if (retorno === true) {
        let tbody = document.getElementById('clientes');
        for (const tr of tbody.children) {
            if (tr.children[0].innerHTML == id_cliente) {
                tbody.removeChild(tr);
                break;
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
    fetch('buscaCliente.php?id_cliente=' + id_cliente, {
        method: "GET",
        headers: { 'Content-Type': "application/json; charset=UTF-8" }
    })
        .then(response => response.json())
        .then(cliente => preencheForm(cliente))
        .catch(error => console.log(error));
}

function preencheForm(cliente) {
    document.getElementsByName("id_cliente")[0].value = cliente.id_cliente;
    document.getElementsByName("nome")[0].value = cliente.nome;
    document.getElementsByName("email")[0].value = cliente.email;
    document.getElementsByName("cpf")[0].value = cliente.cpf;
}

function salvarCliente(event) {
    event.preventDefault();

    let id_cliente = document.getElementsByName("id_cliente")[0].value;
    let nome = document.getElementsByName("nome")[0].value;
    let email = document.getElementsByName("email")[0].value;
    let cpf = document.getElementsByName("cpf")[0].value;

    resetarCampos(); 

    let valid = true;

   
    if (!nome) {
        mostrarErro("O nome do cliente é obrigatório.", "nome");
        valid = false;
    } else {
        limparErro("nome");
    }

 
    if (!email) {
        mostrarErro("O email do cliente é obrigatório.", "email");
        valid = false;
    } else {
        limparErro("email");
    }


    if (!cpf) {
        mostrarErro("O CPF do cliente é obrigatório.", "cpf");
        valid = false;
    } else {
        limparErro("cpf");
    }


    if (!valid) {
        return false;
    }


    if (id_cliente === "") {
        cadastrarCliente(nome, email, cpf);
    } else {
        alterarCliente(id_cliente, nome, email, cpf);
    }

    document.querySelector('form').reset();
}

function resetarCampos() {

    const campos = document.querySelectorAll('.input-field input');
    campos.forEach(input => {
        input.classList.remove('invalid', 'valid');
    });
}

function mostrarErro(mensagem, campo) {
    M.toast({ html: mensagem, classes: 'red darken-4' });

    let input = document.getElementsByName(campo)[0];
    input.classList.add('invalid');
}

function limparErro(campo) {
    let campoInput = document.getElementsByName(campo)[0];
    campoInput.classList.remove('invalid'); 
    campoInput.classList.add('valid'); 
}

function cadastrarCliente(nome, email, cpf) {
    fetch('inserirCliente.php', {
        method: 'POST',
        body: JSON.stringify({ nome, email, cpf }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then(response => response.json())
        .then(cliente => inserirCliente(cliente))
        .catch(error => console.log(error));
}

function alterarCliente(id_cliente, nome, email, cpf) {
    fetch('alterarCliente.php', {
        method: 'POST',
        body: JSON.stringify({ id_cliente, nome, email, cpf }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
}
