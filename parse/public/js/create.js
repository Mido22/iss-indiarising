
navigator.getUserMedia = ( navigator.getUserMedia ||navigator.mozGetUserMedia ||navigator.webkitGetUserMedia  ||navigator.msGetUserMedia);

      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");

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

});


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
	// Create a new instance of that class.
	var sf = new SpotFix();
	sf.set("title", $('#dName').val());
	sf.set("createdAt", $('#dDate').val());
	sf.set("address", $('#dAddress').val());
	sf.set("description", $('#dDesc').val());
	sf.set("hours_required", $('#dManpower').val());
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
    		alert('New object created with objectId: ' + newObj.id);
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