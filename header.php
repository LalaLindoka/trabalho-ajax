<?php
 $paginaCorrente = basename($_SERVER['SCRIPT_NAME']);
 //echo $pagina_corrente;
 ?>



<div class="navbar-fixed">    
    <nav class=" pink lighten-4">
    <div class="nav-wrapper container">
      <a href="#" class="brand-logo"><img src="hello.png" height="70" width="120"></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li <?php if($paginaCorrente == 'index.php') {echo 'class="active"';}?>> <a class="black-text" href="index.php">Home</a></li>    
        <li <?php if($paginaCorrente == 'addcliente.php') {echo 'class="active"'; } ?>> <a class="black-text" href="addcliente.php">Clientes</a></li> 
      </ul>
    </div>
  </nav>
</div> 


        