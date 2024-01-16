import './App.css'
import Navbars from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <Navbars />
      <ToastContainer />
      <Container className='my-3'>
        <Outlet />
      </Container>
    </>
  )
}

export default App
