
'use client';

import { useState,useEffect } from 'react';

import { collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";


import Pregunta1 from './pregunta1';
import Pregunta2 from './pregunta2';
import Pregunta3 from './pregunta3';
import Pregunta4 from './pregunta4';
import Pregunta5 from './pregunta5';
import Pregunta6 from './pregunta6';

import Pregunta7 from './pregunta7';
import Pregunta8 from './pregunta8';

import Resultados from './resultados';


import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const rangosPorSustancia: Record<string, { bajo: number; moderado: number }> = {
    a: { bajo: 3, moderado: 26 },  // Tabaco
    b: { bajo: 10, moderado: 26 }, // Alcohol
    c: { bajo: 3, moderado: 26 },
    d: { bajo: 3, moderado: 26 },
    e: { bajo: 3, moderado: 26 },
    f: { bajo: 3, moderado: 26 },
    g: { bajo: 3, moderado: 26 },
    h: { bajo: 3, moderado: 26 },
    i: { bajo: 3, moderado: 26 },
    j: { bajo: 3, moderado: 26 },
};

type NivelRiesgo = "Bajo" | "Moderado" | "Alto";

type Resultado = {
    total: number;
    riesgo: NivelRiesgo;
};

type ResultadosFinales = Record<string, Resultado>;


function calcularPuntajesASSIST(
    p2: Record<string, number>,
    p3: Record<string, number>,
    p4: Record<string, number>,
    p5: Record<string, number>,
    p6: Record<string, number>,
    p7: Record<string, number>
): ResultadosFinales {
    const resultados: ResultadosFinales = {};

    for (const letra of Object.keys(p2)) {
        const incluirP5 = letra !== "a"; // Tabaco no incluye P5
        const total =
            (p2[letra] || 0) +
            (p3[letra] || 0) +
            (p4[letra] || 0) +
            (incluirP5 ? (p5[letra] || 0) : 0) +
            (p6[letra] || 0) +
            (p7[letra] || 0);

        const { bajo, moderado } = rangosPorSustancia[letra];

        let riesgo: NivelRiesgo = "Bajo";
        if (total > moderado) riesgo = "Alto";
        else if (total > bajo) riesgo = "Moderado";

        resultados[letra] = { total, riesgo };
    }

    return resultados;
}


export default function Page2() {
    const [respuestasP1, setRespuestasP1] = useState<Record<string, string> >({});
    const [frecuenciasP2, setFrecuenciasP2] = useState<Record<string, number> >({});
    const [deseosP3, setDeseosP3] = useState<Record<string, number> >({});
    const [problemasP4, setProblemasP4] = useState<Record<string, number>>({});
    const [fallosP5, setFallosP5] = useState<Record<string, number> >({});
    const [preocupacionesP6, setPreocupacionesP6] = useState<Record<string, number> >({});
    const [intentosP7, setIntentosP7] = useState<Record<string, number> >({});
    const [respuestaP8, setRespuestaP8] = useState<number >(0);
    const [saltarP3aP5, setSaltarP3aP5] = useState(false);
    const [otras, setOtras] = useState<string >("");

    const [mostrarFinal, setMostrarFinal] = useState(false);

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(respuestasP1)

    console.log(frecuenciasP2)

    console.log(deseosP3)

    console.log(problemasP4)

    console.log(fallosP5)
    console.log(preocupacionesP6)
    console.log(intentosP7)
    console.log(respuestaP8)

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")



    useEffect(() => {
        if ( mostrarFinal) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });
            setMostrarFinal(true);

            guardarEnFirebase();
        }

        if(respuestaP8){

            guardarEnFirebase();
        }


}, [ mostrarFinal,respuestaP8]);


const resultados = calcularPuntajesASSIST(
    frecuenciasP2,
    deseosP3,
    problemasP4,
    fallosP5,
    preocupacionesP6,
    intentosP7
);

//todasRespondidas && todasNegativas &&  todasRespondidas, todasNegativas, const todasRespondidas = sustancias.every((s) => respuestas[s.letra]);
//const todasNegativas = sustancias.every((s) => respuestas[s.letra] === 'no');




const guardarEnFirebase = async () => {
    // if (Object.keys(resultados).length === 0) return;
    const sessionId = crypto.randomUUID(); // ID único
    try {
        await addDoc(collection(db, "assist_respuestas"), {
            sessionId,
            respuestasP1,
            frecuenciasP2,
            deseosP3,
            problemasP4,
            fallosP5,
            preocupacionesP6,
            intentosP7,
            respuestaP8,
            otras,
            resultados,
            fecha: new Date().toISOString(),
        });
        console.log("✅ Datos guardados en Firebase");
    } catch (error) {
        console.error("❌ Error al guardar en Firebase:", error);
    }
};







