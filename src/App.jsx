import { Container, Navbar } from 'react-bootstrap'
import './App.css'
import Logo from './assets/Logo.png'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Hopitals from './pages/Hopitals'


function App() {
 

  return (
      <div>
        <Navbar bg="light" data-bs-theme="light" style={{borderBottom:'1px solid gray'}}>
          <Container>
            <Navbar.Brand style={{fontWeight:"bold", display:'flex', alignItems:'center'}} href="/">
              <img
                  alt=""
                  src={Logo}
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                />
                 <h4 style={{marginLeft:'10px', fontWeight:"600"}}  className="d-inline-block align-top"> MED START</h4>
              </Navbar.Brand>
          </Container>
        </Navbar>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/hospital" element={<Hopitals/>}/>
        </Routes>
      </div>
  )
}

export default App
