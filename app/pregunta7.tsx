'use client';

import { useState,useEffect } from 'react';

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
  respuestasPregunta1: Record<string, string>;
  onSubmit: (intentos: Record<string, number>) => void;
  otrasTexto:string;
};

const opciones = [
  { label: 'No, nunca', value: 0 },
  { label: 'Sí, en los últimos 3 meses', value: 6 },
  { label: 'Sí, pero no en los últimos 3 meses', value: 3 },
];

export default function Pregunta7({ respuestasPregunta1, onSubmit ,otrasTexto}: Props) {
  const [intentos, setIntentos] = useState<Record<string, number>>({});

  let  sustanciasUsadas = sustancias.filter(
    (s) => respuestasPregunta1[s.letra] === 'si'
  );

  const handleChange = (letra: string, valor: number) => {
    setIntentos((prev) => ({ ...prev, [letra]: valor }));
  };


  if (otrasTexto && sustanciasUsadas.some((s) => s.letra === "j")) {
    sustanciasUsadas = sustanciasUsadas.map((s) =>
      s.letra === "j" ? { ...s, nombre: `Otras: ${otrasTexto}` } : s
    );
  }
  
  useEffect(() => {
    console.log( Object.values(intentos))
    onSubmit(intentos);
   }, [intentos, onSubmit]);
 

 // const puedeEnviar = sustanciasUsadas.every((s) => intentos[s.letra] !== undefined);

  return (
    <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">PREGUNTA 7</h2>
    <p className="mb-4 text-gray-700">
      ¿Ha intentado <em>alguna vez</em> reducir o eliminar el consumo de la sustancia, y no lo ha logrado?
    </p>
  
    {/* Tabla para escritorio */}
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
          {sustanciasUsadas.map((s) => (
            <tr key={s.letra}>
              <td className="border p-2">{s.nombre}</td>
              {opciones.map((op) => (
                <td key={op.value} className="border p-2 text-center">
                  <input
                    type="radio"
                    name={`pregunta7-1-${s.letra}`}
                    value={op.value}
                    checked={intentos[s.letra] === op.value}
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
  
    {/* Tarjetas para móvil */}
    <div className="space-y-4 md:hidden">
      {sustanciasUsadas.map((s) => (
        <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
          <p className="font-semibold text-sm mb-2">{s.nombre}</p>
          <div className="flex flex-col gap-2">
            {opciones.map((op) => (
              <label key={op.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`pregunta7-2-${s.letra}`}
                  value={op.value}
                  checked={intentos[s.letra] === op.value}
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
 
    {puedeEnviar && (
        <button
          onClick={() => onSubmit(intentos)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Finalizar Encuesta
        </button>
      )}
 */
/**
 * 
 
  <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 7</h2>
      <p className="mb-4 text-gray-700">
        ¿Ha intentado <em>alguna vez</em> reducir o eliminar el consumo de la sustancia, y no lo ha logrado?
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
          {sustanciasUsadas.map((s) => (
            <tr key={s.letra}>
              <td className="border p-2">{s.nombre}</td>
              {opciones.map((op) => (
                <td key={op.value} className="border p-2 text-center">
                  <input
                    type="radio"
                    name={`pregunta7-${s.letra}`}

                    value={op.value}
                    checked={intentos[s.letra] === op.value}
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
