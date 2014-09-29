function initialize() {
      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");
      var mapCanvas = document.getElementById('map_canvas');
      var mapOptions = {
          center: new google.maps.LatLng(1.289478890541, 103.80733282853),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
      var event = Parse.Object.extend("event");
      var marker;
      var query = new Parse.Query(event);
      query.find({
      success: function(results) {
      
    // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
       
        var myLatlng = new google.maps.LatLng(object.get('location').latitude,object.get('location').longitude);
        marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Hello World!'
  });

        }
      },
      error: function(error) {
      alert("Error: " + error.code + " " + error.message);
      }
    });       
      }
     /* google.maps.event.addListener(map, 'center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}*/

      google.maps.event.addDomListener(window, 'load', initialize);