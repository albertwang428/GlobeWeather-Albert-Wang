var sp;
var rdr;
var scene;
var camera;
var texture;
function sample(){
	addControlListeners();
	
	//globeObject = new THREE.Object3D();
	scene=new THREE.Scene();
	//scene.addObject(globeObject);
	
	camera=new THREE.Camera(45,window.innerWidth/window.innerHeight,1,10000);
	//渲染器
	rdr=new THREE.WebGLRenderer({antialias: true });
	rdr.setSize(window.innerWidth,window.innerHeight);
	//rdr.setClearColorHex(0xFFFFFF,1.0);

	//var axes=new THREE.AxisHelper(20);
	//scene.addObject(axes);

	//创建图片为材质
	texture=THREE.ImageUtils.loadTexture('image/continental.png');
	texture.magFilter=THREE.LinearFilter;
	texture.minFilter=THREE.LinearFilter;

	var texture2=THREE.ImageUtils.loadTexture('image/land_lights_bloom.png');
	texture2.magFilter=THREE.LinearFilter;
	texture2.minFilter=THREE.LinearFilter;
	//var gm=new THREE.SphereGeometry(150,200,200,0,Math.PI*2,0,Math.PI);
	var gm=new THREE.Sphere(200,40,30);
	
	var uniforms={
		Continental:{type:'t',value:1,texture:texture},
		Coast:{type:'t',value:0,texture:texture2},
		mul:{type:"f",value:0.0},
	}

	var vertShader=document.getElementById("globeVertexShader").textContent;
	var fragShader=document.getElementById("globeFragmentShader").textContent;

	var mt=new THREE.MeshShaderMaterial({
		uniforms:uniforms,
		vertexShader:vertShader,
		fragmentShader:fragShader
	});

	sp=new THREE.Mesh(gm,mt);
	//sp.position.x=10;
	//sp.position.y=10;
	//sp.position.z=10;

	scene.addObject(sp);

	camera.position.x=0;
	camera.position.y=0;
	camera.position.z=1000;
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
	updateGlobeAndCamera();
	rdr.render(scene,camera);
}
window.onload=sample;

