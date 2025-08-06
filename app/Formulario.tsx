
'use client';

import { useState } from 'react';

interface Props {
    onSubmit: (datos: {
        carrera: string;
        edad: number;
        curso: string;
        sexo: string;
        genero: string;
    }) => void;
}

export default function FormularioDatos({ onSubmit }: Props) {
    const [formData, setFormData] = useState({
        carrera: '',
        edad: '',
        curso: '',
        sexo: '',
        genero: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, edad: parseInt(formData.edad, 10) });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 border rounded shadow-sm bg-white text-sm space-y-3">
            <h2 className="text-center font-semibold text-base mb-2">Información General</h2>

            <div className="space-y-1">
                <label className="block">Carrera</label>
                <input name="carrera" value={formData.carrera} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
            </div>

            <div className="space-y-1">
                <label className="block">Edad</label>
                <input type="number" name="edad" value={formData.edad} onChange={handleChange} required className="w-full border px-2 py-1 rounded" min={10} max={100} />
            </div>

            <div className="space-y-1">
                <label className="block">Curso</label>
                <input name="curso" value={formData.curso} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
            </div>

            <div className="space-y-1">
                <label className="block">Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange} required className="w-full border px-2 py-1 rounded">
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="block">Género</label>
                <input name="genero" value={formData.genero} onChange={handleChange} required className="w-full border px-2 py-1 rounded" />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition text-sm">
                Continuar
            </button>
        </form>
    );
}

/*
'use client';

import { useState } from 'react';

interface Props {
    onSubmit: (datos: {
        carrera: string;
        edad: number;
        curso: string;
        sexo: string;
        genero: string;
    }) => void;
}

export default function FormularioDatos({ onSubmit }: Props) {
    const [formData, setFormData] = useState({
        carrera: '',
        edad: '',
        curso: '',
        sexo: '',
        genero: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            edad: parseInt(formData.edad, 10),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-bold mb-4 text-center">Información General</h2>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Carrera</label>
                <input
                    type="text"
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Edad</label>
                <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                    min={10}
                    max={100}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Curso</label>
                <input
                    type="text"
                    name="curso"
                    value={formData.curso}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Sexo</label>
                <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                >
                    <option value="">Seleccione...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Género</label>
                <input
                    type="text"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
            >
                Continuar
            </button>
        </form>
    );
}
*/