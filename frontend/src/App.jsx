import NavBar from "./navbar/navBar.jsx"
import UplodeFile from './components/uplodeFile.jsx';
import Home from "./home/Home.jsx"
import About from "./About/About.jsx"
import Footer from "./Footer/Footer.jsx"
import HowToUse from "./HowTOUse/HowToUse.jsx"
import "./App.css"

function App() {

  return (
    <>
    <NavBar/>
     <Home/>
     <About/>
    <UplodeFile/>
    <HowToUse/>
    <Footer/>
    </>
  )
}

export default App
