import { DomRender } from '..'
import { Element } from '../base/element'
import { Render } from '../renders/base/render'
import './canvas.css'

interface CanvasOptions<T extends Render> {
  width?: number,
  height?: number,
  el: string | HTMLElement
  render: T
}

const MAX_SCALE = 3
const MIN_SCALE = 0.1
const SCALE_STEP = 0.1

export class Canvas {
  width?: number
  height?: number
  rootEl: HTMLElement | undefined
  canvasEl: HTMLElement | undefined
  render: Render

  scale: number = 1

  private _zoomEvent: (e: WheelEvent) => void

  constructor(options: CanvasOptions<Render>) {
    this._zoomEvent = this.handleZoom.bind(this)

    const { width, height, el, render } = options;

    if (!render) {
      const domRender = new DomRender()
      this.render = domRender
    } else {
      this.render = render
    }

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
    this.rootEl!.classList.add('canvas-wrapper')

    const canvasEl = document.createElement('div')

    canvasEl.style.width = `${this.width}px`
    canvasEl.style.height = `${this.height}px`
    canvasEl.classList.add('canvas-main')

    this.canvasEl = canvasEl

    this.rootEl!.childNodes.forEach(el => {
      this.rootEl?.removeChild(el)
    })
    this.rootEl?.appendChild(canvasEl)
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

    const { deltaY, ctrlKey } = e;
    if (!ctrlKey) return

    e.preventDefault()

    requestAnimationFrame(() => {
      this.zoom(deltaY > 0 ? 1 : -1)
    })
  }

  zoom(type: number) {

    let scale = Number.parseFloat((this.scale + SCALE_STEP * type).toFixed(2))

    if (scale > MAX_SCALE) scale = MAX_SCALE
    if (scale < MIN_SCALE) scale = MIN_SCALE

    const newWidth = this.width! * scale
    const newHeight = this.height! * scale

    this.canvasEl!.style.width = `${newWidth}px`
    this.canvasEl!.style.height = `${newHeight}px`

    this.scale = scale

  }

  destory() {
    this.removeEvent()
  }

  removeEvent() {
    this.removeZoomEvent()
  }

  add<T extends Element>(element: T) {
    const node = this.render.create(element)
    this.canvasEl?.appendChild(node)
  }
}