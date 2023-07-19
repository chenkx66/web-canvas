import { useEffect, useRef, useState } from "react"
import { Canvas } from '@/core'
import styles from './center.module.css'

export default function Center() {

  const target = useRef<HTMLDivElement | null>(null)
  const [canvas, setCanvas] = useState<Canvas>()

  useEffect(() => {
    const current = target.current as HTMLElement
    const re = new Canvas({
      width: 800,
      height: 800 * 9 / 16,
      el: current
    })
    setCanvas(re)

    return () => {
      canvas?.destory()
    }
  }, [])

  return (
    <div className={styles.editorCenter}>
      <div className={styles.canvasWrapper}>
        <div ref={target}></div>
      </div>
    </div>
  )
}