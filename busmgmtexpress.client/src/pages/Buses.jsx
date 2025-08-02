// src/pages/Buses.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBuses, deleteBus } from '../services/busService';

export default function Buses() {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const data = await getBuses();
        setBuses(data);
    }

    async function handleDelete(id) {
        if (!window.confirm('¿Eliminar este autobús?')) return;
        await deleteBus(id);
        load();
    }

    return (
        <div className="main-centered">
            <section className="container">
                <h1 className="title">Autobuses</h1>
                <div className="center">
                    <Link to="/buses/new" className="button main">
                        Nuevo Autobús
                    </Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buses.length === 0 ? (
                            <tr>
                                <td colSpan={4}>No hay autobuses registrados.</td>
                            </tr>
                        ) : (
                            buses.map(bus => (
                                <tr key={bus.id}>
                                    <td>{bus.id}</td>
                                    <td>{bus.plate}</td>
                                    <td>{bus.model}</td>
                                    <td>
                                        <Link className="button" to={`/buses/edit/${bus.id}`}>Editar</Link>
                                        <button className="button danger" onClick={() => handleDelete(bus.id)}>Borrar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
