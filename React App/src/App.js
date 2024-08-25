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
import Signup from './pages/Signup.jsx';
import Update from './pages/Update.jsx';
import Category from './pages/Category.jsx';
import UpdateCategory from './pages/UpdateCategory.jsx';
import AddMovie from './pages/AddMovie.jsx';
import UpdateMovie from './pages/UpdateMovie.jsx';
import AddEvent from './pages/AddEvent.jsx';
import UpdateEvent from './pages/UpdateEvent.jsx';
import Halls from './pages/Halls.jsx';

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/category" element={<Category />} />
          <Route path="/updateCategory/:id" element={<UpdateCategory />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/updatemovie/:id" element={<UpdateMovie />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/updateevent/:id" element={<UpdateEvent />} />
          <Route path="/Halls" element={<Halls />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;