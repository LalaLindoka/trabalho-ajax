<?php

require_once "conexao.php";
$conexao = conectar();

$clientes = json_decode(file_get_contents("php://input"));
$sql = "INSERT INTO clientes 
        (nome, email, cpf)
        VALUES 
        ('$clientes->nome', 
        '$clientes->email', 
        '$clientes->cpf')";

executarSQL($conexao, $sql);

$clientes->id_cliente = mysqli_insert_id($conexao);
echo json_encode($clientes);
