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

$polygon = array(
    new Location(8.494447689033173, 124.6517647396423),
    new Location(8.49468975564717, 124.65185459364372), 
    new Location(8.494777297507396, 124.65161520650037), 
    new Location(8.49471164111411, 124.65159173717258),
    new Location(8.494664554198868, 124.65171981264706),
    new Location(8.494488807209033, 124.65165611018516),
    new Location(8.494447689033173, 124.6517647396423),
);

echo containsLocation(new Location($employeeLat, $employeeLng), $polygon) ? "true" : "false";