return (
    <main className="p-4">

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




        <AnimatePresence>
            {mostrarFinal ? (
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
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
                        onClick={() => setMostrarFinal(false)}
                    >
                        ¿Se equivocó?
                    </button>
                </motion.div>
            ) : (
                <>
                    <Pregunta1
                        onSubmit={({ respuestas, otrasTexto }) => {

                            setRespuestasP1(respuestas);
                            const todasNegativas = Object.values(respuestas).every((r) => r === "no");
                            console.log("########################")
                            console.log(todasNegativas)

                            console.log("########################")
                            setOtras(otrasTexto);
                            if (todasNegativas) setMostrarFinal(true);
                        }}
                    />

                    {respuestasP1 && (
                        <Pregunta2
                            respuestasPregunta1={respuestasP1} otrasTexto={otras ?? ""}
                            onSubmit={({ frecuencias, pasarADirecto }) => {
                                setFrecuenciasP2(frecuencias);
                                setSaltarP3aP5(pasarADirecto);
                            }}
                        />
                    )}

                    {!saltarP3aP5 && frecuenciasP2 && (
                        <Pregunta3  otrasTexto={otras ?? ""}
                                    frecuenciasPregunta2={frecuenciasP2}
                                    onSubmit={(d) => setDeseosP3(d)}
                        />
                    )}
                    {!saltarP3aP5 && deseosP3 && (
                        <Pregunta4  otrasTexto={otras ?? ""}
                                    frecuenciasPregunta2={frecuenciasP2!}
                                    onSubmit={(p) => setProblemasP4(p)}
                        />
                    )}
                    {!saltarP3aP5 && problemasP4 && (
                        <Pregunta5  otrasTexto={otras ?? ""}
                                    frecuenciasPregunta2={frecuenciasP2!}
                                    onSubmit={(f) => setFallosP5(f)}
                        />
                    )}

                    {frecuenciasP2 && (saltarP3aP5 || (deseosP3 && problemasP4 && fallosP5))  &&  (
                        <Pregunta6  otrasTexto={otras ?? ""}
                                    respuestasPregunta1={respuestasP1!}
                                    onSubmit={(res) => setPreocupacionesP6(res)}
                        />
                    )}

                    {frecuenciasP2 && (
                        <Pregunta7  otrasTexto={otras ?? ""}
                                    respuestasPregunta1={respuestasP1!}
                                    onSubmit={(intentos) => setIntentosP7(intentos)}
                        />
                    )}

                    {frecuenciasP2 && (
                        <Pregunta8 onSubmit={(valor) => setRespuestaP8(valor)} />
                    )}

                    <Resultados  otrasTexto={otras ?? ""} resultados={resultados} />

                </>
            )}
        </AnimatePresence>




    </main>
);
}


/*







 {
       <Pregunta1
       onSubmit={(res) => {
         setRespuestasP1(res);
         const todasNegativas = Object.values(res).every((r) => r === "no");
         if (todasNegativas) {
           setMostrarFinal(true);
         }
       }}
     />
      }

      {respuestasP1 && (
        <Pregunta2
          respuestasPregunta1={respuestasP1}

          onSubmit={({ frecuencias, pasarADirecto  }) => {
            setFrecuenciasP2(frecuencias);
            setSaltarP3aP5(pasarADirecto);
          }}
        />
      )}


       {   frecuenciasP2 &&  !saltarP3aP5 && (
        <Pregunta3
          frecuenciasPregunta2={frecuenciasP2}
          onSubmit={(deseos) => setDeseosP3(deseos)}
        />
      )}

      {deseosP3 &&  !saltarP3aP5 && (
        <Pregunta4
          frecuenciasPregunta2={deseosP3}
          onSubmit={(problemas) => setProblemasP4(problemas)}
        />
      )}{frecuenciasP2  &&   !saltarP3aP5 && (
        <Pregunta5
          frecuenciasPregunta2={frecuenciasP2}
          onSubmit={(fallos) => setFallosP5(fallos)}
        />
      )}

      {frecuenciasP2 && (saltarP3aP5 || (deseosP3 && problemasP4 && fallosP5))  && (
        <Pregunta6
          respuestasPregunta1={respuestasP1!}
          onSubmit={(res) => setPreocupacionesP6(res)}
        />
      )}


      {frecuenciasP2 &&  preocupacionesP6  && (
        <Pregunta7
          respuestasPregunta1={respuestasP1!}
          onSubmit={(intentos) => setIntentosP7(intentos)}
        />
      )}


      {frecuenciasP2 && intentosP7 && (
        <Pregunta8 onSubmit={(valor) => setRespuestaP8(valor)} />
      )}







onSubmit={(frecuencias) => setFrecuenciasP2(frecuencias)}

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

*/
/*
<pre className="mt-6 bg-gray-100 p-4 rounded text-sm">
{JSON.stringify(respuestas, null, 2)}
<br />
Otras: {JSON.stringify(otras, null, 2)}
</pre>
*/