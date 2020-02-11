window.addEventListener("DOMContentLoaded", init);

function init() {
  const width  = 960;
  const height = 540;
  let rot = 0;

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

  // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('../../assets/texture/me.png');

  // マテリアルに画像を設定
  const material = new THREE.MeshStandardMaterial({map:texture});
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // 星屑を作成
  (() => {
    const geometry = new THREE.Geometry();

    for(let i = 0; i < 1000; i++) {
      geometry.vertices.push(
        new THREE.Vector3(
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
          3000 * (Math.random() - 0.5),
        )
      );
    }

    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff
    })

    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);
  })();

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

    rot += 0.5;
    const radian = (rot * Math.PI) / 180;
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.y = 1000 * Math.cos(radian);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    sphere.rotation.y -= 0.005;

    // レンダリング
    renderer.render(scene, camera);
  }
}