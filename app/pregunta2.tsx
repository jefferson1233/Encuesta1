'use client';

import {  useState, useEffect} from 'react';

const opciones = [
  { label: 'Nunca', value: 0 },
  { label: 'Una o dos veces', value: 2 },
  { label: 'Mensualmente', value: 3 },
  { label: 'Semanalmente', value: 4 },
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
  respuestasPregunta1: Record<string, string>;
  otrasTexto:string;
  onSubmit: (datos: {
    frecuencias: Record<string, number>;
    pasarADirecto: boolean;
  }) => void;
};

export default function Pregunta2({ respuestasPregunta1,onSubmit ,otrasTexto}: Props) {
  const [frecuencias, setFrecuencias] = useState<Record<string, number>>({});

  let  sustanciasRespondidas = sustancias.filter(
    (s) => respuestasPregunta1[s.letra] === 'si'
  );

  const handleChange = (letra: string, valor: number) => {
    setFrecuencias((prev) => ({ ...prev, [letra]: valor }));
  };

  const todasSonNunca = sustanciasRespondidas.every(
    (s) => frecuencias[s.letra] === 0
  );


 
  if (otrasTexto && sustanciasRespondidas.some((s) => s.letra === "j")) {
    sustanciasRespondidas = sustanciasRespondidas.map((s) =>
      s.letra === "j" ? { ...s, nombre: `Otras: ${otrasTexto}` } : s
    );
  }


  useEffect(() => {
    const puedeContinuar =
      sustanciasRespondidas.length > 0 &&
      sustanciasRespondidas.every((s) => frecuencias[s.letra] !== undefined);

      console.log(        sustanciasRespondidas.length > 0)

      console.log(      sustanciasRespondidas.every((s) => frecuencias[s.letra] !== undefined))
  
    if (puedeContinuar) {
      const todasSonNunca = sustanciasRespondidas.every(
        (s) => frecuencias[s.letra] === 0
      );

      console.log(  todasSonNunca)

      console.log(  {
        frecuencias,
        pasarADirecto: todasSonNunca,
      })

      onSubmit({
        frecuencias,
        pasarADirecto: todasSonNunca,
      });
    }
  }, [frecuencias, sustanciasRespondidas, onSubmit]);

  
  
  /*
        useEffect(() => {
          const alMenosUnaSi = Object.values(respuestasPregunta1).includes('si');
          if (alMenosUnaSi) {
            onSubmit(respuestasPregunta1);
          }
        }, [respuestasPregunta1, onSubmit]);
      */


  //const puedeContinuar = sustanciasRespondidas.every((s) => frecuencias[s.letra] !== undefined);


  return (
    <div className="max-w-5xl mx-auto p-6">
    <h2 className="text-2xl font-bold mb-4">PREGUNTA 2</h2>
    <p className="mb-4 text-gray-700">
      En los <em>últimos tres meses</em>, ¿con qué frecuencia ha consumido las sustancias que mencionó?
    </p>
  
    <div className="overflow-x-auto hidden md:block"  >
      <table className="min-w-full border text-sm">
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
                    name={`pregunta2-${s.letra}`}
                    value={op.value}
                    checked={frecuencias[s.letra] === op.value}
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

    <div className="space-y-4 md:hidden">
  {sustanciasRespondidas.map((s) => (
    <div key={s.letra} className="border rounded-lg p-4 shadow-sm bg-white">
      <p className="font-semibold text-sm mb-2">{s.nombre}</p>
      <div className="flex flex-wrap gap-4">
        {opciones.map((op) => (
          <label key={op.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={`pregunta2-2-${s.letra}`}
              value={op.value}
              checked={frecuencias[s.letra] === op.value}
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

  
    <div className="bg-blue-100 p-4 rounded text-sm text-blue-800">
      {sustanciasRespondidas.length === 0 ? (
        <p>No respondió “Sí” a ninguna sustancia en la Pregunta 1. Esta sección no aplica.</p>
      ) : todasSonNunca ? (
        <p>✅ Todas las respuestas fueron “Nunca”. Pase a la Pregunta 6.</p>
      ) : (
        <p>✅ Continúe con las preguntas 3, 4 y 5 para cada sustancia con puntuación 2 o más.</p>
      )}
    </div>
  
 
  </div>
  );
}

/*

   <pre className="mt-4 bg-gray-100 p-4 rounded text-xs">
      {JSON.stringify(frecuencias, null, 2)}
    </pre>
 {puedeContinuar && (
        <button
          onClick={() => onSubmit(frecuencias)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Continuar a Pregunta 3
        </button>
        )}
*/