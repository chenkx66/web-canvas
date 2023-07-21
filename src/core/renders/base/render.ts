import { Element } from "@/core/base/element";

export interface Render {
  create: <T extends Element>(element: T) => HTMLElement
}