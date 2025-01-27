import { BrowserRouter, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar/Navbar";

// here accessing Backend Url from env file and exporting to other files as required
export const BackendUrl = import.meta.env.VITE_BACKEND_URL


function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
