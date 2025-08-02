import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSchedule, createSchedule, updateSchedule } from '../services/scheduleService';
import { getBuses } from '../services/busService';
import { getRoutes } from '../services/routeService';

export default function ScheduleForm() {
    const [busId, setBusId] = useState('');
    const [routeId, setRouteId] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getBuses().then(setBuses);
        getRoutes().then(setRoutes);

        if (id) {
            getSchedule(id).then(s => {
                setBusId(s.busId);
                setRouteId(s.routeId);
                setDepartureTime(s.departureTime.slice(0, 16));
            });
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        const schedule = {
            busId: parseInt(busId),
            routeId: parseInt(routeId),
            departureTime: departureTime
        };
        if (id) {
            await updateSchedule(id, schedule);
        } else {
            await createSchedule(schedule);
        }
        navigate('/schedules');
    }

    return (
        <section className="centered-container">
            <div className="form-card">
                <h1 className="title">{id ? 'Editar Horario' : 'Nuevo Horario'}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Bus:</label>
                        <select
                            value={busId}
                            onChange={e => setBusId(e.target.value)}
                            required
                            className="input"
                        >
                            <option value="">Seleccione un bus</option>
                            {buses.map(b => (
                                <option key={b.id} value={b.id}>{b.plate} - {b.model}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ruta:</label>
                        <select
                            value={routeId}
                            onChange={e => setRouteId(e.target.value)}
                            required
                            className="input"
                        >
                            <option value="">Seleccione una ruta</option>
                            {routes.map(r => (
                                <option key={r.id} value={r.id}>{r.origin} → {r.destination}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Fecha y hora de salida:</label>
                        <input
                            type="datetime-local"
                            value={departureTime}
                            onChange={e => setDepartureTime(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button main">Guardar</button>
                        <button type="button" className="button" onClick={() => navigate('/schedules')}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

