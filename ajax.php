<?php
/**
 * Created by PhpStorm.
 * User: Home
 * Date: 05.11.2015
 * Time: 17:20
 */



$id = $_POST['id'];

$jData['data'] = $id;

$a =  json_encode($jData);


echo $a;


?>