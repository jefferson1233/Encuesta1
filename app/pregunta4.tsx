'use client';

import { useState, useEffect } from 'react';

const sustancias = [
  { letra: 'a', nombre: 'Tabaco' },
  { letra: 'b', nombre: 'Alcohol' },
  { letra: 'c', nombre: 'Cannabis' },
  { letra: 'd', nombre: 'Cocaína' },
  { letra: 'e', nombre: 'Anfetaminas' },
  { letra: 'f', nombre: 'Inhalantes' },
  { letra: 'g', nombre: 'Sedantes' },
  { letra: 'h', nombre: 'Alucinógenos' },
  { letra: 'i', nombre: 'Opiáceos' },
  { letra: 'j', nombre: 'Otras' },
];

type Props = {
  frecuenciasPregunta2: Record<string, number>;
  onSubmit: (problemas: Record<string, number>) => void;
};

const opciones = [
  { label: 'Nunca', value: 0 },
  { label: 'Una o dos veces', value: 4 },
  { label: 'Mensualmente', value: 5 },
  { label: 'Semanalmente', value: 6 },
  { label: 'Diariamente o casi diariamente', value: 7 },
];

export default function Pregunta4({ frecuenciasPregunta2, onSubmit }: Props) {
  const [problemas, setProblemas] = useState<Record<string, number>>({});

  const sustanciasConConsumo = sustancias.filter(
    (s) => frecuenciasPregunta2[s.letra] && frecuenciasPregunta2[s.letra] > 0
  );

  const handleChange = (letra: string, valor: number) => {
    setProblemas((prev) => ({ ...prev, [letra]: valor }));
  };

  //const puedeContinuar = sustanciasConConsumo.every((s) => problemas[s.letra] !== undefined);

  useEffect(() => {
   console.log( Object.values(problemas))
   onSubmit(problemas);
  }, [problemas, onSubmit]);


  return (
    <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">PREGUNTA 4</h2>
    <p className="mb-4 text-gray-700">
      ¿Con qué frecuencia ha tenido usted algún problema de salud, social, legal o económico relacionado con el consumo de las sustancias listadas?
    </p>
  
    {/* Tabla (visible en md o más) */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border text-sm mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Sustancia</th>
            {opciones.map((op) => (
              <th key={op.value} className="border p-2 text-center">{op.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sustanciasConConsumo.map((s) => (
            <tr key={s.letra}>
              <td className="border p-2">{s.nombre}</td>
              {opciones.map((op) => (
                <td key={op.value} className="border p-2 text-center">
                  <input
                    type="radio"
                    name={`pregunta4-1-${s.letra}`}
                    value={op.value}
                    checked={problemas[s.letra] === op.value}
                    onChange={() => handleChange(s.letra, op.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Tarjetas (solo visible en móvil) */}
    <div className="space-y-4 md:hidden">
      {sustanciasConConsumo.map((s) => (
        <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
          <p className="font-semibold text-sm mb-2">{s.nombre}</p>
          <div className="flex flex-col gap-2">
            {opciones.map((op) => (
              <label key={op.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`pregunta4-2-${s.letra}`}
                  value={op.value}
                  checked={problemas[s.letra] === op.value}
                  onChange={() => handleChange(s.letra, op.value)}
                  className="w-5 h-5 text-blue-600"
                />
                {op.label}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
}
/**
 * 
 *  {puedeContinuar && (
        <button
          onClick={() => onSubmit(problemas)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Continuar a la siguiente pregunta
        </button>
      )}
 */

      /*
      
         <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 4</h2>
      <p className="mb-4 text-gray-700">
        ¿Con qué frecuencia ha tenido usted algún problema de salud, social, legal o económico relacionado con el consumo de las sustancias listadas?
      </p>

      <table className="w-full border text-sm mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Sustancia</th>
            {opciones.map((op) => (
              <th key={op.value} className="border p-2 text-center">{op.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sustanciasConConsumo.map((s) => (
            <tr key={s.letra}>
              <td className="border p-2">{s.nombre}</td>
              {opciones.map((op) => (
                <td key={op.value} className="border p-2 text-center">
                  <input
                    type="radio"
                    name={`pregunta4-${s.letra}`}

                    value={op.value}
                    checked={problemas[s.letra] === op.value}
                    onChange={() => handleChange(s.letra, op.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
      */