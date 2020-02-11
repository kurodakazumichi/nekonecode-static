window.addEventListener("DOMContentLoaded", init);

function init() {
  const width  = 960;
  const height = 540;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#myCanvas")
  });

  // デバイスピクセル比の設定
  // これを設定しないとスマホだとぼやけて表示されます
  renderer.setPixelRatio(window.devicePixelRatio);

  // レンダラーのサイズを設定する(デフォルトは小さい)
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  // 引数は (画角, アスペクト比, near, far)
  const camera = new THREE.PerspectiveCamera(45, width/height, 1, 10000);
  camera.position.set(0, 0, +1000);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  // 箱を作成
  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({color:0x009F8C});
  const box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // アンビエントライト
  const amb = new THREE.AmbientLight(0x333333);
  scene.add(amb);

  // ディレクショナルライト
  const light = new THREE.DirectionalLight(0xAAAAAA);
  light.intensity = 2;
  light.position.set(1, 1, 1);
  scene.add(light);

  // GUI
  const params = {
    pos: {
      x:0, y:0, z:0
    },
    sca: {
      x:1, y:1, z:1
    },
    rot: {
      x:0, y:0, z:0
    }
  }
  const gui = new dat.GUI();
  const f1  = gui.addFolder('Position');
  f1.add(params.pos, "x");
  f1.add(params.pos, "y");
  f1.add(params.pos, "z");
  f1.open();

  const f2 = gui.addFolder('Scale');
  f2.add(params.sca, "x");
  f2.add(params.sca, "y");
  f2.add(params.sca, "z");

  const f3 = gui.addFolder('Rotation')
  f3.add(params.rot, "x", 0, Math.PI * 4);
  f3.add(params.rot, "y", 0, Math.PI * 4);
  f3.add(params.rot, "z", 0, Math.PI * 4);

  function update() {
    const { pos, sca, rot } = params;
    box.position.set(pos.x, pos.y, pos.z);
    box.scale.set(sca.x, sca.y, sca.z);
    box.rotation.set(rot.x, rot.y, rot.z);

  }

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    update();
    controls.update();

    // レンダリング
    renderer.render(scene, camera);
  }
}