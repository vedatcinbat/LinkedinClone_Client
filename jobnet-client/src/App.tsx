import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./pages/Auth/LoginPage"
import Layout from "./pages/layouts/Layout.tsx";
import Home from "./pages/Home/HomePage.tsx";
import SignupPage from "./pages/Auth/SignupPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import UserHomePage from "@/pages/Home/UserHomePage.tsx";
import MyProfilePage from "@/pages/Dashboard/MyProfilePage.tsx";
import SearchCompanyPage from "@/pages/Company/SearchCompanyPage.tsx";
import CompanyPage from "@/pages/Company/CompanyPage.tsx";
import UserPage from "@/pages/User/UserPage.tsx";
import ConnectionsMainPage from "@/pages/Connections/ConnectionsMainPage.tsx";

const App: React.FC = () => {
    const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Router>
        {!isUserLoggedIn ? (
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/my-profile" element={<MyProfilePage />} />
                    <Route path="/companies" element={<SearchCompanyPage />} />
                    <Route path="/user/:userId" element={<UserPage />} />
                    <Route path="/companies/:companyId" element={<CompanyPage />}/>
                    <Route path="/connections" element={<ConnectionsMainPage />} />
                </Routes>
            </Layout>
        ) : (
            <Layout>
                <Routes>
                    <Route path="/" element={<UserHomePage />} />
                    <Route path="/my-profile" element={<MyProfilePage />} />
                    <Route path="/companies" element={<SearchCompanyPage />} />
                    <Route path="/companies/:companyId" element={<CompanyPage />}/>
                    <Route path="/user/:userId" element={<UserPage />} />
                    <Route path="/connections" element={<ConnectionsMainPage />} />
                </Routes>
            </Layout>
        )}
    </Router>
  )
}

export default App
