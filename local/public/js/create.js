$(document).ready(function(){
var video1 =  $('#video1')[0];
var video2 =  $('#video2')[0];
$('#video1').hide();
$('#canvas1').hide();
navigator.getUserMedia = ( navigator.getUserMedia ||navigator.mozGetUserMedia ||navigator.webkitGetUserMedia  ||navigator.msGetUserMedia);
  // Try HTML5 geolocation
 
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      console.log('asda lat ='+position.coords.latitude+', log = '+position.coords.longitude);
    },  showMessage('Error: The Geolocation service failed.','error'));
  } else {
    showMessage('Error: Your browser doesn\'t support geolocation.', 'error');
  }
 /**/

if(navigator.getUserMedia){
  navigator.getUserMedia({ video: true}, function(stream) {
   video1.src = window.URL.createObjectURL(stream);
   video2.src = window.URL.createObjectURL(stream);
    video1.muted=true;
    video2.muted=true;
    //$('#video').hide();
  },  function(){
    showMessage('unable to get camera', 'error');
  });
}else{
    showMessage('no camera access mate.', 'error');
}



function showMessage(msg,type) { // type 'success' or 'error'
    $('#msg').text(msg);
}

$('#capture').click(function(){
  console.log('clicked');
  var canvas = $('#canvas1')[0];
  var context = canvas.getContext('2d');
  context.drawImage(video1,0,0);
  img.src = canvas.toDataURL();
});



})