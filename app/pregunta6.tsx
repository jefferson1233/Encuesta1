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
  respuestasPregunta1: Record<string, string>; // sustancias marcadas como "sí"
  onSubmit: (preocupaciones: Record<string, number>) => void;
};

const opciones = [
  { label: 'No, nunca', value: 0 },
  { label: 'Sí, en los últimos 3 meses', value: 6 },
  { label: 'Sí, pero no en los últimos 3 meses', value: 3 },
];

export default function Pregunta6({ respuestasPregunta1, onSubmit }: Props) {
  const [preocupaciones, setPreocupaciones] = useState<Record<string, number>>({});

  const sustanciasRespondidas = sustancias.filter(
    (s) => respuestasPregunta1[s.letra] === 'si'
  );

  const handleChange = (letra: string, valor: number) => {
    setPreocupaciones((prev) => ({ ...prev, [letra]: valor }));
  };

  /*
  const puedeContinuar = sustanciasRespondidas.every(
    (s) => preocupaciones[s.letra] !== undefined
  ); */


  
    useEffect(() => {
      console.log( Object.values(preocupaciones))
      onSubmit(preocupaciones);
     }, [preocupaciones, onSubmit]);
   
  

  return (
   

    <div className="max-w-5xl mx-auto p-6">
  <h2 className="text-2xl font-bold mb-4">PREGUNTA 6</h2>
  <p className="mb-4 text-gray-700">
    ¿Un amigo, familiar u otra persona ha mostrado preocupación por su consumo?
  </p>

  {/* Tabla (visible en escritorio) */}
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
        {sustanciasRespondidas.map((s) => (
          <tr key={s.letra}>
            <td className="border p-2">{s.nombre}</td>
            {opciones.map((op) => (
              <td key={op.value} className="border p-2 text-center">
                <input
                  type="radio"
                  name={`pregunta6-${s.letra}`}
                  value={op.value}
                  checked={preocupaciones[s.letra] === op.value}
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

  {/* Tarjetas (visible en móviles) */}
  <div className="space-y-4 md:hidden">
    {sustanciasRespondidas.map((s) => (
      <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
        <p className="font-semibold text-sm mb-2">{s.nombre}</p>
        <div className="flex flex-col gap-2">
          {opciones.map((op) => (
            <label key={op.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={`pregunta6-${s.letra}`}
                value={op.value}
                checked={preocupaciones[s.letra] === op.value}
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
 *   {puedeContinuar && (
        <button
          onClick={() => onSubmit(preocupaciones)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Continuar a la Pregunta 7
        </button>
      )}


       <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 6</h2>
      <p className="mb-4 text-gray-700">
        ¿Un amigo, familiar u otra persona ha mostrado preocupación por su consumo?
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
          {sustanciasRespondidas.map((s) => (
            <tr key={s.letra}>
              <td className="border p-2">{s.nombre}</td>
              {opciones.map((op) => (
                <td key={op.value} className="border p-2 text-center">
                  <input
                    type="radio"
                    name={`pregunta6-${s.letra}`}

                    value={op.value}
                    checked={preocupaciones[s.letra] === op.value}
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