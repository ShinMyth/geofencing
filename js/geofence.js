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
        updateMap(event.latLng);
    });
}

function updateMap(eventLatLng) {
    employeeLocation = eventLatLng;
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

    var officeMarker = new google.maps.Marker({
        position: officeLocation,
        title: "Office",
        icon: "assets/images/office-marker.png",
        map: map,
    });
    
    mapMarkers.push(officeMarker);
}

function generateMapPolygon() {
    var result = checkPolygonContainsLocation();

    for (var i = 0; i < mapPolygons.length; i++) {
        mapPolygons[i].setMap(null);
    };
    mapPolygons = [];

    var officePolygon = new google.maps.Polygon({
        paths: officePolygonPoints,
        fillColor: result ? "#00FF00" : "#000000" ,
        fillOpacity: result ? 0.275 : 0.35,
        strokeColor: result ? "#41495C" : "#F56F6C",
        strokeWeight: 1,
        map: map,
    });

    officePolygon.addListener('click', function (event) {
        updateMap(event.latLng);
    });

    mapPolygons.push(officePolygon);
}


function checkPolygonContainsLocation() {
    var officePolygon = new google.maps.Polygon({ paths: officePolygonPoints });

    var containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        officePolygon,
    );

    return containsLocation;
}
