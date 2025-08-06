'use client';

import { useState, useEffect } from 'react';

const preguntas = [
    {
        clave: '1a',
        texto: 'En general, ¿cómo describiría su relación con su pareja?',
        opciones: [
            { texto: 'Mucha tensión', valor: 3 },
            { texto: 'Alguna tensión', valor: 2 },
            { texto: 'Ninguna tensión', valor: 1 },
        ],
    },
    {
        clave: '2b',
        texto: 'Usted o su pareja resuelven sus discusiones con…',
        opciones: [
            { texto: 'Mucha dificultad', valor: 3 },
            { texto: 'Alguna dificultad', valor: 2 },
            { texto: 'Sin dificultad', valor: 1 },
        ],
    },
];

type Props = {
    onSubmit: (data: {
        respuestas: Record<string, number>;
        total: number;
        deteccionTemprana: boolean;
    }) => void;
};

export default function WastCortoCL({ onSubmit }: Props) {
    const [respuestas, setRespuestas] = useState<Record<string, number>>({});

    const handleChange = (clave: string, valor: number) => {
        const nuevasRespuestas = { ...respuestas, [clave]: valor };
        setRespuestas(nuevasRespuestas);
        const total = Object.values(respuestas).reduce((acc, val) => acc + val, 0);
        const deteccionTemprana = total >= 3;

        console.log(clave,valor)

        console.log(nuevasRespuestas)
        console.log(respuestas)
        onSubmit({ respuestas: nuevasRespuestas, total, deteccionTemprana });

    };
  /*
    useEffect(() => {
        const todasRespondidas = preguntas.every((p) => respuestas[p.clave] !== undefined);
        if (todasRespondidas) {
            const total = Object.values(respuestas).reduce((acc, val) => acc + val, 0);
            const deteccionTemprana = total >= 3;
            onSubmit({ respuestas, total, deteccionTemprana });
        }
    }, [respuestas, onSubmit]);
*/


    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">WAST Corto-CL (Detección Temprana)</h1>
            <p className="mb-6 text-gray-700">Responda con sinceridad seleccionando la opción que más se ajuste a su situación.</p>
            <div className="space-y-6">
                {preguntas.map((p) => (
                    <div key={p.clave} className="border-b pb-4">
                        <p className="font-medium mb-2">
                            <strong>{p.clave}.</strong> {p.texto}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            {p.opciones.map((op, idx) => (
                                <label key={idx} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name={p.clave}
                                        value={op.valor}
                                        onChange={() => handleChange(p.clave, op.valor)}
                                        className="w-5 h-5"
                                    />
                                    {op.texto} ({op.valor})
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
