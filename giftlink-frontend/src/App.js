import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/gifts" element={<MainPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/app" element={<MainPage />} />
            </Routes>
        </>
    );
}

export default App;
