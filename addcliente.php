<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Import Google Icon Font -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!-- Import Materialize.css -->
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
    <?php include_once "header.php"; ?>

    <!-- Form to add/modify a client -->
    <form onsubmit="return salvarCliente(event);">
        <label>ID: <input type="number" name="id_cliente"></label><br>
        <label>Nome: <input type="text" name="nome"></label><br>
        <label>Email: <input type="email" name="email"></label><br>
        <label>CPF: <input type="text" name="cpf"></label><br>
        <input class="btn green darken-4" type="submit" value="Salvar Cliente">
    </form>
    <br>
    <button id="btn-gerar-pdf" class="btn green darken-4">Gerar PDF</button>

    <!-- Clients table -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th colspan="2">Opções</th>
            </tr>
        </thead>
        <tbody id="clientes"></tbody>
    </table>

    <!-- Modal for confirmation -->
    <div id="modal-confirmacao" class="modal">
        <div class="modal-content">
            <h4>Confirmar Exclusão</h4>
            <p>Tem certeza que deseja excluir este cliente?</p>
        </div>
        <div class="modal-footer">
            <button id="btn-confirmar-exclusao" class="btn red darken-4">Confirmar</button>
            <button id="btn-cancelar-exclusao" class="btn grey darken-4">Cancelar</button>
        </div>
    </div>

    <!-- Toast notifications (optional) -->
    <div id="toast-container"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"></script>

    <!-- JavaScript -->
    <script src="script.js"></script>
    <script type="text/javascript" src="js/materialize.min.js"></script>
    
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            listarTodosClientes();
            document.getElementById("btn-gerar-pdf").addEventListener("click", gerarPDF);
            M.Modal.init(document.querySelectorAll('.modal'));  // Initialize modals
        });
    </script>

</body>

</html>
