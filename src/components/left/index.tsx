import { Text } from '@/core/renders/dom/elements/text'
import classes from './left.module.css'
import { Canvas } from '@/core'
import { Button } from 'antd'

interface props {
  canvas: Canvas | undefined
}

function Left(props: props) {

  const handleAdd = () => {
    const el = new Text()
    props.canvas!.add(el)
  }

  return (
    <div className={classes.left}>
      <Button onClick={handleAdd}>添加文字</Button>
    </div>
  )
}

export default Left