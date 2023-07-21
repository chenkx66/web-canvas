import { Element } from "@/core/base/element";

interface TextElement {
  width?: number
  height?: number
  x?: number
  y?: number
  text?: string
}

export class Text extends Element{

  text: string = '这是一段文字'

  constructor(options?:TextElement){
    super()
  }
}