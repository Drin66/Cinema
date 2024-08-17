import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import User from './pages/User.jsx';
import Events from './pages/Events.jsx';
import Movies from './pages/Movies.jsx';
import Product from './pages/Product.jsx';
import TicketsList from './pages/TicketsList.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/events" element={<Events />} />
          <Route path="/product" element={<Product />} />
          <Route path="/ticketsList" element={<TicketsList />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;