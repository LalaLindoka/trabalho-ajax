<?php

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT * FROM clientes";
$resultado = executarSQL($conexao, $sql);
$clientes = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
echo json_encode($clientes);
