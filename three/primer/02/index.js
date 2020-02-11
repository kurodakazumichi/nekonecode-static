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

  // 球を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const material = new THREE.MeshStandardMaterial({color:0xFF0000});
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // ディレクショナルライト
  const light = new THREE.DirectionalLight(0xFFFFFF);
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

    sphere.rotation.y += 0.01;


    // レンダリング
    renderer.render(scene, camera);
  }
}