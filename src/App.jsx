import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { useAuthContext } from "./context/AuthContext"

const App = () => {
  
  const { loading} = useAuthContext();
  if(loading){
     return (
    <>
     <h1> Loading... </h1>
    </>
  )
  }
  return (
    <>
      <Navbar />
     <div className="mt-18">
       <Outlet />
     </div>
      <Footer/>
    </>
  )
}

export default App
