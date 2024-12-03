import React from 'react';
import ReactDOM from 'react-dom/client';
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
import AddCategory from './pages/AddCategory.jsx';
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
import Location from './pages/Location.jsx';
import AddLocation from './pages/AddLocation.jsx';
import UpdateLocation from './pages/UpdateLocation.jsx';
import Logout from './pages/Logout.jsx';
import AnnouncmentsU from './pages/AnnouncmentsU.jsx';
import LocationU from './pages/LocationU.jsx';
import EventsU from './pages/EventsU.jsx';
import MoviesU from './pages/MoviesU.jsx';
import Ligjeruesi from './pages/Ligjeruesi.jsx';
import AddLigjeruesi from './pages/AddLigjeruesi.jsx';
import UpdateLigjeruesi from './pages/UpdateLigjeruesi.jsx';
import Ligjerata from './pages/Ligjerata.jsx';
import AddLigjerata from './pages/AddLigjerata.jsx';
import UpdateLigjerata from './pages/UpdateLigjerata.jsx';

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
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/updatemovie/:id" element={<UpdateMovie />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/updateEvent/:id" element={<UpdateEvent />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/announcments" element={<Announcments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/addannouncment" element={<AddAnnouncment />} />
          <Route path="/updateannouncment/:id" element={<UpdateAnnouncment />} />
          <Route path="/addhall" element={<AddHall />} />
          <Route path="/updatehall/:id" element={<UpdateHall />} />
          <Route path="/addticket" element={<AddTicket />} />
          <Route path="/updateticket/:id" element={<UpdateTicket />} />
          <Route path="/location" element={<Location />} />
          <Route path="/addlocation" element={<AddLocation />} />
          <Route path="/updateLocation/:id" element={<UpdateLocation />} />
          <Route path="/announcmentsU" element={<AnnouncmentsU />} />
          <Route path="/locationU" element={<LocationU />} />
          <Route path="/eventsU" element={<EventsU />} />
          <Route path="/moviesU" element={<MoviesU />} />
          <Route path="/ligjeruesi" element={<Ligjeruesi />} />
          <Route path="/AddLigjeruesi" element={<AddLigjeruesi />} />
          <Route path="/UpdateLigjeruesi/:id" element={<UpdateLigjeruesi />} />
          <Route path="/ligjerata" element={<Ligjerata />} />
          <Route path="/AddLigjerata" element={<AddLigjerata />} />
          <Route path="/UpdateLigjerata/:id" element={<UpdateLigjerata />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

export default App;
