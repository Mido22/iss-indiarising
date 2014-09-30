var ServerPath='http://widgeta.com/voting/displayrating.php';

style='border:none;width:100px;height:24px;overflow:hidden';

var fullpath=ServerPath+'?ref='; 
  if ($rating_widget_url=='')
	fullpath+=encodeURIComponent(window.location.href);
  else
	fullpath+=encodeURIComponent($rating_widget_url);
if ($rating_widget_type=='rate') {
	//rate
	fullpath+='&type=1&theme='+$rating_widget_theme;

var colorstr=$rating_widget_color;

fullpath+='&color='+colorstr.replace("#","");



} else if ($rating_widget_type=='thumb') {
	//thumb
	fullpath+='&type=2&theme='+$rating_widget_theme;
var colorstr=$rating_widget_color;

fullpath+='&color='+colorstr.replace("#","");

};
document.write('<iframe frameborder=0 scrolling="no" src="'+fullpath+'" style="'+style+'"></iframe>');