

function testInit(officeLocation, officePolygonPoints, employeeLocation) {
    map = new google.maps.Map(
        document.getElementById("map"),
        {
            center: employeeLocation,
            zoom: 19,
            disableDefaultUI: true,
        }
    );

    const officePolygon = new google.maps.Polygon({
        paths: officePolygonPoints,
        strokeColor: "#0000FF",
        strokeOpacity: 0.75,
        strokeWeight: 1.5,
        fillColor: "#0000FF",
        fillOpacity: 0.375,
    });

    officePolygon.setMap(map);

    new google.maps.Marker({
        position: officeLocation,
        icon: "assets/images/office-marker.png",
        map,
        title: "Office",
    });

    new google.maps.Marker({
        position: employeeLocation,
        icon: "assets/images/employee-marker.png",
        map,
        title: "Employee",
    });
}

function checkOfficePolygonContainsLocation(employeeLocation, officePolygonPoints) {
    const officePolygon = new google.maps.Polygon({ paths: officePolygonPoints });

    const containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        officePolygon,
    );

    alert("Office Polygon Contains Location: " + containsLocation);
}
