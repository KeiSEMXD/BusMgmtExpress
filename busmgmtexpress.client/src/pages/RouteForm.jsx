import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRoute, getRoute, updateRoute } from '../services/routeService';

export default function RouteForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    useEffect(() => {
        if (id) {
            getRoute(id).then(r => {
                setOrigin(r.origin);
                setDestination(r.destination);
            });
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        const route = { origin, destination };
        if (id) {
            await updateRoute(id, route);
        } else {
            await createRoute(route);
        }
        navigate('/routes');
    }

    return (
        <section className="container">
            <h1 className="title">{id ? 'Editar Ruta' : 'Nueva Ruta'}</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Origen:</label>
                    <input
                        type="text"
                        value={origin}
                        onChange={e => setOrigin(e.target.value)}
                        required
                        className="input"
                        placeholder="Escribe el origen"
                    />
                </div>
                <div className="form-group">
                    <label>Destino:</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        required
                        className="input"
                        placeholder="Escribe el destino"
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="button main">
                        {id ? 'Guardar cambios' : 'Crear ruta'}
                    </button>
                    <button type="button" className="button" onClick={() => navigate('/routes')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}
