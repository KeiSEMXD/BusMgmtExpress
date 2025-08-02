import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSchedules, deleteSchedule } from '../services/scheduleService';
import { getBuses } from '../services/busService';
import { getRoutes } from '../services/routeService';

export default function Schedules() {
    const [schedules, setSchedules] = useState([]);
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        load();
        getBuses().then(setBuses);
        getRoutes().then(setRoutes);
    }, []);

    async function load() {
        const data = await getSchedules();
        setSchedules(data);
    }

    async function handleDelete(id) {
        if (!window.confirm('¿Eliminar este horario?')) return;
        await deleteSchedule(id);
        load();
    }

    function busName(busId) {
        const bus = buses.find(b => b.id === busId);
        return bus ? `${bus.plate} - ${bus.model}` : busId;
    }

    function routeName(routeId) {
        const route = routes.find(r => r.id === routeId);
        return route ? `${route.origin} → ${route.destination}` : routeId;
    }

    return (
        <section className="container">
            <h1 className="title">Horarios</h1>
            <div className="center">
                <Link to="/schedules/new" className="button main">
                    Nuevo Horario
                </Link>
            </div>
            {schedules.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#bbb' }}>
                    No hay horarios registrados.
                </p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Bus</th>
                            <th>Ruta</th>
                            <th>Salida</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map(s => (
                            <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{busName(s.busId)}</td>
                                <td>{routeName(s.routeId)}</td>
                                <td>{new Date(s.departureTime).toLocaleString()}</td>
                                <td>
                                    <Link className="button" to={`/schedules/edit/${s.id}`}>Editar</Link>
                                    <button className="button danger" onClick={() => handleDelete(s.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

