import { Element } from '../base/element'
import './canvas.css'

interface CanvasOptions {
  width?: number,
  height?: number,
  el: string | HTMLElement
}

const MAX_SCALE = 10
const MIN_SCALE = 0.1

export class Canvas {
  width?: number
  height?: number
  rootEl: HTMLElement | undefined

  scale: number = 1

  private _zoomEvent: (e: WheelEvent) => void

  constructor(options: CanvasOptions) {
    this._zoomEvent = this.handleZoom.bind(this)

    const { width, height, el } = options;

    if (width) {
      this.width = width
    }
    if (height) {
      this.height = height
    }

    if (typeof el === 'string') {
      const target = document.querySelector(el) as HTMLElement
      if (!target) {
        console.error(`找不到对应Dom元素：${el}`)
        return
      }
      this.rootEl = target
    } else {
      this.rootEl = el
    }

    this.init()
    this.addEvent()

  }

  init() {
    const parentNode = this.rootEl?.parentNode as HTMLElement
    parentNode!.style.position = 'relative'

    this.rootEl!.style.width = `${this.width}px`
    this.rootEl!.style.height = `${this.height}px`
    this.rootEl!.classList.add('canvas-main')
  }

  addEvent() {
    this.addZoomEvent()
  }

  addZoomEvent() {
    this.rootEl!.addEventListener('wheel', this._zoomEvent)
  }

  removeZoomEvent() {
    this.rootEl!.removeEventListener('wheel', this._zoomEvent)
  }

  handleZoom(e: WheelEvent) {
    e.preventDefault()

    const { deltaY, ctrlKey } = e;

    if (!ctrlKey) return

    requestAnimationFrame(() => {
      this.zoom(deltaY > 0 ? 1 : -1)
    })
  }

  zoom(type: number) {

    let scale = Number.parseFloat((this.scale + 0.01 * type).toFixed(2))

    if (scale > MAX_SCALE) scale = MAX_SCALE
    if (scale < MIN_SCALE) scale = MIN_SCALE

    const newWidth = this.width! * scale
    const newHeight = this.height! * scale

    this.rootEl!.style.width = `${newWidth}px`
    this.rootEl!.style.height = `${newHeight}px`

    this.scale = scale

  }

  destory() {
    this.removeEvent()
  }

  removeEvent() {
    this.removeZoomEvent()
  }

  add<T extends Element>(element: T){
    const node = element.render();
    this.rootEl?.appendChild(node)
  }
}