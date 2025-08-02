// src/pages/BusForm.jsx
import { useNavigate } from 'react-router-dom';

export default function BusForm({ plate, model, setPlate, setModel, onSave, isEdit }) {
    const navigate = useNavigate();

    // ...
    return (
        <section className="centered-container">
            <div className="form-card">
                <h1 className="title">{isEdit ? 'Editar Autobús' : 'Nuevo Autobús'}</h1>
                <form className="form" onSubmit={onSave}>
                    <div className="form-group">
                        <label>Placa:</label>
                        <input
                            value={plate}
                            onChange={e => setPlate(e.target.value)}
                            required
                            className="input"
                            placeholder="Ej. ABC-123"
                        />
                    </div>
                    <div className="form-group">
                        <label>Modelo:</label>
                        <input
                            value={model}
                            onChange={e => setModel(e.target.value)}
                            required
                            className="input"
                            placeholder="Ej. Volvo 9700"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button main">{isEdit ? 'Guardar' : 'Crear autobús'}</button>
                        <button type="button" className="button" onClick={() => navigate(-1)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );

}

