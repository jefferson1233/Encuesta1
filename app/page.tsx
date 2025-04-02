"use client";

import { useState, useEffect } from "react";
// @ts-expect-error
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any


export default function Home() {


  const  [respuestas, setRespuestas] = useState <any>({});
  const [otras, setOtras] = useState("");
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const handleChange = (letra: string, valor: string) => {
    setRespuestas((prev: any) => ({
      ...prev,
      [letra]: valor,
    }));
  };

  const todasRespondidas = sustancias.every(s => respuestas[s.letra] !== undefined);
  const todasNegativas = sustancias.every(s => respuestas[s.letra] === "no");

  useEffect(() => {
    if (todasRespondidas && todasNegativas && !mostrarFinal) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
      setMostrarFinal(true);
    }
  }, [respuestas]);

  return (
    <>
      <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Prueba de Detección de Consumo de Alcohol, Tabaco y Sustancias
        </h1>

        <div className="space-y-4 text-gray-700 mb-8">
          <p>
            Las siguientes preguntas se refieren a su experiencia sobre el consumo de alcohol, tabaco y otras sustancias a lo largo de la vida y en los últimos tres meses. Estas sustancias se pueden fumar, ingerir, inhalar o inyectar.
          </p>
          <p>
            Aunque también nos interesa conocer las diferentes drogas ilícitas que ha consumido, tenga la seguridad de que esa información será estrictamente confidencial.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <AnimatePresence>
          {!mostrarFinal ? (
            <motion.div
              key="formulario"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
            >
              <h1 className="text-2xl font-bold mb-4">PREGUNTA 1</h1>
              <p className="mb-6 text-gray-700">
                <strong>¿A lo largo de la vida, cuál de las siguientes sustancias ha consumido alguna vez?</strong> (solo las que consumió sin receta médica)
              </p>

              <form className="space-y-4">
                {sustancias.map((s) => (
                  <div key={s.letra} className="flex flex-col md:flex-row md:items-center gap-4">
                    <label className="md:w-2/3">
                      <span className="font-medium">{s.letra}. {s.nombre}</span>
                      {s.letra === "j" && (
                        <input
                          type="text"
                          placeholder="Especifique"
                          className="mt-1 w-full border rounded p-2"
                          value={otras}
                          onChange={(e) => setOtras(e.target.value)}
                        />
                      )}
                    </label>
                    <div className="flex gap-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={s.letra}
                          value="no"
                          checked={respuestas[s.letra] === "no"}
                          onChange={() => handleChange(s.letra, "no")}
                          className="mr-2"
                        />
                        No
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name={s.letra}
                          value="si"
                          checked={respuestas[s.letra] === "si"}
                          onChange={() => handleChange(s.letra, "si")}
                          className="mr-2"
                        />
                        Sí
                      </label>
                    </div>
                  </div>
                ))}
              </form>

              <div className="mt-8 p-4 bg-blue-100 rounded">
                {todasNegativas ? (
                  <p className="text-blue-800 font-semibold">
                    ❗ Todas las respuestas fueron negativas. Preguntar:
                    <em> “¿Ni siquiera cuando estaba en la escuela?”</em><br />
                    Si se mantiene negativa, detenga la entrevista.
                  </p>
                ) : (
                  <p className="text-green-700 font-semibold">
                    ✅ Se debe hacer la Pregunta 2 para cada sustancia que respondió “Sí”.
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-16"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 ¡Gracias por responder!</h2>
              <p className="text-lg text-gray-700">
                No ha consumido ninguna sustancia. No es necesario continuar la encuesta.
              </p>
               <button
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded transition"
      onClick={(e) => {
        e.preventDefault();
        setMostrarFinal(false); // Mostrar formulario otra vez
      }}
    >
      ¿Se equivocó?
    </button>
            </motion.div>
          )}
        </AnimatePresence>
  
     
      </div>
    </>
  );
}
/*
<pre className="mt-6 bg-gray-100 p-4 rounded text-sm">
{JSON.stringify(respuestas, null, 2)}
<br />
Otras: {JSON.stringify(otras, null, 2)}
</pre>
*/