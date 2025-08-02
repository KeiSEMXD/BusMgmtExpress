// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Buses from './pages/Buses';
import BusForm from './pages/BusForm';
import RoutesList from './pages/Routes';
import RouteForm from './pages/RouteForm';
import Schedules from './pages/Schedules';
import ScheduleForm from './pages/ScheduleForm';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <header>
                <nav className="navbar">
                    <Link className="nav-link" to="/">Weather</Link>
                    <Link className="nav-link" to="/buses">Autobuses</Link>
                    <Link className="nav-link" to="/routes">Rutas</Link>
                    <Link className="nav-link" to="/schedules">Horarios</Link>
                </nav>
            </header>
            <main className="main-centered">
                <Routes>
                    {/* Reemplaza esto por tu componente de Weather si lo usas */}
                    <Route path="/" element={<div style={{ textAlign: 'center' }}><h2>Weather</h2></div>} />
                    <Route path="/buses" element={<Buses />} />
                    <Route path="/buses/new" element={<BusForm />} />
                    <Route path="/buses/edit/:id" element={<BusForm />} />
                    <Route path="/routes" element={<RoutesList />} />
                    <Route path="/routes/new" element={<RouteForm />} />
                    <Route path="/routes/edit/:id" element={<RouteForm />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/schedules/new" element={<ScheduleForm />} />
                    <Route path="/schedules/edit/:id" element={<ScheduleForm />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
