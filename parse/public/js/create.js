
navigator.getUserMedia = ( navigator.getUserMedia ||navigator.mozGetUserMedia ||navigator.webkitGetUserMedia  ||navigator.msGetUserMedia);

      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");

var SITE_URL = 'indiarising.parseapp.com';
var EVENT_URI='event.html'
$(document).ready(function(){

  $('.input-group.date').datepicker({
        format: "yyyy/mm/dd",
        startDate: "2014-10-01",
        endDate: "2015-01-01",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });
 $('#dPhoto').change(readURL);
 $('#create').click(saveEvent);
$('#addressBtn').click(getLocation);
});

var dLoc,mapCanvas;

function showMessage(msg,type) {  // type can be success or error, based on that we can set class.
    $('#msg').text(msg);
}

function readURL() {
 	var input = $('#dPhoto')[0];
 	if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result).width(200);//.height(100);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveEvent(){
	console.log('in save event');	
	// Simple syntax to create a new subclass of Parse.Object.
	var SpotFix = Parse.Object.extend("event");
 	console.log('fdg = '+$('#dName').val());
 	var searchKeys = ($('#dName').val()+' ' +$('#dAddress').val()+ ' '+$('#dDesc').val()).toLowerCase();
	// Create a new instance of that class.
	var sf = new SpotFix();
	sf.set("title", $('#dName').val());
	sf.set("fixDate", $('#dDate').val());
	sf.set("address", $('#dAddress').val());
  sf.set("description", $('#dDesc').val());
  sf.set("createrName", 'Batman');
  sf.set("status", 0);
	sf.set("hours_required", $('#dManpower').val());
	sf.set("location", new Parse.GeoPoint(dLoc));
	sf.set("searchKeys", searchKeys);
	//sf.set("", $('#').value());
	//sf.set("", $('#').value());
	var fileUploadControl = $("#dPhoto")[0];	/**/
	if (fileUploadControl.files.length > 0) {
	  var file = fileUploadControl.files[0];
	  var name = fileUploadControl.value;
	  var parseFile = new Parse.File(name, file);	
	  parseFile.save().then(function() {
  		// The file has been saved to Parse.
  		console.log('photo saved to server.');
		sf.set("before", parseFile);
		sf.save(null, {
			success: function(newObj) {
    		// Execute any logic that should take place after the object is saved.
    		console.log('New object created with objectId: ' + newObj.id);
        window.location.replace(EVENT_URI+'?event='+newObj.id);
  			},
  			error: function(newObj, error) {
    			// Execute any logic that should take place if the save fails.
    			// error is a Parse.Error with an error code and message.
    			alert('Failed to create new object, with error code: ' + error.message);
  			}
	});

		//for retrival
		//var profilePhoto = profile.get("photoFile");
		//$("profileImg")[0].src = profilePhoto.url();
		}, function(error) {
  			// The file either could not be read, or could not be saved to Parse.
  			console.log('Photo not saved to server.');
	 });


	}
}

function getLocation(){
  if (navigator.geolocation) {
        var optn = {
            enableHighAccuracy : true,
            timeout : 1000000,
            maximumAge : 9999990
        };
	// Get the user's current position
	navigator.geolocation.watchPosition(showPosition, showError, optn);
	$('#gMap').removeClass('hidden');
    mapCanvas = document.getElementById('map_canvas');
	} else {
    	alert('Geolocation is not supported in your browser');
	}

}



function showPosition(position) {
      if(dLoc)  return;
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
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7
              },
              draggable: true,
        			map: map,
        			title: 'Location of the Spot Fix, drag it to right position'
  	  			});

      google.maps.event.addListener(marker, 'dragend', function(evt){
           // console.log('<p>Marker dropped: Current Lat: ' + evt.latLng.lat() + ' Current Lng: ' + evt.latLng.lng() + '</p>');
        dLoc={
           latitude:evt.latLng.lat(),
            longitude:evt.latLng.lng()
        };
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
