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
  const camera = new THREE.PerspectiveCamera(60, width/height, 1, 10000);
  camera.position.set(0, 500, 1000);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // コンテナを作成
  const container = new THREE.Object3D();
  scene.add(container);

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({color:0xFFF0AA});

  // ジオメトリを作成
  const geometries = [
    new THREE.SphereGeometry(50, 32, 32),
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.PlaneGeometry(100, 100),
    new THREE.TetrahedronGeometry(100, 0),
    new THREE.ConeGeometry(100, 100, 32),
    new THREE.CylinderGeometry(50, 50, 100, 32),
    new THREE.TorusGeometry(50, 30, 16, 100)
  ];


  geometries.map((geo, index) => {
    const mesh = new THREE.Mesh(geo, material);
    container.add(mesh);

    mesh.position.x = 400 * Math.sin((index/geometries.length) * Math.PI * 2);
    mesh.position.z = 400 * Math.cos((index/geometries.length) * Math.PI * 2);
  })


  // ディレクショナルライト
  const light = new THREE.DirectionalLight(0x888888);
  light.intensity = 2;
  light.position.set(1, 1, 1);
  scene.add(light);

  // 環境光
  const ambient = new THREE.AmbientLight(0x333333);
  scene.add(ambient);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    container.rotation.y += 0.01;

    container.children.map((mesh) => {
      mesh.rotation.y += 0.02;
      mesh.rotation.z += 0.02;
    })

    // レンダリング
    renderer.render(scene, camera);
  }
}