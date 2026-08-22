import { useEffect, useRef } from 'react'
import { ASCIIGround, PerlinNoisePattern, type CharacterData, type PatternContext } from 'asciiground'

const BRAND = '#5ac1ea'
const BRAND_ALT = '#7779dc'
const CHARACTERS = [' ', ' ', ' ', ' ', ' ', '.', ',', ':', ';', '-', '~', '=', '+', '*', 'x', 'o', '%', '#', '@']

// PerlinNoisePattern ignores the mouse, so add a hover glow: characters near
// the cursor brighten and tint toward the brand color.
class InteractivePerlinPattern extends PerlinNoisePattern {
  private target?: { x: number; y: number }
  private pointer?: { x: number; y: number }
  private activity = 0

  setPointer(pointer?: { x: number; y: number }) {
    // Only actual movement wakes the glow; a resting cursor lets it fade out.
    if (pointer && (!this.target || pointer.x !== this.target.x || pointer.y !== this.target.y)) {
      this.activity = 1
    }
    this.target = pointer
  }

  generate(context: PatternContext): CharacterData[] {
    const chars = super.generate(context)
    const { region } = context

    // The library normalizes fractal noise by total amplitude, so its output
    // (stored in `opacity`) never leaves roughly [0.3, 0.7] — the blanks and
    // densest characters at the ends of the ramp are unreachable. Stretch it
    // back to [0, 1] and re-pick characters so real gaps appear.
    for (const c of chars) {
      const o = Math.max(0, Math.min(1, ((c.opacity ?? 0.5) - 0.32) / 0.36))
      c.char = CHARACTERS[Math.min(CHARACTERS.length - 1, Math.floor(o * CHARACTERS.length))]
      c.opacity = o
    }

    // The glow chases the cursor instead of sitting on it: each frame it
    // closes a fraction of the remaining distance to the real pointer.
    if (this.target) {
      if (!this.pointer) {
        this.pointer = { ...this.target }
      } else {
        this.pointer.x += (this.target.x - this.pointer.x) * 0.08
        this.pointer.y += (this.target.y - this.pointer.y) * 0.08
      }
    } else {
      this.pointer = undefined
    }

    // Fade the whole effect while the cursor is idle.
    this.activity *= 0.94
    if (this.activity < 0.02) return chars

    if (!this.pointer) return chars

    // Part the field around the cursor: characters get pushed radially
    // outward with a smooth falloff, and the core thins to an opening.
    // As `activity` decays the displacement eases back to zero.
    const { x: px, y: py } = this.pointer
    const radius = 22 * region.charSpacingX
    const maxPush = 3 * region.charSpacingX
    for (const c of chars) {
      const dx = c.x - px
      const dy = c.y - py
      const distance = Math.hypot(dx, dy)
      if (distance < radius && distance > 0.001) {
        // gentle falloff over a wide radius, so the field sways broadly
        // instead of parting in a tight ring around the cursor
        const strength = (1 - distance / radius) ** 1.5 * this.activity
        const push = strength * maxPush
        c.x += (dx / distance) * push
        c.y += (dy / distance) * push
        // thin the center only slightly — a soft dip, not a hole
        c.opacity = (c.opacity ?? 1) * (1 - strength * 0.45)
      }
    }

    return chars
  }
}

export default function HeroAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pattern = new InteractivePerlinPattern({
      characters: CHARACTERS,
      frequency: 0.025,
      octaves: 3,
      persistence: 0.5,
      lacunarity: 2,
      seed: 7,
    })

    const ground = new ASCIIGround().init(canvas, pattern, {
      fontSize: 14,
      fontFamily: 'monospace',
      color: '#9ba3b7',
      colorMap: { '*': BRAND, '%': BRAND, '#': BRAND_ALT, '@': BRAND_ALT },
      backgroundColor: '#0b0d16',
      animated: !reduceMotion,
      // the perlin pattern scales animationTime by 1e-3, so this needs to be large:
      // 130 ≈ 0.13 noise-units of drift per second
      animationSpeed: 130,
      rendererType: '2D',
      enableMouseInteraction: true,
      resizeTo: canvas.parentElement ?? window,
    })

    ground.startAnimation()

    // Track on the hero instead of only the canvas, which sits behind its content.
    const hero = canvas.closest('section')
    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pattern.setPointer({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
    const clearPointer = () => pattern.setPointer()
    hero?.addEventListener('pointermove', updatePointer)
    hero?.addEventListener('pointerleave', clearPointer)

    // honor reduced motion: keep the first frame, stop the loop
    if (reduceMotion) {
      requestAnimationFrame(() => ground.stopAnimation())
    }

    return () => {
      hero?.removeEventListener('pointermove', updatePointer)
      hero?.removeEventListener('pointerleave', clearPointer)
      ground.destroy()
    }
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <canvas
        ref={canvasRef}
        // soft-edged rectangle: horizontal fade × vertical fade, with a radial layer
        // keeping it quiet directly behind the headline
        className="h-full w-full opacity-[0.45] [mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_25%,black_75%,transparent_100%),radial-gradient(ellipse_at_center,rgb(0_0_0/0.25)_0%,black_55%)] [mask-composite:intersect]"
      />
    </div>
  )
}
