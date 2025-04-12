'use client'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function FlowingBackground() {
    const [mounted, setMounted] = useState(false)
    const canvasRef = useRef<HTMLDivElement>(null)
    const mousePosition = useRef({ x: 0, y: 0 })
    const targetMousePosition = useRef({ x: 0, y: 0 })
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)

        if (!canvasRef.current) return

        // Create scene
        const scene = new THREE.Scene()
        sceneRef.current = scene

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)

        // Create renderer with transparent background and pixel ratio for crisper lines
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        rendererRef.current = renderer

        // Set pixel ratio for crisper lines
        renderer.setPixelRatio(window.devicePixelRatio)

        // Set light or dark mode based on theme
        const isLightTheme = resolvedTheme === 'light'

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(0x000000, 0) // Transparent background

        // Set canvas style
        renderer.domElement.style.position = 'fixed'
        renderer.domElement.style.top = '0'
        renderer.domElement.style.left = '0'
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.zIndex = '-1'
        renderer.domElement.style.pointerEvents = 'none'

        canvasRef.current.appendChild(renderer.domElement)

        // Track mouse position for interaction with smoother transition
        const updateMousePosition = (e: MouseEvent) => {
            // Update target position immediately
            targetMousePosition.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            }
        }

        window.addEventListener('mousemove', updateMousePosition)

        // Create wave grid - specifically tuned for crisp lines
        const geometry = new THREE.PlaneGeometry(40, 40, 160, 160)

        // Create shader material with theme-aware colors and enhanced contrast
        const material = new THREE.ShaderMaterial({
            wireframe: true,
            transparent: true,
            // Set line width (note: this has limited support in WebGL)
            linewidth: 1,
            uniforms: {
                time: { value: 0 },
                mousePosition: { value: new THREE.Vector2(0, 0) },
                // Enhanced color contrast for clearer lines
                color1: { value: new THREE.Color(isLightTheme ? 0xD9EDFF : 0x004080) }, // More saturated base color
                color2: { value: new THREE.Color(isLightTheme ? 0x80BFFF : 0x0066CC) }, // More saturated mid color
                color3: { value: new THREE.Color(isLightTheme ? 0x4D9FFF : 0x0088FF) }, // More saturated top color
                glowColor: { value: new THREE.Color(isLightTheme ? 0x00009D : 0x00AAFF) }, // Adjusted glow color
                glowRadius: { value: 0.2 },
                // Increase opacity for clearer lines
                opacity: { value: isLightTheme ? 0.2 : 0.2 },
                randomSeed: { value: Math.random() * 100 },
                waveScale: { value: new THREE.Vector2(0.7, 0.4) },
            },
            vertexShader: `
                uniform float time;
                uniform vec2 mousePosition;
                uniform float glowRadius;
                uniform float randomSeed;
                uniform vec2 waveScale;
                
                varying vec2 vUv;
                varying float vDistance;
                
                // Improved noise function
                float random(vec2 st) {
                    return fract(sin(dot(st.xy + randomSeed, vec2(12.9898, 78.233))) * 43758.5453123);
                }
                
                // Simplex noise function
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
                
                float snoise(vec2 v) {
                    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                        -0.577350269189626, // -1.0 + 2.0 * C.x
                                        0.024390243902439); // 1.0 / 41.0
                    
                    // First corner
                    vec2 i  = floor(v + dot(v, C.yy));
                    vec2 x0 = v -   i + dot(i, C.xx);
                    
                    // Other corners
                    vec2 i1;
                    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                    vec4 x12 = x0.xyxy + C.xxzz;
                    x12.xy -= i1;
                    
                    // Permutations
                    i = mod289(i); // Avoid truncation effects in permutation
                    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                        + i.x + vec3(0.0, i1.x, 1.0 ));
                        
                    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                    m = m*m;
                    m = m*m;
                    
                    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
                    vec3 x = 2.0 * fract(p * C.www) - 1.0;
                    vec3 h = abs(x) - 0.5;
                    vec3 ox = floor(x + 0.5);
                    vec3 a0 = x - ox;
                    
                    // Normalise gradients implicitly by scaling m
                    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                    
                    // Compute final noise value at P
                    vec3 g;
                    g.x  = a0.x  * x0.x  + h.x  * x0.y;
                    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                    return 130.0 * dot(m, g);
                }
                
                void main() {
                    vUv = uv;
                    
                    // Create wave pattern - extremely slow movement
                    vec3 pos = position;
                    
                    // Multiple wave layers with different frequencies - slow time factor
                    float superSlowTime = time * 0.03;
                    
                    // Use noise for more natural, random-looking movement
                    // More balanced wave amplitudes for visible but not overwhelming waves
                    float noise1 = snoise(vec2(pos.x * 0.015 * waveScale.x + superSlowTime * 0.10, 
                         pos.y * 0.02 * waveScale.y + superSlowTime * 0.09)) * 1.2;
                    float noise2 = snoise(vec2(pos.x * 0.008 * waveScale.x - superSlowTime * 0.07, 
                         pos.y * 0.01 * waveScale.y + superSlowTime * 0.04)) * 1.4;
                    float noise3 = snoise(vec2(pos.x * 0.03 * waveScale.x + superSlowTime * 0.03, 
                         pos.y * 0.025 * waveScale.y - superSlowTime * 0.05)) * 0.7;
                    float noise4 = snoise(vec2(pos.x * 0.005 * waveScale.x - superSlowTime * 0.01, 
                         pos.y * 0.007 * waveScale.y + superSlowTime * 0.02)) * 1.5;
                    
                    // Traditional sine waves for rolling patterns - reduced amplitude
                    float wave1 = sin(pos.x * 0.06 + superSlowTime * 0.15) * cos(pos.y * 0.05 + superSlowTime * 0.10) * 0.18;
                    float wave2 = sin(pos.x * 0.03 + pos.y * 0.04 + superSlowTime * 0.05) * 0.15;
                    
                    // Subtle randomness
                    float rand = random(pos.xy * 0.008) * 0.04;
                    
                    // Combine waves - weighted for more natural appearance
                    pos.z = noise1 + noise2 + noise3 * 0.8 + noise4 * 0.6 + wave1 + wave2 + rand;
                    
                    // Mouse interaction physics - more subtle effect
                    vec4 worldPosition = modelViewMatrix * vec4(pos, 1.0);
                    vec4 projectedPosition = projectionMatrix * worldPosition;
                    vec3 ndc = projectedPosition.xyz / projectedPosition.w;
                    
                    // Calculate distance from vertex to mouse position
                    float dist = distance(ndc.xy, mousePosition);
                    
                    // Apply more subtle mouse influence with wider, more gradual falloff
                    if (dist < glowRadius * 4.0) { // Wider area for smoother transition
                        // Gentler influence with smoother falloff
                        float influence = 1.0 - smoothstep(0.0, glowRadius * 4.0, dist);
                        
                        // Less pronounced influence
                        influence *= 0.4;
                        
                        // More subtle ripple effect
                        float ripple = sin(dist * 3.5 - time * 1.2) * 0.3 + 0.7;
                        
                        // Apply gentler influence with ripple effect
                        pos.z += influence * ripple * 1.4;
                    }
                    
                    vDistance = 1.0 - smoothstep(0.0, glowRadius * 2.5, dist);
                    vDistance *= 1.2;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                uniform vec3 glowColor;
                uniform float opacity;
                uniform float time;
                varying vec2 vUv;
                varying float vDistance;
                
                void main() {
                    // Create smooth gradient based on position
                    vec3 baseColor;
                    if (vUv.y < 0.33) {
                        baseColor = mix(color1, color2, vUv.y * 3.0);
                    } else if (vUv.y < 0.66) {
                        baseColor = mix(color2, color3, (vUv.y - 0.33) * 3.0);
                    } else {
                        baseColor = color3;
                    }
                    
                    // Apply more subtle glow effect based on mouse distance
                    vec3 finalColor = mix(baseColor, glowColor, vDistance * 0.6); // Increased from 0.35
                    
                    // Subtle pulsation effect for natural appearance
                    float pulseEffect = sin(time * 0.05) * 0.03 + 0.97;
                    
                    // Adjusted opacity for better visibility
                    float finalOpacity = opacity * pulseEffect * (0.6 + vUv.y * 0.4) + vDistance * 0.35; // Increased from 0.18                     
                    gl_FragColor = vec4(finalColor, finalOpacity);
                }
            `
        })

        const mesh = new THREE.Mesh(geometry, material)

        // Position the grid for a different perspective
        mesh.rotation.x = -Math.PI / 3 // Changed from -Math.PI / 2.3 for a better viewing angle
        scene.add(mesh)

        // Position camera from a different angle
        camera.position.z = 7
        camera.position.y = 3.5
        camera.position.x = 1.5 // Add a slight offset for more dynamic view
        camera.lookAt(0, -1.5, 0)

        let time = 0

        function animate() {
            requestAnimationFrame(animate)

            // Extremely slow time progression for subtle waves
            time += 0.0025

            // Smooth mouse movement - slightly less responsive for more subtle effect
            mousePosition.current.x += (targetMousePosition.current.x - mousePosition.current.x) * 0.05
            mousePosition.current.y += (targetMousePosition.current.y - mousePosition.current.y) * 0.05

            // Update shader uniforms
            material.uniforms.time.value = time
            material.uniforms.mousePosition.value.x = mousePosition.current.x
            material.uniforms.mousePosition.value.y = mousePosition.current.y

            // Gentle camera movement adjusted for new angle
            camera.position.x = 1.5 + Math.sin(time * 0.008) * 0.12
            camera.position.y = 3.5 + Math.cos(time * 0.006) * 0.03
            camera.lookAt(Math.sin(time * 0.004) * 0.05, -1.5, 0)

            renderer.render(scene, camera)
        }

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', onWindowResize)
        animate()

        // Cleanup function
        return () => {
            window.removeEventListener('resize', onWindowResize)
            window.removeEventListener('mousemove', updateMousePosition)

            if (rendererRef.current) {
                material.dispose()
                geometry.dispose()
                scene.remove(mesh)

                if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
                    canvasRef.current.removeChild(renderer.domElement)
                }

                renderer.dispose()
            }
        }
    }, [resolvedTheme])

    // Fix hydration mismatch by using a consistent class name and applying theme-based styles after mounting
    // During SSR, we'll render with a constant opacity class, then update it on the client side
    const opacityClass = mounted
        ? (resolvedTheme === 'light' ? 'opacity-30' : 'opacity-50')
        : 'opacity-0' // Start with opacity-0 to avoid flash of content before hydration

    return (
        <div
            ref={canvasRef}
            className={`fixed inset-0 -z-10 ${opacityClass}`}
            aria-hidden="true"
        />
    )
}