////////////////////////////////////////
//	ROTATION CONTROLS
////////////////////////////////////////

var mouse = { x: 0, y: 0 };
var mouseOnDown = { x: 0, y: 0 };
var dragging = false;

var PI_HALF = Math.PI / 2;
var clamp = PI_HALF * 0.25;

function addControlListeners(){
	window.addEventListener( 'mousedown', onMouseDown, false );
	window.addEventListener( 'mouseup', onMouseUp, false );
	window.addEventListener( 'mousewheel', onMouseWheel, false );	
	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'mouseout', onMouseOut, false );
}

function onMouseDown( event ) {
	mouseOnDown.x = - event.clientX;
	mouseOnDown.y = event.clientY;

	targetOnDown.x = target.x;
	targetOnDown.y = target.y;

	document.body.style.cursor = 'move';

	dragging = true;
	event.preventDefault();
}

function onMouseUp( event ) {
	document.body.style.cursor = 'auto';
	dragging = false;
}

function onMouseMove( event ) {
	mouse.x = - event.clientX;
	mouse.y = event.clientY;

	if(dragging){
		var zoomDamp = distance / 1000;

		target.x = targetOnDown.x + ( mouse.x - mouseOnDown.x ) * 0.005 * zoomDamp;
		target.y = targetOnDown.y + ( mouse.y - mouseOnDown.y ) * 0.005 * zoomDamp;

		target.y = target.y > clamp ? clamp : target.y;
		target.y = target.y < - clamp ? - clamp : target.y;		
	}
}

function onMouseOut(event) {
	document.body.style.cursor = 'auto';
}


////////////////////////////////////////
//	ZOOM CONTROLS
////////////////////////////////////////

function onMouseWheel(event) {
	event.preventDefault();
	zoom( event.wheelDeltaY * 0.3 );
}

function zoom( delta ) {
	distanceTarget -= delta;
	constrainZoom();
}

// function onWindowResize( event ) {
	// camera.aspect = window.innerWidth / window.innerHeight;
	// camera.updateProjectionMatrix();

	// renderer.setSize( window.innerWidth, window.innerHeight );
	// timeline.setPosition( window.innerWidth / 2, window.innerHeight - 80 );
// }