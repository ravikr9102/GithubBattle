import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import Battle from './components/Battle';
import Result from './components/Result';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact="true" element={<App />} />
        <Route path="/Battle" element={<Battle />} />
        <Route path="/battle/result/:player" element={<Result />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);