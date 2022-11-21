var map;
var mapMarkers = [];
var mapPolygons = [];

var employeeLocation;
var officeLocation;
var officePolygonPoints;

function initMap(employeeLocationValue, officeLocationValue, officePolygonPointsValue) {
    employeeLocation = employeeLocationValue;
    officeLocation = officeLocationValue;
    officePolygonPoints = officePolygonPointsValue;

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

    // var officeMarker = new google.maps.Marker({
    //     position: officeLocation,
    //     title: "Office",
    //     icon: "assets/images/office-marker.png",
    //     map: map,
    // });

    // mapMarkers.push(officeMarker);
}

async function generateMapPolygon() {
    var result = checkPolygonContainsLocation();

    document.getElementById("checkJS").innerHTML = result;

    var result2 = await checkPolygonContainsLocation2();

    document.getElementById("checkPHP").innerHTML = result2;

    for (var i = 0; i < mapPolygons.length; i++) {
        mapPolygons[i].setMap(null);
    };
    mapPolygons = [];


    var officePolygon = new google.maps.Polygon({
        paths: officePolygonPoints,
        fillColor: result2 ? "#00FF00" : "#000000",
        fillOpacity: result2 ? 0.275 : 0.35,
        strokeColor: result2 ? "#41495C" : "#F56F6C",
        strokeWeight: 1,
        map: map,
    });

    officePolygon.addListener("click", function (event) {
        updateMap(event.latLng.toJSON());
    });

    mapPolygons.push(officePolygon);
}


function checkPolygonContainsLocation() {
    var containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        new google.maps.Polygon({ paths: officePolygonPoints }),
    );

    return containsLocation;
}

async function checkPolygonContainsLocation2() {
    var containsLocation;

    await jQuery.ajax({
        type: "POST",
        url: 'api/geofencing.php',
        data: { employeeLat: String(employeeLocation.lat), employeeLng: String(employeeLocation.lng) },
        success: function (response) {
            if (response == "true") { containsLocation = true } else { containsLocation = false }
        }
    });

    return containsLocation;

}