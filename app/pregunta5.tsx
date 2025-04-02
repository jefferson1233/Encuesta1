'use client';

import { useState , useEffect} from 'react';

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
  onSubmit: (fallos: Record<string, number>) => void;
};

const opciones = [
  { label: 'Nunca', value: 0 },
  { label: 'Una o dos veces', value: 5 },
  { label: 'Mensualmente', value: 6 },
  { label: 'Semanalmente', value: 7 },
  { label: 'Diariamente o casi diariamente', value: 8 },
];

export default function Pregunta5({ frecuenciasPregunta2, onSubmit }: Props) {
  const [fallos, setFallos] = useState<Record<string, number>>({});

  const sustanciasConConsumo = sustancias.filter(
    (s) => frecuenciasPregunta2[s.letra] && frecuenciasPregunta2[s.letra] > 0
  );

  const handleChange = (letra: string, valor: number) => {
    setFallos((prev) => ({ ...prev, [letra]: valor }));
  };

 // const puedeContinuar = sustanciasConConsumo.every((s) => fallos[s.letra] !== undefined);



  useEffect(() => {
    console.log( Object.values(fallos))
    onSubmit(fallos);
   }, [fallos, onSubmit]);
 

  return (
    <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">PREGUNTA 5</h2>
    <p className="mb-4 text-gray-700">
      En los <em>últimos tres meses</em>, ¿con qué frecuencia dejó de hacer lo que habitualmente se esperaba de usted por el consumo?
    </p>
  
    {/* Tabla solo en escritorio */}
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
                    name={`pregunta5-1-${s.letra}`}
                    value={op.value}
                    checked={fallos[s.letra] === op.value}
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
      {sustanciasConConsumo.map((s) => (
        <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
          <p className="font-semibold text-sm mb-2">{s.nombre}</p>
          <div className="flex flex-col gap-2">
            {opciones.map((op) => (
              <label key={op.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`pregunta5-2-${s.letra}`}
                  value={op.value}
                  checked={fallos[s.letra] === op.value}
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

/*
   {puedeContinuar && (
        <button
          onClick={() => onSubmit(fallos)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Finalizar / Continuar
        </button>
      )}
*/


/**
 *  <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 5</h2>
      <p className="mb-4 text-gray-700">
        En los <em>últimos tres meses</em>, ¿con qué frecuencia dejó de hacer lo que habitualmente se esperaba de usted por el consumo?
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
                    name={`pregunta5-${s.letra}`}

                    value={op.value}
                    checked={fallos[s.letra] === op.value}
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
 * 
 */