// src/pages/BusForm.jsx
import { useNavigate } from 'react-router-dom';

export default function BusForm({ plate, model, setPlate, setModel, onSave, isEdit }) {
    const navigate = useNavigate();

    // ...
    return (
        <section className="centered-container">
            <div className="form-card">
                <h1 className="title">{isEdit ? 'Editar Autobús' : 'Nuevo Autobús'}</h1>
                <form onSubmit={onSave}>
                    <label>Placa:</label>
                    <input value={plate} onChange={e => setPlate(e.target.value)} required />
                    <label>Modelo:</label>
                    <input value={model} onChange={e => setModel(e.target.value)} required />
                    <div className="form-actions">
                        <button type="submit" className="button main">{isEdit ? 'Guardar' : 'Crear autobús'}</button>
                        <button type="button" className="button" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );

}

