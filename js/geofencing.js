var employeeLocation = { lat: 8.494248946505653, lng: 124.65202668111144 };
var officeLocation = { lat: 8.494599601911714, lng: 124.65175666051282 };
var officePolygonPoints = [
    { lat: 8.494447689033173, lng: 124.65176473964237 },
    { lat: 8.49468975564717, lng: 124.65185459364372 },
    { lat: 8.494777297507396, lng: 124.65161520650037 },
    { lat: 8.49471164111411, lng: 124.65159173717258 },
    { lat: 8.494664554198868, lng: 124.65171981264706 },
    { lat: 8.494488807209033, lng: 124.65165611018516 },
    { lat: 8.494447689033173, lng: 124.65176473964237 },
];

var map;
var mapMarkers = [];
var mapPolygons = [];

function initMap() {
    document.getElementById("employeeLat").value = employeeLocation.lat;
    document.getElementById("employeeLng").value = employeeLocation.lng;

    generateMap();
    generateMapMarkers();
    generateMapPolygon();
}

function generateMap() {
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: employeeLocation,
            zoom: 19,
            disableDefaultUI: true,
        }
    );

    map.addListener("click", function (event) {
        updateMap(event.latLng.toJSON());
    });
}

function updateMap(eventLatLng) {
    employeeLocation = eventLatLng;

    document.getElementById("employeeLat").value = employeeLocation.lat;
    document.getElementById("employeeLng").value = employeeLocation.lng;

    map.setCenter(employeeLocation);

    generateMapMarkers();
    generateMapPolygon();
}

function generateMapMarkers() {
    for (var x = 0; x < mapMarkers.length; x++) {
        mapMarkers[x].setMap(null);
    };
    mapMarkers = [];


    var employeeMarker = new google.maps.Marker({
        position: employeeLocation,
        title: "Employee",
        icon: "assets/images/employee-marker.png",
        map: map,
    });

    mapMarkers.push(employeeMarker);
}

async function generateMapPolygon() {
    var checkJSResult = checkPolygonContainsLocationJS();

    document.getElementById("checkJS").innerHTML = checkJSResult;

    var checkPHPResult = await checkPolygonContainsLocationPHP();

    document.getElementById("checkPHP").innerHTML = checkPHPResult;

    for (var i = 0; i < mapPolygons.length; i++) {
        mapPolygons[i].setMap(null);
    };
    mapPolygons = [];


    var officePolygon = new google.maps.Polygon({
        paths: officePolygonPoints,
        fillColor: checkPHPResult ? "#00FF00" : "#000000",
        fillOpacity: checkPHPResult ? 0.275 : 0.35,
        strokeColor: checkPHPResult ? "#41495C" : "#F56F6C",
        strokeWeight: 1,
        map: map,
    });

    officePolygon.addListener("click", function (event) {
        updateMap(event.latLng.toJSON());
    });

    mapPolygons.push(officePolygon);
}


function checkPolygonContainsLocationJS() {
    var containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        new google.maps.Polygon({ paths: officePolygonPoints }),
    );

    return containsLocation;
}

async function checkPolygonContainsLocationPHP() {
    var containsLocation;

    await jQuery.ajax({
        type: "POST",
        url: 'api/geofencing.php',
        data: {
            employeeLat: String(employeeLocation.lat),
            employeeLng: String(employeeLocation.lng),
            officePolygonPoints: JSON.stringify(officePolygonPoints),
        },
        success: function (response) {
            containsLocation = JSON.parse(response);
        }
    });

    return containsLocation;
}