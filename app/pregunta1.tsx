'use client';

import { useState, useEffect } from 'react';

const sustancias = [
  { letra: "a", nombre: "Tabaco (cigarrillos, tabaco de mascar, puros, etc.)" },
  { letra: "b", nombre: "Bebidas alcohólicas (cerveza, vinos, licores, etc.)" },
  { letra: "c", nombre: "Cannabis (marihuana, mota, hierba, hachís, etc.)" },
  { letra: "d", nombre: "Cocaína (coca, crack, etc.)" },
  { letra: "e", nombre: "Estimulantes de tipo anfetamina (speed, éxtasis, etc.)" },
  { letra: "f", nombre: "Inhalantes (gasolina, solvente para pintura, etc.)" },
  { letra: "g", nombre: "Sedantes o pastillas para dormir (diazepam, etc.)" },
  { letra: "h", nombre: "Alucinógenos (LSD, ácidos, hongos, ketamina, etc.)" },
  { letra: "i", nombre: "Opiáceos (heroína, morfina, metadona, etc.)" },
  { letra: "j", nombre: "Otras, especifique:" },
];

type Props = {
    onSubmit: (data: {
      respuestas: Record<string, string>;
      otrasTexto: string;
    }) => void;
  };

export default function Pregunta1({ onSubmit }: Props) {
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [otras, setOtras] = useState("");

  const handleChange = (letra: string, valor: string) => {
    setRespuestas((prev) => ({ ...prev, [letra]: valor }));
  };


  /*
  useEffect(() => {
    const todasRespondidas = sustancias.every((s) => respuestas[s.letra]);
    if (todasRespondidas) {
      onSubmit(respuestas);
    }
  }, [respuestas, onSubmit]);  

  useEffect(() => {
    const alMenosUnaSi = Object.values(respuestas).includes('si');
    const todasRespondidas = sustancias.every((s) => respuestas[s.letra] =='no');

    if (alMenosUnaSi || todasRespondidas) {
      onSubmit({
        respuestas,
        otrasTexto: respuestas["j"] === "si" ? otras : "",
      }
      );
    }
  }, [respuestas,otras, onSubmit]);
*/
  useEffect(() => {
    if (!respuestas || Object.keys(respuestas).length === 0) return;
  
    const todasRespondidas = sustancias.every((s) => respuestas[s.letra]);
    const todasNegativas = sustancias.every((s) => respuestas[s.letra] === "no");
  
    if (todasRespondidas || Object.values(respuestas).includes('si')) {
      onSubmit({ respuestas, otrasTexto: otras });
    }
  }, [respuestas, otras, onSubmit]);


//<div className="max-w-3xl mx-auto p-6">
  return (

   

    <div className="max-w-5xl mx-auto p-6 ">    
       <h1 className="text-2xl font-bold mb-4">PREGUNTA 1</h1>
    <p className="mb-6 text-gray-700">
      <strong>¿A lo largo de la vida, cuál de las siguientes sustancias ha consumido alguna vez?</strong> (solo las que consumió sin receta médica)
    </p>
      <div className="space-y-4">
        {sustancias.map((s) => (
          <div
            key={s.letra}
            className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-2"
          >
            <span className="flex-1 text-sm md:text-base font-medium">
              {s.letra}. {s.nombre}
            </span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm md:text-base">
                <input
                  type="radio"
                  name={`pregunta1-${s.letra}`}

                  value="no"
                  onChange={() => handleChange(s.letra, 'no')}
                  className="w-5 h-5 text-blue-600"
                />
                No
              </label>
              <label className="flex items-center gap-2 text-sm md:text-base">
                <input
                  type="radio"
                  name={`pregunta1-${s.letra}`}

                  value="si"
                  onChange={() => handleChange(s.letra, 'si')}
                  className="w-5 h-5 text-blue-600"
                />
                Sí
              </label>

              {s.letra === "j" && respuestas["j"] === "si" && (
                    <input
                    type="text"
                    placeholder="Especifique"
                    className="mt-2 border rounded p-2 w-full md:w-1/2"
                    value={otras}
                    onChange={(e) => setOtras(e.target.value)}
                    />
                )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
