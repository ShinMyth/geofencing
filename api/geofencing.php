<?php

class Point {
    public $lat;
    public $long;
    function Point($lat, $long) {
        $this->lat = $lat;
        $this->long = $long;
    }
}

$employeeLat = $_POST["employeeLat"];
$employeeLng = $_POST["employeeLng"];

//the Point in Polygon function
function pointInPolygon($p, $polygon) {
    //if you operates with (hundred)thousands of points
    set_time_limit(60);
    $c = 0;
    $p1 = $polygon[0];
    $n = count($polygon);

    for ($i=1; $i<=$n; $i++) {
        $p2 = $polygon[$i % $n];
        if ($p->long > min($p1->long, $p2->long)
            && $p->long <= max($p1->long, $p2->long)
            && $p->lat <= max($p1->lat, $p2->lat)
            && $p1->long != $p2->long) {
                $xinters = ($p->long - $p1->long) * ($p2->lat - $p1->lat) / ($p2->long - $p1->long) + $p1->lat;
                if ($p1->lat == $p2->lat || $p->lat <= $xinters) {
                    $c++;
                }
        }
        $p1 = $p2;
    }
    // if the number of edges we passed through is even, then it's not in the poly.
    return $c%2!=0;
}



$polygon = array(
    new Point(8.494447689033173, 124.6517647396423),
    new Point(8.49468975564717, 124.65185459364372), 
    new Point(8.494777297507396, 124.65161520650037), 
    new Point(8.49471164111411, 124.65159173717258),
    new Point(8.494664554198868, 124.65171981264706),
    new Point(8.494488807209033, 124.65165611018516),
    new Point(8.494447689033173, 124.6517647396423),
);

function test($lat, $long) {
    global $polygon;
    $ll=$lat.', '.$long;
    // echo (pointInPolygon(new Point($lat,$long), $polygon)) ? $ll .' is inside polygon<br>' : $ll.' is outside<br>';
    echo pointInPolygon(new Point($lat,$long), $polygon) ? "true" : "false";
}


test($employeeLat, $employeeLng);
// test(8.494248946505653, 124.65202668111144);
// test(8.494599601911714, 124.65175666051282);