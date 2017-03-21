var sp;
var rdr;
var scene;
var camera;
var texture;
function sample(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
	rdr=new THREE.WebGLRenderer();
	rdr.setSize(window.innerWidth,window.innerHeight);

	var axes=new THREE.AxisHelper(20);
	scene.add(axes);

	var light=new THREE.SpotLight(0xffffff);
	light.position.set(0,60,30);
	scene.add(light);
	//创建图片为材质
	texture=THREE.ImageUtils.loadTexture('image/coast.png');
	texture.magFilter=THREE.LinearFilter;
	texture.minFilter=THREE.LinearFilter;

	var texture2=THREE.ImageUtils.loadTexture("image/coast.png");
	texture2.magFilter=THREE.LinearFilter;
	texture2.minFilter=THREE.LinearFilter;
	var gm=new THREE.SphereGeometry(10,40,40,0,Math.PI*2,0,Math.PI);
	
	var uniforms={
		Continental:{type:'t',value:1,texture:texture},
		Coast:{type:'t',value:0}
	}

	var vertShader=document.getElementById("globeVertexShader").innerHTML;
	var fragShader=document.getElementById("globeFragmentShader").innerHTML;

	var mt=new THREE.ShaderMaterial({
		uniforms:uniforms,
		vertexShader:vertShader,
		fragmentShader:fragShader
	});

	sp=new THREE.Mesh(gm,mt);
	sp.position.x=10;
	sp.position.y=10;
	sp.position.z=10;

	scene.add(sp);

	camera.position.x=30;
	camera.position.y=30;
	camera.position.z=100;
	camera.lookAt(new THREE.Vector3(0,0,0));

	document.getElementById("container").appendChild(rdr.domElement);
	renderScene();
}
var step=0;
function renderScene(){
	//step+=0.04;
	//sp.position.x=20+(10*(Math.cos(step)));
	//sp.position.y=2+(10*Math.abs(Math.sin(step)));
	//texture.needsUpdate=true;
	requestAnimationFrame(renderScene);
	rdr.render(scene,camera);
}
window.onload=sample;
