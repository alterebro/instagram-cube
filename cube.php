<?php

// index.php

$cube = file_get_contents( "cube.html" );
$cube = preg_replace('#<!--(.|\s)*?-->#', '', $cube);
$cube = preg_replace('#(?ix)(?>[^\S ]\s*|\s{2,})(?=(?:(?:[^<]++|<(?!/?(?:textarea|pre)\b))*+)(?:<(?>textarea|pre)\b|\z))#', '', $cube);

header("Content-Type: text/html; charset=UTF-8");
ob_start("ob_gzhandler");

    echo $cube;

ob_end_flush();
