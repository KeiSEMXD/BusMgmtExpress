// src/pages/Routes.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRoutes, deleteRoute } from '../services/routeService';

export default function RoutesList() {
    const [routes, setRoutes] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getRoutes();
        setRoutes(data);
    }

    async function handleDelete(id) {
        if (!window.confirm('¿Eliminar esta ruta?')) return;
        await deleteRoute(id);
        load();
    }

    if (routes === null) return <p className="center">Cargando rutas…</p>;

    return (
        <section className="container">
            <h1 className="title">Rutas</h1>
            <div className="center">
                <Link to="/routes/new" className="button main">+ Nueva Ruta</Link>
            </div>
            {routes.length === 0 ? (
                <p className="center">No hay rutas registradas.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map(r => (
                            <tr key={r.id}>
                                <td>{r.id}</td>
                                <td>{r.origin}</td>
                                <td>{r.destination}</td>
                                <td>
                                    <Link to={`/routes/edit/${r.id}`} className="button">Editar</Link>
                                    <button className="button danger" onClick={() => handleDelete(r.id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
