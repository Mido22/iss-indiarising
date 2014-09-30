
      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");

$(document).ready(function(){

 $('#search').click(searchEvent);
$('#findCloseset').click(getLocation);
});

var dLoc,mapCanvas,sResults=[];

function showMessage(msg,type) {  // type can be success or error, based on that we can set class.
    $('#msg').text(msg);
}

function searchEvent(){
	console.log('in search event'+$('#dSearch').val());	
	var SpotFix = Parse.Object.extend("event");
  var query = new Parse.Query(SpotFix);
  query.select("address",'creater','description','location','status','title','hours_required','fixDate','createrName');
  query.limit(50);
  query.contains("searchKeys", ($('#dSearch').val()).toLowerCase());
  query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " events.");
        $('#sr').empty();
         $( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="searchTable"></table>' ).appendTo($('#sr'));
        sResults=results;
        var dataSet=[],row;
        sResults.forEach(function(d){
            console.log('SON : '+JSON.stringify(d));
            row=[];
            row.push(d.get('title'));
            row.push(d.get('fixDate'));
            row.push(d.get('address'));
            row.push(d.get('description'));
            row.push(d.get('hours_required'));
            row.push(d.get('createrName'));
            console.log('geo : '+d.get('location').latitude );
            dataSet.push(row);
        });
        console.log('ds:'+JSON.stringify(dataSet));
        $('#searchTable').dataTable( {
          "data": dataSet,
          "columns": [
            { "title": "Title" },
            { "title": "Fix Date" },
            { "title": "Address" },
            { "title": "Description" },
            { "title": "Resources Required" },
            { "title": "Chosen By" }
          ]
        } ); 
        
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
