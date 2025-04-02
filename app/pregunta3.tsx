
'use client';

import { useState, useEffect } from 'react';

const opciones = [
  { label: 'Nunca', value: 0 },
  { label: 'Una o dos veces', value: 3 },
  { label: 'Mensualmente', value: 4 },
  { label: 'Semanalmente', value: 5 },
  { label: 'Diariamente o casi diariamente', value: 6 },
];

const sustancias = [
  { letra: 'a', nombre: 'Tabaco (cigarrillos, tabaco de mascar, puros, etc.)' },
  { letra: 'b', nombre: 'Bebidas alcohólicas (cerveza, vinos, licores, etc.)' },
  { letra: 'c', nombre: 'Cannabis (marihuana, mota, hierba, hachís, etc.)' },
  { letra: 'd', nombre: 'Cocaína (coca, crack, etc.)' },
  { letra: 'e', nombre: 'Estimulantes de tipo anfetamina (speed, éxtasis, etc.)' },
  { letra: 'f', nombre: 'Inhalantes (gasolina, solvente para pintura, etc.)' },
  { letra: 'g', nombre: 'Sedantes o pastillas para dormir (diazepam, etc.)' },
  { letra: 'h', nombre: 'Alucinógenos (LSD, hongos, ketamina, etc.)' },
  { letra: 'i', nombre: 'Opiáceos (heroína, morfina, metadona, etc.)' },
  { letra: 'j', nombre: 'Otras, especifique:' },
];

type Props = {
  frecuenciasPregunta2: Record<string, number>; // Ej: { a: 4, c: 0, e: 3 }
  onSubmit: (respuestas: Record<string, any>) => void;
};

export default function Pregunta3({ frecuenciasPregunta2,onSubmit }: Props) {
  const [deseos, setDeseos] = useState<Record<string, number>>({});

  const sustanciasConConsumo = sustancias.filter(
    (s) => frecuenciasPregunta2[s.letra] && frecuenciasPregunta2[s.letra] > 0
  );

  const handleChange = (letra: string, valor: number) => {
    setDeseos((prev) => ({ ...prev, [letra]: valor }));
  };

  useEffect(() => {
   console.log( Object.values(deseos))
   onSubmit(deseos);

  /*
    const alMenosUnaSi = Object.values(deseos).includes(0);
    if (alMenosUnaSi) {
      onSubmit(deseos);
    } */
  }, [deseos, onSubmit]);


  return (
    

    <div className="max-w-5xl mx-auto p-6">
  <h2 className="text-2xl font-bold mb-4">PREGUNTA 3</h2>
  <p className="mb-4 text-gray-700">
    En los <em>últimos tres meses</em>, ¿con qué frecuencia ha sentido un fuerte deseo o ansias de consumir estas sustancias?
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
        {sustanciasConConsumo.map((s) => (
          <tr key={s.letra}>
            <td className="border p-2">{s.nombre}</td>
            {opciones.map((op) => (
              <td key={op.value} className="border p-2 text-center">
                <input
                  type="radio"
                  name={`pregunta3-2-${s.letra}`}
                  value={op.value}
                  checked={deseos[s.letra] === op.value}
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
                name={`pregunta3-1-${s.letra}`} 
                value={op.value}
                checked={deseos[s.letra] === op.value}
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
 * div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">PREGUNTA 3</h2>
      <p className="mb-4 text-gray-700">
        En los <em>últimos tres meses</em>, ¿con qué frecuencia ha sentido un fuerte deseo o ansias de consumir estas sustancias?
      </p>

      <table className="w-full border text-sm mb-6 overflow-x-auto hidden md:block" >
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
                    name={`pregunta3-${s.letra}`}

                    value={op.value}
                    checked={deseos[s.letra] === op.value}
                    onChange={() => handleChange(s.letra, op.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
 

            <div className="space-y-4 md:hidden">
        {sustanciasConConsumo.map((s) => (
            <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="font-semibold text-sm mb-2">{s.nombre}</p>
            <div className="flex flex-wrap gap-4">
                {opciones.map((op) => (
                <label key={op.value} className="flex items-center gap-2 text-sm">
                    <input
                    type="radio"
                    name={`pregunta2-3-${s.letra}`}
                    value={op.value}
                    checked={deseos[s.letra] === op.value}
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
 * 
 */
