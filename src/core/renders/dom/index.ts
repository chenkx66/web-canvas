import { Element } from "@/core/base/element";
import { Render } from "../base/render";

export class DomRender implements Render {

  create<T extends Element>(element: T): HTMLElement {
    const node = document.createElement('div')
    node.style.width = element.width + 'px'
    node.style.height = element.height + 'px'
    node.style.top = element.y + 'px'
    node.style.left = element.x + 'px'

    node.appendChild(document.createTextNode(element.text))

    return node
  }
}