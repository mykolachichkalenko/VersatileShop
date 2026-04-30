import { useEffect, useRef } from "react"

interface AuroraBackgroundProps {
  speed?: number
  colorStops?: [string, string, string]
  amplitude?: number
  className?: string
}

export function AuroraBackground({
                                   speed = 1.0,
                                   colorStops = ["#9797df", "#9db2c4", "#b6d8d8"],
                                   amplitude = 1.0,
                                   className = "",
                                 }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      time += 0.005 * speed

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      // Calculate opacity based on sine wave for smooth transitions
      const offset1 = Math.sin(time) * 0.5 + 0.5
      const offset2 = Math.sin(time + Math.PI * 0.66) * 0.5 + 0.5
      const offset3 = Math.sin(time + Math.PI * 1.33) * 0.5 + 0.5

      gradient.addColorStop(
          0,
          `${colorStops[0]}${Math.floor(offset1 * 100)
              .toString(16)
              .padStart(2, "0")}`,
      )
      gradient.addColorStop(
          0.5,
          `${colorStops[1]}${Math.floor(offset2 * 100)
              .toString(16)
              .padStart(2, "0")}`,
      )
      gradient.addColorStop(
          1,
          `${colorStops[2]}${Math.floor(offset3 * 100)
              .toString(16)
              .padStart(2, "0")}`,
      )

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw aurora waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()

        const waveHeight = (canvas.height / 3) * amplitude
        const waveOffset = (i * Math.PI * 2) / 3

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
              canvas.height / 2 +
              Math.sin((x * 0.01 + time + waveOffset) * 2) * waveHeight * 0.3 +
              Math.sin((x * 0.02 + time * 1.5 + waveOffset) * 1.5) * waveHeight * 0.2

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        const alpha = (0.15 + i * 0.05).toString()
        ctx.strokeStyle = `${colorStops[i]}${Math.floor(Number.parseFloat(alpha) * 255)
            .toString(16)
            .padStart(2, "0")}`
        ctx.lineWidth = 2 + i
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, colorStops, amplitude])

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }} />
}
