<!DOCTYPE html>
<html>
<head>
  <!--Import Google Icon Font-->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!--Import materialize.css-->
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

</head>

<body>
<?php include_once "header.php" ?>
    <form onsubmit="return salvarCliente(event);">
        <label>ID: <input type="number" name="id_cliente"></label><br>
        <label>Nome: <input type="text" name="nome"></label><br>
        <label>Email: <input type="email" name="dataNasc"></label><br>
        <label>CPF: <input type="text" name="cpf"></label><br>
        <input type="submit" value="Salvar Cliente">
    </form>
    <br>
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

    <script src="script.js"></script>

  
  <!--JavaScript at end of body for optimized loading-->
  <script type="text/javascript" src="js/materialize.min.js"></script>
