function checkOfficePolygonContainsLocation(employeeLocation, officePolygonPoints) {
    const officePolygon = new google.maps.Polygon({ paths: officePolygonPoints });

    const containsLocation = google.maps.geometry.poly.containsLocation(
        employeeLocation,
        officePolygon,
    );

    alert("Office Polygon Contains Location: " + containsLocation);
}
