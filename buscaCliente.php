<?php

$id_cliente = $_GET['id_cliente'];

require_once "conexao.php";
$conexao = conectar();

$sql = "SELECT id_cliente, nome, email, cpf FROM clientes 
        WHERE id_cliente = $id_cliente";
$resultado = executarSQL($conexao, $sql);
$clientes = mysqli_fetch_assoc($resultado);
echo json_encode($clientes);
