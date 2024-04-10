import React from "react"
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LoginPage from "./pages/Auth/LoginPage"
import Layout from "./pages/layouts/Layout.tsx";
import Home from "./pages/Home/HomePage.tsx";


const App: React.FC = () => {
  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Layout>
    </Router>
  )
}

export default App
