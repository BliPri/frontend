import { Header } from '../entities/header'
import { Task } from '../widgets/task'
import { Typing } from '../widgets/Typing'

function App() {
  return (
    <>
      <div className='app'>
        <Header />
        <main className='page'>
          <Task />
          <Typing />
        </main>
        <footer></footer>
      </div>
    </>
  )
}

export default App
