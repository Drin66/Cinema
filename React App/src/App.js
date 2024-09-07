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
import Announcments from './pages/Announcments.jsx';
import Login from './pages/Login.jsx';
import AddAnnouncment from './pages/AddAnnouncment.jsx';
import UpdateAnnouncment from './pages/UpdateAnnouncment.jsx';
import AddHall from './pages/AddHall.jsx';
import UpdateHall from './pages/UpdateHall.jsx';
import AddTicket from './pages/AddTicket.jsx';
import UpdateTicket from './pages/UpdateTicket.jsx';



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
          <Route path="/announcments" element={<Announcments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addannouncment" element={<AddAnnouncment />} />
          <Route path="/updateannouncment/:id" element={<UpdateAnnouncment />} />
          <Route path="/addhall" element={<AddHall />} />
          <Route path="/updatehall/:id" element={<UpdateHall />} />
          <Route path="/addticket" element={<AddTicket />} />
          <Route path="/updateticket/:id" element={<UpdateTicket />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;