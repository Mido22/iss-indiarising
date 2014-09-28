$(document).ready(function(){

navigator.getUserMedia = ( navigator.getUserMedia ||navigator.mozGetUserMedia ||navigator.webkitGetUserMedia  ||navigator.msGetUserMedia);
  // Try HTML5 geolocation
  /*
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      console.log('asda');
    },  showMessage('Error: The Geolocation service failed.','error'));
  } else {
    showMessage('Error: Your browser doesn\'t support geolocation.', 'error');
  }
*/
    console.log('fh 123');

if(navigator.getUserMedia){

    console.log('herytah 123');
  navigator.getUserMedia({ video: true, audio:true}, function(stream) {
    console.log('hah 123');
    var video =  $('#video')[0];
   video.src = window.URL.createObjectURL(stream);
    video.muted=true;
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

})