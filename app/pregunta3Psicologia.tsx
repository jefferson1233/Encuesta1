'use client';

import { useState } from 'react';

const preguntas = [
    { clave: '3c', texto: 'Al terminar las discusiones, ¿usted se siente decaída o mal con usted misma?' },
    { clave: '4d', texto: '¿Las discusiones terminan en golpes, patadas o empujones?' },
    { clave: '5e', texto: '¿Siente miedo de lo que su pareja haga o diga?' },
    { clave: '6f', texto: '¿Su pareja ha abusado de usted físicamente?' },
    { clave: '7g', texto: '¿Su pareja ha abusado de usted emocionalmente?' },
    { clave: '8h', texto: '¿Su pareja ha abusado de usted sexualmente?' },
];

type Props = {
    onSubmit: (data: {
        respuestas: Record<string, number>;
        total: number;
    }) => void;
};

export default function Pregunta3Psicologia({ onSubmit }: Props) {
    const [respuestas, setRespuestas] = useState<Record<string, number>>({});

    const handleChange = (clave: string, valor: number) => {
        const nuevasRespuestas = { ...respuestas, [clave]: valor };
        setRespuestas(nuevasRespuestas);

        const total = Object.values(nuevasRespuestas).reduce((acc, val) => acc + val, 0);

        console.log(total);
        console.log(nuevasRespuestas);

        onSubmit({ respuestas: nuevasRespuestas, total });

    };


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Cuestionario WAST Largo-CL (detección temprana)</h1>
            <p className="mb-6 text-gray-700">Por favor, marque la opción que mejor describa su experiencia.</p>
            <div className="space-y-6">
                {preguntas.map((p) => (
                    <div key={p.clave} className="border-b pb-4">
                        <p className="font-medium mb-2">
                            <strong>{p.clave}.</strong> {p.texto}
                        </p>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={p.clave}
                                    value={3}
                                    onChange={() => handleChange(p.clave, 3)}
                                    className="w-5 h-5"
                                />
                                Muchas veces (3)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={p.clave}
                                    value={2}
                                    onChange={() => handleChange(p.clave, 2)}
                                    className="w-5 h-5"
                                />
                                A veces (2)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name={p.clave}
                                    value={1}
                                    onChange={() => handleChange(p.clave, 1)}
                                    className="w-5 h-5"
                                />
                                Nunca (1)
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
