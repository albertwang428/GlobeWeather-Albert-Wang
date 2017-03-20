var sp;
var rdr;
var scene;
var camera;
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
	var texture1=THREE.ImageUtils.loadTexture("image/continental.png");
	texture1.magFilter=THREE.LinearFilter;
	texture1.minFilter=THREE.LinearFilter;
	var texture2=THREE.ImageUtils.loadTexture("image/coast.png");
	texture2.magFilter=THREE.LinearFilter;
	texture2.minFilter=THREE.LinearFilter;
	var gm=new THREE.SphereGeometry(150,40,40,0,Math.PI*2,0,Math.PI);
	
	var uniforms={
		Continental:{type:'t',value:0},
		Coast:{type:'t',value:0}
	}

	uniforms["Continental"].texture=texture1;

	var vertShader=document.getElementById("globeVertexShader").innerHTML;
	var fragShader=document.getElementById("globeFragmentShader").innerHTML;

	var mt=new THREE.ShaderMaterial({
		uniforms:uniforms,
		vertexShader:vertShader,
		fragmentShader:fragShader
	});

	sp=new THREE.Mesh(gm,mt);

	scene.add(sp);

	camera.position.x=30;
	camera.position.y=30;
	camera.position.z=30;
	camera.lookAt(new THREE.Vector3(0,0,0));

	document.getElementById("container").appendChild(rdr.domElement);
	renderScene();
}
var step=0;
function renderScene(){
	//step+=0.04;
	//sp.position.x=20+(10*(Math.cos(step)));
	//sp.position.y=2+(10*Math.abs(Math.sin(step)));

	//requestAnimationFrame(renderScene);
	rdr.render(scene,camera);
}
window.onload=sample;