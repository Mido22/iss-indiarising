
      Parse.initialize("fTrYXzUcG7ERobkJJmGIMozQLxjBrBmgKS4HuQhM", "lNABzspsFXBu53eST4p0fhHSOLZUnFADdOxl8Ye4");

var urlString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
      // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
    return query_string;
};
$(document).ready(function(){
  //$('body').hide();
	var id = urlString().event;
console.log(' id='+id);
searchEvent(id)
 //$('#search').click(searchEvent);
//$('#findCloseset').click(getLocation);
});

var dLoc,mapCanvas,sResults=[],map,markers={}, myLocation;


function searchEvent(id){
	var SpotFix = Parse.Object.extend("event");
  var query = new Parse.Query(SpotFix);
  query.select("address",'creater','description','location','status','title','hours_required','fixDate','createrName','before','after','downvoters','upvoters','pledgers');
  query.equalTo("objectId", id);
  query.find({
      success: showResults,
      error: function(error) {        alert("Error: " + error.code + " " + error.message);      }
  });
 
}

function showResults(results) {
  if(results.length<1)  {
    //$(body).html('check the link, something is wrong. ');
    alert('check the link, something is wrong. ');
    return;
  }
    var d =results[0];
    var dj = JSON.parse(JSON.stringify(d));
		console.log('retrive : '+JSON.stringify(dj));
    $('#dTitle').html(dj['title']);
    $('#dDate').html(dj['fixDate']);
    $('#dDesc').html(dj['description']);
    $('#dAddr').html(dj['address']);
    var status;
    switch(dj['status']+''){
      case '0': status = 'Created Spot';break;
      case '1': status = 'Finished Cleaning';break;
      case '2': status = 'Verified Cleaning';break;
    }
    console.log('status='+status);
    $('#dStatus').html(status);
    $('#Dfancy').attr('href',dj['before']['url']);
    $('#before').attr('src',dj['before']['url']);
    return;
        $('#gMap').removeClass('hidden');
        mapCanvas = document.getElementById('map_canvas');
        $('#sr').empty();
        $( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="searchTable"></table>' ).appendTo($('#sr'));
        sResults=results;
        var dataSet=[],row;
        sResults.forEach(function(d){
            row=[];
            row.push(d.get('title'));
            row.push(d.get('fixDate'));
            row.push(d.get('address'));
            row.push(d.get('description'));
            row.push(d.get('hours_required'));
            row.push(d.get('createrName'));
            showPosition(d.get('location'),d.get('status'),d.id );
            dataSet.push(row);
        });
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
        
      }

function showPosition(position,code,id) {

  var icon = {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 7
              };

  if(!(code==-1)){
    var colour;
    switch(code){
      case 0: colour='FF0000';break;
      case 1: colour='0000FF';break;
      case 2: colour='00FF00';break;
      default: colour='FFFFFF';break;
    }
    var path = 'http://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin%27i\\%27[M%27-2%27f\\hv%27a\\]h\\]o\\'+colour+'%27fC\\000000%27tC\\000000%27eC\\Lauto%27f\\&ext=.png';
    icon=  new google.maps.MarkerImage(path);
  }
  if(!map){
      var mapOptions = {
            center: new google.maps.LatLng(position.latitude, position.longitude),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
  }
        var marker = new google.maps.Marker({
              position:  new google.maps.LatLng(position.latitude,position.longitude),
              icon : icon,
              map: map,
              title: 'Location of the Spot Fix'
            });
        markers[id]=marker;
}