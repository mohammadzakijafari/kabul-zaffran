import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Recipe from "./pages/Recipe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import SignUp from "./components/SignUp";

// here accessing Backend Url from env file and exporting to other files as required
export const backendUrl = import.meta.env.VITE_BACKEND_URL


function App() {

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element = { <Home /> } />
          <Route path="/products" element = { <Products /> } />
          <Route path="/recipe" element = { <Recipe /> } />
          <Route path="/about" element = { <About /> } />
          <Route path="/contact" element = { <Contact /> } />
          <Route path="/login" element = { <Login /> } />
          <Route path="/sign-up" element = { <SignUp /> } />

          <Route element = { <ProtectedRoutes /> } >
            <Route path="/" element = { <Home /> } />
            <Route path="/products" element = { <Products /> } />
            <Route path="/recipe" element = { <Recipe /> } />
            <Route path="/about" element = { <About /> } />
            <Route path="/contact" element = { <Contact /> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
