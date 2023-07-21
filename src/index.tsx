import { useEffect, useState } from "react";
import Center from "./components/center";
import Header from "./components/header";
import Left from './components/left'
import Right from './components/right'
import { Canvas } from "./core";

function App() {
  const [canvas, setCanvas] = useState<Canvas>()

  useEffect(() => {
    return () => {
      canvas?.destory()
    }
  })

  const handleSaveCanvas = (res: Canvas) => {
    setCanvas(res)
  }

  return (
    <div className='main'>
      <Header />
      <Left canvas={canvas}/>
      <Right />
      <Center onChange={handleSaveCanvas} />
    </div>
  )
}

export default App
