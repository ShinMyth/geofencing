var map;

function initMap(employeeLocation, officeLocation, officePolygonPoints) {
    generateMap(employeeLocation);
    generateMapMarkers(employeeLocation, officeLocation);
    generateMapPolygon(employeeLocation, officePolygonPoints);
}

function generateMap(employeeLocation) {
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: employeeLocation,
            zoom: 19,
            disableDefaultUI: true,
        }
    );
}


function generateMapMarkers(employeeLocation, officeLocation) {
    new google.maps.Marker({
        position: employeeLocation,
        title: "Employee",
        icon: "assets/images/employee-marker.png",
        map,
    });
    new google.maps.Marker({
        position: officeLocation,
        title: "Office",
        icon: "assets/images/office-marker.png",
        map,
    });
}

function generateMapPolygon(employeeLocation, officePolygonPoints) {
    var result = checkOfficePolygonContainsLocation(employeeLocation, officePolygonPoints);

    var officePolygon;
    if (result) {
        officePolygon = new google.maps.Polygon({
            paths: officePolygonPoints,
            strokeColor: "#0000FF",
            strokeOpacity: 0.75,
            strokeWeight: 1.5,
            fillColor: "#0000FF",
            fillOpacity: 0.375,
        });
    } else {
        officePolygon = new google.maps.Polygon({
            paths: officePolygonPoints,
            strokeColor: "#FF0000",
            strokeOpacity: 0.75,
            strokeWeight: 1.5,
            fillColor: "#FF0000",
            fillOpacity: 0.375,
        });
    }

    officePolygon.setMap(map);
}


function checkOfficePolygonContainsLocation(employeeLocation, officePolygonPoints) {
    const officePolygon = new google.maps.Polygon({ paths: officePolygonPoints });

    const containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        officePolygon,
    );

    return containsLocation;
}
