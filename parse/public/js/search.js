
      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");

$(document).ready(function(){

 $('#search').click(searchEvent);
$('#findCloseset').click(getLocation);
});

var dLoc,mapCanvas;

function showMessage(msg,type) {  // type can be success or error, based on that we can set class.
    $('#msg').text(msg);
}

function searchEvent(){
	console.log('in search event'+$('#dSearch').val());	
	var SpotFix = Parse.Object.extend("event");
  var query = new Parse.Query(SpotFix);
  query.select("address",'creater','description','location','status','title','hours_required','fixDate');
  query.contains("searchKeys", ($('#dSearch').val()).toLowerCase());
  query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " events.");
        console.log('SON : '+JSON.stringify(results[0]));
        // Do something with the returned Parse.Object values
        //for (var i = 0; i < results.length; i++) {
          //var object = results[i];
          //alert(object.id + ' - ' + object.get('playerName'));
        //}
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
  });
 
}

function getLocation(){
  if (navigator.geolocation) {
        var optn = {
            enableHighAccuracy : true,
            timeout : 10000,
            maximumAge : 10000
        };
	// Get the user's current position
	navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
	$('#gMap').removeClass('hidden');
    mapCanvas = document.getElementById('map_canvas');
	} else {
    	alert('Geolocation is not supported in your browser');
	}

}

function showPosition(position) {
    	dLoc={
    		latitude:position.coords.latitude,
    		longitude:position.coords.longitude
    	};
    	var mapOptions = {
          	center: new google.maps.LatLng(dLoc.latitude, dLoc.longitude),
          	zoom: 18,
          	mapTypeId: google.maps.MapTypeId.ROADMAP
      	}
      	var map = new google.maps.Map(mapCanvas, mapOptions);
      	var myLatlng = new google.maps.LatLng(dLoc.latitude,dLoc.longitude);
      	var marker = new google.maps.Marker({
        			position: myLatlng,
        			map: map,
        			title: 'Location of the Spot Fix'
  	  			});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
