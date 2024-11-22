<?php

$id_cliente = $_GET['id_cliente'];

require_once "conexao.php";
$conexao = conectar();
$sql = "DELETE FROM clientes WHERE id_cliente = $id_cliente";
$retorno = executarSQL($conexao, $sql);
echo json_encode($retorno);