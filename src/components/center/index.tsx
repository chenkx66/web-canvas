import { useEffect, useRef } from "react"
import { Canvas, DomRender } from '@/core'
import styles from './center.module.css'

interface props {
  onChange: Function
}

export default function Center(props: props) {

  const target = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const current = target.current as HTMLElement
    const re = new Canvas({
      width: 800,
      height: 800 * 9 / 16,
      el: current,
      render: new DomRender()
    })
    props.onChange(re)
  }, [])

  return (
    <div className={styles.editorCenter}>
    <div ref={target}></div>
    </div>
  )
}