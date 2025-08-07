
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

        console.log(e.target)
        console.log(name,value)

        setFormData((prev) => ({ ...prev, [name]: value }));
        onSubmit({ ...formData, [name]: value, edad: parseInt(name === 'edad' ? value : formData.edad, 10) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log()
        onSubmit({ ...formData, edad: parseInt(formData.edad, 10) });
    };

    return (

        <form onSubmit={handleSubmit} >



            <h2 className="text-center font-semibold text-base mb-2">Información General</h2>

            <div className="space-y-1">
                <label className="block">Carrera</label>

                <input
                    type="text"
                    name="carrera"
                    list="carreras"
                    value={formData.carrera}
                    onChange={handleChange}
                    required
                    className="w-full border px-2 py-1 rounded"
                />

                <datalist id="carreras">
                    <option value="ADMINISTRACIÓN DE EMPRESAS - MATRIZ"/>
                    <option value="AGROPECUARIA - MATRIZ"/>
                    <option value="BIOLOGÍA - MATRIZ"/>
                    <option value="BIOLOGÍA MARINA - MATRIZ"/>
                    <option value="COMUNICACIÓN - MATRIZ"/>
                    <option value="CONTABILIDAD Y AUDITORÍA - MATRIZ"/>
                    <option value="DERECHO - MATRIZ"/>
                    <option value="EDUCACIÓN BÁSICA - MATRIZ"/>
                    <option value="EDUCACIÓN INICIAL - MATRIZ"/>
                    <option value="EDUCACIÓN INICIAL - PLAYAS"/>
                    <option value="ELECTRÓNICA Y AUTOMATIZACIÓN - MATRIZ"/>
                    <option value="ELECTRÓNICA Y TELECOMUNICACIONES - MATRIZ"/>
                    <option value="ENFERMERÍA - MATRIZ"/>
                    <option value="GESTIÓN SOCIAL Y DESARROLLO - MATRIZ"/>
                    <option value="INGENIERÍA CIVIL - MATRIZ"/>
                    <option value="INGENIERÍA INDUSTRIAL - MATRIZ"/>
                    <option value="LICENCIATURA EN GESTIÓN Y DESARROLLO TURÍSTICO - MATRIZ"/>
                    <option value="PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS - MATRIZ"/>
                    <option value="PETRÓLEOS - MATRIZ"/>
                    <option value="TECNOLOGÍAS DE LA INFORMACIÓN - MATRIZ"/>
                    <option value="TELECOMUNICACIONES - MATRIZ"/>
                    <option value="TURISMO - MATRIZ"/>
                    <option value="TURISMO - PLAYAS"/>
                    <option value="DERECHO - PLAYAS"/>
                    <option value="PEDAGOGÍA DE LOS IDIOMAS NACIONALES Y EXTRANJEROS - PLAYAS"/>
                    <option value="SOFTWARE - MATRIZ"/>
                    <option value="HOSPITALIDAD Y HOTELERÍA - MATRIZ"/>
                    <option value="ENTRENAMIENTO DEPORTIVO - MATRIZ"/>
                    <option value="SEGURIDAD INDUSTRIAL - MATRIZ"/>
                    <option value="PEDAGOGÍA DE LA ACTIVIDAD FÍSICA Y DEPORTE - MATRIZ"/>
                    <option value="MEDICINA VETERINARIA - MATRIZ"/>
                    <option value="GESTIÓN DEL DESARROLLO INFANTIL FAMILIAR COMUNITARIO - MATRIZ"/>
                    <option value="ECONOMÍA - MATRIZ"/>
                    <option value="INGENIERÍA AGROPECUARIA - MATRIZ"/>
                    <option value="INGENIERÍA EN PETRÓLEO - MATRIZ"/>
                    <option value="FINANZAS - MATRIZ"/>
                    <option value="AUDIENCIAS DIGITALES - MATRIZ"/>
                    <option value="ECOLOGÍA Y CONSERVACIÓN AMBIENTAL - MATRIZ"/>
                    <option value="PSICOLOGÍA - MATRIZ"/>
                    <option value="INGENIERÍA EN GESTIÓN Y DESARROLLO TURÍSTICO - MATRIZ"/>
                    <option value="INFORMÁTICA - MATRIZ"/>
                    <option value="ADMINISTRACION DE EMPRESAS - PLAYAS"/>
                    <option value="ADMINISTRACION DE EMPRESAS AGROPECUARIAS Y AGRONEGOCIOS - MATRIZ"/>
                    <option value="ADMINISTRACION PUBLICA - MATRIZ"/>
                    <option value="ARQUEOLOGIA - MATRIZ"/>
                    <option value="BIOLOGIA MARINA - PLAYAS"/>
                    <option value="COMUNICACION SOCIAL - MATRIZ"/>
                    <option value="COMUNICACION SOCIAL - PLAYAS"/>
                    <option value="CONTABILIDAD Y AUDITORIA - PLAYAS"/>
                    <option value="DESARROLLO EMPRESARIAL - COLONCHE"/>
                    <option value="DESARROLLO EMPRESARIAL - MATRIZ"/>
                    <option value="DESARROLLO EMPRESARIAL - PLAYAS"/>
                    <option value="EDUCACION BASICA - COLONCHE"/>
                    <option value="EDUCACION BASICA - MANGLARALTO"/>
                    <option value="EDUCACION BASICA - PLAYAS"/>
                    <option value="EDUCACION FISICA DEPORTE Y RECREACION - MATRIZ"/>
                    <option value="EDUCACION PARVULARIA - MANGLARALTO"/>
                    <option value="EDUCACION PARVULARIA - MATRIZ"/>
                    <option value="HOTELERIA Y TURISMO - MANGLARALTO"/>
                    <option value="HOTELERIA Y TURISMO - MATRIZ"/>
                    <option value="HOTELERIA Y TURISMO - PLAYAS"/>
                    <option value="INFORMATICA - MATRIZ"/>
                    <option value="INFORMATICA - PLAYAS"/>
                    <option value="INFORMATICA EDUCATIVA - MATRIZ"/>
                    <option value="INGENIERIA AGROPECUARIA - COLONCHE"/>
                    <option value="INGENIERIA AGROPECUARIA - MANGLARALTO"/>
                    <option value="INGENIERIA COMERCIAL - MATRIZ"/>
                    <option value="INGENIERIA COMERCIAL - PLAYAS"/>
                    <option value="INGENIERIA EN GESTION Y DESARROLLO TURISTICO - COLONCHE"/>
                    <option value="INGENIERIA EN GESTION Y DESARROLLO TURISTICO - MANGLARALTO"/>
                    <option value="INGENIERIA EN GESTION Y DESARROLLO TURISTICO - MATRIZ"/>
                    <option value="INGENIERIA EN MARKETING - MATRIZ"/>
                    <option value="INGENIERIA INDUSTRIAL - PLAYAS"/>
                    <option value="TECNOLOGIA EN MANTENIMIENTO Y SEGURIDAD INDUSTRIAL - MATRIZ"/>
                    <option value="INGLES - MATRIZ"/>
                    <option value="ORGANIZACION Y DESARROLLO COMUNITARIO - MATRIZ"/>
                    <option value="PESQUERIA - MATRIZ"/>
                    <option value="TECNOLOGIA EN ELECTROMECANICA - MATRIZ"/>
                </datalist>



            </div>

            <div className="space-y-1">
                <label className="block">Edad</label>
                <input type="number" name="edad" onChange={(e) => {
                    const value = e.target.value;
                    console.log(value)

                    if (/^\d*$/.test(value)) {
                        setFormData((prev) => ({...prev, edad: value}));
                    }
                }}
                       value={formData.edad} required className="w-full border px-2 py-1 rounded" min={10} max={100}/>
            </div>

            <div className="space-y-1">
                <label className="block">Semestre</label>

                <select name="curso" value={formData.curso} onChange={handleChange} required
                        className="w-full border px-2 py-1 rounded">
                    <option value="">Seleccione...</option>
                    <option value="1">Primero</option>
                    <option value="2">Segundo</option>
                    <option value="3">Tercero</option>
                    <option value="4">Cuarto</option>
                    <option value="5">Quinto</option>
                    <option value="6">Sexto</option>
                    <option value="7">Séptimo</option>
                    <option value="8">Octavo</option>
                    <option value="9">Noveno</option>
                </select>

            </div>

            <div className="space-y-1">
                <label className="block">Sexo</label>
                <select name="sexo" value={formData.sexo} onChange={handleChange} required
                        className="w-full border px-2 py-1 rounded">
                    <option value="">Seleccione...</option>
                    <option value="Hombre">Hombre</option>
                    <option value="Mujer">Mujer</option>
                    <option value="Intersexual">Intersexual</option>

                </select>
            </div>

            <div className="space-y-1">
                <label className="block">Género</label>


                <select name="genero" value={formData.genero} onChange={handleChange} required
                        className="w-full border px-2 py-1 rounded">
                    <option value="">Seleccione...</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="LGBTIQ">LGBTIQ</option>

                </select>


            </div>

        </form>
    );
}

/*

                <input name="semestre" value={formData.curso} onChange={handleChange} required
                       className="w-full border px-2 py-1 rounded"/>
   <!--className="max-w-md mx-auto mt-4 p-4 border rounded shadow-sm bg-white text-sm space-y-3"-->
            <!--
            <button type="submit" className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition text-sm">
                Continuar
            </button> -->
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


 <input name="carrera" value={formData.carrera} onChange={handleChange} required
                       className="w-full border px-2 py-1 rounded"/>
*/