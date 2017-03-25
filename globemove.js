////////////////////////////////////////
//	Things that control globe rotation
//	and camera zooming
////////////////////////////////////////

var embed = location.search == '?embed';

if (!embed) {
  $(document.body).removeClass('embed');

} else { 
  $('#ce').attr('href', 'http://workshop.chromeexperiments.com/projects/cloudglobe').attr('target', '_blank');
}

var rotation = { x: 0, y: 0 };
var target = { x: Math.PI*3/2, y: embed ? 0 : Math.PI / 6.0 };
var targetOnDown = { x: 0, y: 0 };
var distance = 100000;
var distanceTarget = 700;
var cameraPushIn = 1.1;

var globeRotationPower = 0.1;
var zoomPower = 0.3;

//	doesn't actually rotate the camera but the globe itself
//	zooming does move the camera though!
function updateGlobeAndCamera(){
	rotation.x += ( target.x - rotation.x ) * globeRotationPower;
	rotation.y += ( target.y - rotation.y ) * globeRotationPower;

  if (embed) {
    target.x += 0.001;
  }


	globeObject.rotation.y = -Math.PI/2 - rotation.x;
	globeObject.rotation.x = rotation.y;


	distance += ( distanceTarget - distance ) * zoomPower;	
	camera.position.z = distance * cameraPushIn;

}

function constrainZoom(){
	distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
	distanceTarget = distanceTarget < 600 ? 600 : distanceTarget;	
}