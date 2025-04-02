'use client';

import { useState,useEffect } from 'react';

type Props = {
  onSubmit: (valor: number) => void;
};

const opciones = [
  { label: 'No, nunca', value: 0 },
  { label: 'Sí, en los últimos 3 meses', value: 6 },
  { label: 'Sí, pero no en los últimos 3 meses', value: 3 },
];

export default function Pregunta8({ onSubmit }: Props) {
  const [respuesta, setRespuesta] = useState<number | null>(null);

  const handleChange = (valor: number) => {
    setRespuesta(valor);
  };


  useEffect(() => {
    if (respuesta !== null) {
      onSubmit(respuesta); // ✅ solo se ejecuta si hay respuesta
    }
  }, [respuesta, onSubmit]);
  //max-w-3xl mx-auto p-6
  
  return (
    <div className="max-w-5xl mx-auto p-6 ">
  <h2 className="text-2xl font-bold mb-4">PREGUNTA 8</h2>
  <p className="mb-4 text-gray-700">
    ¿<em>Alguna vez</em> ha consumido alguna droga por vía inyectada (sin receta médica)?
  </p>

  <div className="flex flex-col gap-4">
    {opciones.map((op) => (
      <label key={op.value} className="flex items-center gap-3 text-sm md:text-base">
        <input
          type="radio"
          name="pregunta8"
          value={op.value}
          checked={respuesta === op.value}
          onChange={() => handleChange(op.value)}
          className="w-5 h-5 text-blue-600"
        />
        {op.label}
      </label>
    ))}
  </div>

  {/* Opción 1: Submit manual */}


  {/* Opción 2: Submit automático (actívalo si lo prefieres) */}
  {/* 
  useEffect(() => {
    if (respuesta !== null) {
      onSubmit(respuesta);
    }
  }, [respuesta, onSubmit]);
  */}
</div>

  );
}

/*
  {respuesta !== null && (
    <button
      onClick={() => onSubmit(respuesta)}
      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
    >
      Finalizar Encuesta
    </button>
  )}
   <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 8</h2>
      <p className="mb-4 text-gray-700">
        ¿<em>Alguna vez</em> ha consumido alguna droga por vía inyectada (sin receta médica)?
      </p>

      <div className="flex flex-col gap-3">
        {opciones.map((op) => (
          <label key={op.value} className="flex items-center gap-3">
            <input
              type="radio"
              name="pregunta8"
              value={op.value}
              checked={respuesta === op.value}
              onChange={() => handleChange(op.value)}
              className="w-5 h-5 text-blue-600"
            />
            {op.label}
          </label>
        ))}
      </div>

      {respuesta !== null && (
        <button
          onClick={() => onSubmit(respuesta)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Finalizar Encuesta
        </button>
      )}
    </div>
*/