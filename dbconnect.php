<?php
 try{
 $con = new PDO('mysql:host=learn-mysql.cms.waikato.ac.nz;
dbname=jl537','jl537','my169283sql');
#jake li
 } catch (PDOException $e) {
 echo "Database connection error ". $e->getMessage();
 }
