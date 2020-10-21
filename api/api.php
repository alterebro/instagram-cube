<?php

require __DIR__ . '/../vendor/autoload.php';

use Alterebro\InstagramFeed;

$httpReferer = (!empty($_SERVER['HTTP_REFERER'])) ? $_SERVER['HTTP_REFERER'] : false;
$httpHost = parse_url($httpReferer, PHP_URL_HOST);
$allowedHosts = array(
    "localhost"
);

$queryParam = '@alterebro';
$cachePath = __DIR__ . '/../data/';

if ( (isset($_GET['q'])) && !empty($_GET['q']) && in_array($httpHost, $allowedHosts)) {

    $queryURL = $_GET['q'];
    preg_match('/^@?[\w\-\_\.]+$/', $queryURL, $matches);
    if ( count($matches) ) { $queryParam = $matches[0]; }
}

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
ob_start("ob_gzhandler");

         $feed = new InstagramFeed($queryParam, $cachePath);
    echo $feed->load();

ob_end_flush();
