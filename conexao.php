<?php

function conectar()
{
    $conexao = mysqli_connect(
        "localhost",
        "root",
        "",
        "clientes"
    );
    if ($conexao === false) {
        echo "Erro ao conectar à base dados. Nº do erro: " .
            mysqli_connect_errno() . ". " .
            mysqli_connect_error();
        die();
    }
    return $conexao;
}

function executarSQL($conexao, $sql)
{
    $resultado = mysqli_query($conexao, $sql);
    if ($resultado === false) {
        echo "Erro ao executar o comando SQL. " .
            mysqli_errno($conexao) . ": " . mysqli_error($conexao);
        die();
    }
    return $resultado;
}
