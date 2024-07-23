import './App.css'
import SongForm from './components/SongForm'
import SongList from './components/SongList'
import Statistics from './components/Statistics'

function App() {

  return (
    <>
    <Statistics />
    <div className='conatiner'>
    <SongList />
    {/* <SongForm /> */}
    </div>
    </>
  )
}

export default App
