<?php

// Run script to use google maps api's and its libraries.
// And replace "YOUR_API_KEY" with key from google maps console.
echo '<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry"></script>';

// Run script to declare testing values.
echo '<script type="text/javascript" src="values.js"></script>';

// Run script to declare testing function.
echo '<script type="text/javascript" src="geofence.js"></script>';


// Run script to test.
echo '<script>checkOfficePolygonContainsLocation(employeeLocation2, officePolygonPoints)</script>';