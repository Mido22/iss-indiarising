$(document).ready(function(){


               // $('#datetimepicker1').datetimepicker();
//$('#video2').hide();
//$('#canvas1').hide();
navigator.getUserMedia = ( navigator.getUserMedia ||navigator.mozGetUserMedia ||navigator.webkitGetUserMedia  ||navigator.msGetUserMedia);
  // Try HTML5 geolocation
 /*
var video1 =  $('#video1')[0];
var video2 =  $('#video2')[0];
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      console.log('asda lat ='+position.coords.latitude+', log = '+position.coords.longitude);
    },  showMessage('Error: The Geolocation service failed.','error'));
  } else {
    showMessage('Error: Your browser doesn\'t support geolocation.', 'error');
  }


if(navigator.getUserMedia){
  navigator.getUserMedia({ video: true}, function(stream) {
   video1.src = window.URL.createObjectURL(stream);
   video2.src = window.URL.createObjectURL(stream);
    //$('#video').hide();
  },  function(){
    showMessage('unable to get camera', 'error');
  });
}else{
    showMessage('no camera access mate.', 'error');
}
 */
  $('.input-group.date').datepicker({
        format: "yyyy/mm/dd",
        startDate: "2012-01-01",
        endDate: "2015-01-01",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });

function showMessage(msg,type) { // type 'success' or 'error'
    $('#msg').text(msg);
}

$('#capture').click(function(){
  console.log('clicked');
  var canvas = $('#canvas1')[0];
  var context = canvas.getContext('2d');
  video1.height= 480;
  video1.width=640;
  canvas.height= video2.height*2;
  canvas.width= video2.width*2;
  console.log(video1.width,video1.height,0,0,canvas.width,canvas.height);
  context.drawImage(video1,0,0,video1.width,video1.height,0,0,canvas.width,canvas.height);
  img.src = canvas.toDataURL();
});



})