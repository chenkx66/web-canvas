import Center from "./components/center";
import Header from "./components/header";
import Left from './components/left'
import Right from './components/right'

function App() {

  return (
    <div className='main'>
      <Header />
      <Left/>
      <Right/>
      <Center/>
    </div>
  )
}

export default App
