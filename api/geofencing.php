<?php

class Location {
    public $latitude;
    public $longitude;
    function Location($latitude, $longitude) {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }
}

function containsLocation($p, $polygon) {
    $c = 0;
    $p1 = $polygon[0];
    $n = count($polygon);

    for ($i=1; $i<=$n; $i++) {
        $p2 = $polygon[$i % $n];
        if ($p->longitude > min($p1->longitude, $p2->longitude)
            && $p->longitude <= max($p1->longitude, $p2->longitude)
            && $p->latitude <= max($p1->latitude, $p2->latitude)
            && $p1->longitude != $p2->longitude) {
                $xinters = ($p->longitude - $p1->longitude) * ($p2->latitude - $p1->latitude) / ($p2->longitude - $p1->longitude) + $p1->latitude;
                if ($p1->latitude == $p2->latitude || $p->latitude <= $xinters) {
                    $c++;
                }
        }
        $p1 = $p2;
    }

    return $c%2!=0;
}

$employeeLat = $_POST["employeeLat"];
$employeeLng = $_POST["employeeLng"];
$officePolygonPoints = json_decode($_POST["officePolygonPoints"]);

$polygon = array();

foreach ($officePolygonPoints as $value) {
    $array = json_decode(json_encode($value), true);
    array_push($polygon, new Location($array["lat"], $array["lng"]));
}

echo json_encode(containsLocation(new Location($employeeLat, $employeeLng), $polygon) ? true : false);