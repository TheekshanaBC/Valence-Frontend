"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js"
import { RenderPass } from "three/addons/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js"
import { OutputPass } from "three/addons/postprocessing/OutputPass.js"
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js"
import { FontLoader } from "three/addons/loaders/FontLoader.js"
import { TextGeometry } from "three/addons/geometries/TextGeometry.js"

export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    // Make background transparent so the molecule background can still be seen slightly if needed, 
    // or keep it dark as intended by the 3D scene. The original had 0x04070a.
    // I'll set clearColor to transparent to blend perfectly with the site.
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.85
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    // scene.background = new THREE.Color(0x04070a); // Removed to make transparent
    // scene.fog = new THREE.FogExp2(0x04070a, 0.035); // Removed to keep transparency clean, or we can keep it for depth
    
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 7.5)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.enablePan = false
    controls.enableZoom = false
    controls.maxPolarAngle = Math.PI * 0.75
    controls.minPolarAngle = Math.PI * 0.25

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envScene = new THREE.Scene()
    envScene.add(new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ color: 0x0d1420, side: THREE.BackSide })))
    const addPanel = (w: number, h: number, color: number, pos: [number, number, number]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color }))
      m.position.set(...pos)
      m.lookAt(0, 0, 0)
      envScene.add(m)
    }
    addPanel(14, 5, 0xffffff, [-6, 8, 4])
    addPanel(10, 3, 0x9fc3d8, [7, 4, 6])
    addPanel(18, 4, 0x00e5ff, [0, -9, 3])
    addPanel(3, 12, 0x00e5ff, [-10, 0, -2])
    scene.environment = pmrem.fromScene(envScene, 0.04).texture
    pmrem.dispose()

    /* ---------- lights (balanced) ---------- */
    const ambient = new THREE.AmbientLight(0x0f2a3f, 2.5) // soft bluish ambient to lift black levels
    scene.add(ambient)
    
    const key = new THREE.DirectionalLight(0xffffff, 0.5)
    key.position.set(4, 6, 6)
    scene.add(key)
    const cy = new THREE.PointLight(0x8b5cf6, 20, 40)
    cy.position.set(-6, 2, -3)
    scene.add(cy)
    const tl = new THREE.PointLight(0x6366f1, 14, 40)
    tl.position.set(6, -2, -2)
    scene.add(tl)
    const rim = new THREE.PointLight(0x8b5cf6, 5, 20)
    rim.position.set(0, 0, -5)
    scene.add(rim)

    /* ---------- textures ---------- */
    function brushedTexture() {
      const s = 1024, c = document.createElement("canvas"); c.width = c.height = s;
      const x = c.getContext("2d")!;
      x.fillStyle = "#7f7f7f"; x.fillRect(0, 0, s, s);
      for (let i = 0; i < 1600; i++) {
        const r = Math.random() * s * 0.5, a0 = Math.random() * Math.PI * 2, a1 = a0 + 0.5 + Math.random() * 2;
        x.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${0.04 + Math.random() * 0.08})`
          : `rgba(0,0,0,${0.04 + Math.random() * 0.08})`;
        x.lineWidth = 0.5 + Math.random();
        x.beginPath(); x.arc(s / 2, s / 2, r, a0, a1); x.stroke();
      }
      const t = new THREE.CanvasTexture(c);
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    }
    function glowTexture() {
      const s = 256, c = document.createElement("canvas"); c.width = c.height = s;
      const x = c.getContext("2d")!;
      const g = x.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
      g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.4, "rgba(255,255,255,.4)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = g; x.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(c);
    }
    const brushed = brushedTexture()
    const glowTex = glowTexture()

    /* ---------- materials (slightly darker) ---------- */
    const metalBody = new THREE.MeshPhysicalMaterial({
      color: 0x1a2b3c, metalness: 0.9, roughness: 0.45,
      bumpMap: brushed, bumpScale: 0.015, roughnessMap: brushed,
      envMapIntensity: 0.6, clearcoat: 0.25, clearcoatRoughness: 0.4
    })
    const metalRim = new THREE.MeshPhysicalMaterial({
      color: 0x2a333a, metalness: 1, roughness: 0.18, envMapIntensity: 0.6,
      clearcoat: 0.6, clearcoatRoughness: 0.2
    })
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0x2e1065, emissive: 0x8b5cf6, emissiveIntensity: 1.1, roughness: 0.3, metalness: 0
    })
    const glowMatDim = glowMat.clone(); glowMatDim.emissiveIntensity = 0.55
    const electronMat = new THREE.MeshStandardMaterial({
      color: 0xe0e7ff, emissive: 0xa78bfa, emissiveIntensity: 2.2, roughness: 0.2, metalness: 0
    })

    /* ---------- coin ---------- */
    const R = 2, H = 0.22
    const coin = new THREE.Group()
    scene.add(coin)

    const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, H, 128), metalBody)
    body.rotation.x = Math.PI / 2
    coin.add(body)

    for (const s of [1, -1]) {
      const outerRim = new THREE.Mesh(new THREE.TorusGeometry(R - 0.02, 0.06, 32, 128), metalRim)
      outerRim.position.z = s * H / 2
      coin.add(outerRim)
      const innerRim = new THREE.Mesh(new THREE.TorusGeometry(R - 0.15, 0.025, 24, 128), metalRim)
      innerRim.position.z = s * (H / 2 - 0.002)
      coin.add(innerRim)
    }

    // Reeding (edge ridges)
    const ridgeCount = 180
    const ridgeGeo = new THREE.BoxGeometry(0.035, 0.03, H * 1.02)
    const ridges = new THREE.InstancedMesh(ridgeGeo, metalRim, ridgeCount)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < ridgeCount; i++) {
      const angle = (i / ridgeCount) * Math.PI * 2
      dummy.position.set(Math.cos(angle) * (R + 0.015), Math.sin(angle) * (R + 0.015), 0)
      dummy.rotation.z = angle
      dummy.updateMatrix()
      ridges.setMatrixAt(i, dummy.matrix)
    }
    ridges.instanceMatrix.needsUpdate = true
    coin.add(ridges)

    /* ---------- atoms with orbiting electrons ---------- */
    const allElectrons: any[] = []
    function makeAtom(mat: THREE.Material) {
      const g = new THREE.Group()

      const angles = [Math.PI / 2, Math.PI / 2 + Math.PI / 3, Math.PI / 2 - Math.PI / 3]
      for (const a of angles) {
        const orbit = new THREE.Group()
        orbit.rotation.z = a
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.028, 24, 160), mat)
        ring.scale.set(1, 0.42, 1)
        orbit.add(ring)
        for (let k = 0; k < 2; k++) {
          const electron = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), electronMat)
          orbit.add(electron)
          allElectrons.push({
            mesh: electron,
            angle: Math.random() * Math.PI * 2,
            speed: (0.8 + Math.random() * 0.6) * (Math.random() > 0.5 ? 1 : -1),
            radius: 1.42,
            scaleY: 0.42
          })
        }
        g.add(orbit)
      }
      return g
    }
    const atomFront = makeAtom(glowMat)
    atomFront.position.z = H / 2 + 0.02
    coin.add(atomFront)
    
    const atomBack = makeAtom(glowMatDim)
    atomBack.position.z = -(H / 2 + 0.02)
    atomBack.rotation.y = Math.PI
    coin.add(atomBack)

    /* VCN lettering */
    const FONT_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_bold.typeface.json"
    new FontLoader().load(FONT_URL, font => {
      const tg = new TextGeometry("VCN", {
        font, size: 0.65, depth: 0.12, curveSegments: 14,
        bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.025, bevelSegments: 3
      })
      tg.computeBoundingBox()
      const bb = tg.boundingBox!
      tg.translate(-(bb.max.x + bb.min.x) / 2, -(bb.max.y + bb.min.y) / 2, -bb.min.z)
      
      // Index 0: Face (glowing), Index 1: Bevel/Sides (metal border)
      const m = new THREE.Mesh(tg, [glowMat, metalRim])
      m.position.z = H / 2 + 0.02
      coin.add(m)
    }, undefined, () => {
      const c = document.createElement("canvas"); c.width = 512; c.height = 192;
      const x = c.getContext("2d")!;
      x.font = "700 130px Arial"; x.textAlign = "center"; x.textBaseline = "middle";
      x.fillStyle = "#8b5cf6"; x.fillText("VCN", 256, 100);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9, 0.71),
        new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, toneMapped: false })
      );
      m.position.z = H / 2 + 0.03; coin.add(m);
    })

    /* ---------- post-processing ---------- */
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    renderPass.clear = true
    renderPass.clearAlpha = 0
    composer.addPass(renderPass)
    
    // The UnrealBloomPass spreads faint light across the canvas.
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.35, 0.4, 0.85)
    composer.addPass(bloomPass)
    composer.addPass(new OutputPass())

    // Vignette pass to fade the edges to perfectly transparent, hiding the canvas "box"
    const vignetteShader = {
      uniforms: { tDiffuse: { value: null } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          float dist = distance(vUv, vec2(0.5));
          // Fade from center (0.25) to edge (0.5)
          float fade = smoothstep(0.5, 0.3, dist);
          gl_FragColor = vec4(texel.rgb * fade, texel.a * fade);
        }
      `
    }
    const vignettePass = new ShaderPass(vignetteShader)
    composer.addPass(vignettePass)

    /* ---------- interaction ---------- */
    const mouse = { x: 0, y: 0 }, target = { x: 0, y: 0 }
    
    const onPointerMove = (e: PointerEvent) => {
      // Calculate mouse position relative to the container, not window
      const rect = container.getBoundingClientRect()
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    container.addEventListener("pointermove", onPointerMove)

    let targetFlipX = 0, currentFlipX = 0
    const onClick = () => {
      targetFlipX += Math.PI * 2
    }
    renderer.domElement.addEventListener("click", onClick)

    let baseScale = 1
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        composer.setSize(width, height)
        baseScale = camera.aspect < 0.8 ? 0.8 : 1
      }
    })
    resizeObserver.observe(container)

    /* ---------- loop ---------- */
    const timer = new THREE.Timer()
    let t = 0
    let animationId: number

    function tick() {
      animationId = requestAnimationFrame(tick)
      timer.update()
      const dt = Math.min(timer.getDelta(), 0.05)
      t += dt

      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      currentFlipX += (targetFlipX - currentFlipX) * 0.04

      coin.rotation.y = Math.sin(t * 0.4) * 0.4 + mouse.x * 0.1
      coin.rotation.x = -0.18 + Math.sin(t * 0.23) * 0.04 + mouse.y * 0.07 + currentFlipX
      coin.rotation.z = Math.sin(t * 0.3) * 0.03
      coin.position.y = Math.sin(t * 0.8) * 0.06
      coin.scale.setScalar(coin.scale.x + (baseScale - coin.scale.x) * 0.06)

      for (const e of allElectrons) {
        e.angle += e.speed * dt
        e.mesh.position.x = Math.cos(e.angle) * e.radius
        e.mesh.position.y = Math.sin(e.angle) * e.radius * e.scaleY
        e.mesh.position.z = 0
      }

      glowMat.emissiveIntensity = 1.1 + Math.sin(t * 2) * 0.15

      controls.update()
      composer.render()
    }
    
    tick()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      container.removeEventListener("pointermove", onPointerMove)
      renderer.domElement.removeEventListener("click", onClick)
      resizeObserver.disconnect()
      pmrem.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full relative z-10 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ minHeight: "400px" }}
    />
  )
}
