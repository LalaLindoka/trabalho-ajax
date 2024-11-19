<?php

require_once "conexao.php";
$conexao = conectar();

$clientes = json_decode(file_get_contents("php://input"));
$sql = "UPDATE clientes SET
        nome='$clientes->nome', 
        email='$clientes->email', 
        senha='$clientes->cpf'
        WHERE id_cliente=$clientes->id_cliente";

executarSQL($conexao, $sql);

echo json_encode($clientes);
