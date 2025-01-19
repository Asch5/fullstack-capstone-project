import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import SearchPage from './components/SearchPage/SearchPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import Profile from './components/Profile/Profile';

function App() {
    return (
        <div className="app-container">
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/app" element={<MainPage />} />
                <Route path="/app/search" element={<SearchPage />} />
                <Route path="/app/login" element={<LoginPage />} />
                <Route path="/app/register" element={<RegisterPage />} />
                <Route path="/app/profile" element={<Profile />} />
                <Route path="/gifts" element={<MainPage />} />
                <Route path="/gifts/:productId" element={<DetailsPage />} />
            </Routes>
        </div>
    );
}

export default App;
