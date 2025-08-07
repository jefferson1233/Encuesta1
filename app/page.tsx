
/*
'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import Pregunta2_ from './pregunta2Psicologia';
import Pregunta3_ from './pregunta3Psicologia';

type NivelViolencia = 'Bajo' | 'Sospecha Alta' | 'Maltrato Confirmado';

export default function Page() {
    const [respuestasViolencia, setRespuestasViolencia] = useState<{
        corta: Record<string, number>;
        larga: Record<string, number>;
    }>({
        corta: {},
        larga: {},
    });

    const [resultados, setResultados] = useState<{
        total: number;
        porcentaje: number;
        nivel: NivelViolencia;
    } | null>(null);

    // Calcular resultados cuando todas las respuestas están completas
    useEffect(() => {
        const completas =
            Object.keys(respuestasViolencia.corta).length === 2 &&
            Object.keys(respuestasViolencia.larga).length === 6;

        if (completas && !resultados) {
            const r = analizarWastViolencia(respuestasViolencia);
            setResultados(r);

            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });
        }
    }, [respuestasViolencia, resultados]);

    const resultadoParcial = analizarWastViolencia(respuestasViolencia);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
                Encuesta de Prevención y Detección Temprana de Violencia de Pareja
            </h1>

            <p className="mb-4 text-gray-700">
                Esta encuesta está diseñada para identificar posibles situaciones de violencia en las relaciones de pareja.
                Sus respuestas serán tratadas con absoluta confidencialidad y utilizadas únicamente con fines de orientación,
                prevención e intervención.
            </p>

            <div className="mt-4 p-4 bg-gray-100 border rounded text-center">
                <p><strong>🔢 Puntaje acumulado:</strong> {resultadoParcial.total} / 24</p>
                <p><strong>📊 Porcentaje:</strong> {resultadoParcial.porcentaje}%</p>
                <p>
                    <strong>⚠️ Nivel de riesgo:</strong>{" "}
                    <span className={
                        resultadoParcial.nivel === "Maltrato Confirmado"
                            ? "text-red-600 font-bold"
                            : resultadoParcial.nivel === "Sospecha Alta"
                                ? "text-yellow-600 font-semibold"
                                : "text-green-600"
                    }>
            {resultadoParcial.nivel}
          </span>
                </p>
            </div>

            <Pregunta2_
                onSubmit={({ respuestas }) => {
                    setRespuestasViolencia((prev) => ({ ...prev, corta: respuestas }));
                }}
            />

            <Pregunta3_
                onSubmit={({ respuestas }) => {
                    setRespuestasViolencia((prev) => ({ ...prev, larga: respuestas }));
                }}
            />

            {resultados && (
                <div className="mt-10 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-2">Resultados finales</h2>
                    <p><strong>Total:</strong> {resultados.total} puntos</p>
                    <p><strong>Porcentaje:</strong> {resultados.porcentaje}%</p>
                    <p><strong>Nivel de violencia:</strong> {resultados.nivel}</p>
                </div>
            )}
        </div>
    );
}

// Función que analiza el cuestionario WAST
function analizarWastViolencia(
    respuestas: {
        corta: Record<string, number>;
        larga: Record<string, number>;
    }
): {
    total: number;
    porcentaje: number;
    nivel: NivelViolencia;
} {
    const todasRespuestas = { ...respuestas.corta, ...respuestas.larga };
    const total = Object.values(todasRespuestas).reduce((a, b) => a + b, 0);
    const porcentaje = Math.round((total / 24) * 100); // 8 preguntas * 3 = 24

    const f = respuestas.larga['6f'];
    const g = respuestas.larga['7g'];
    const h = respuestas.larga['8h'];

    const casoConfirmado = (f && f !== 1) || (g && g !== 1) || (h && h !== 1);
    const sospechaAlta = total >= 11 && f === 1 && g === 1 && h === 1;

    let nivel: NivelViolencia = 'Bajo';
    if (casoConfirmado) nivel = 'Maltrato Confirmado';
    else if (sospechaAlta) nivel = 'Sospecha Alta';

    return { total, porcentaje, nivel };
}



*/
'use client';

import {
  useState, useEffect
} from 'react';


import { collection, addDoc } from "firebase/firestore";
import { db } from "./lib/firebase";



import confetti from "canvas-confetti";
import Pregunta2_ from './pregunta2Psicologia';
import Pregunta3_ from './pregunta3Psicologia';
import FormularioDatos from "@/app/Formulario";

type NivelViolencia = "Bajo" | "Sospecha Alta" | "Maltrato Confirmado";

export default function Page() {
  const [respuestasViolencia, setRespuestasViolencia] = useState<{
    corta: Record<string, number>;
    larga: Record<string, number>;
  }>({
    corta: {},
    larga: {},
  });

  const [mostrarFinal, setMostrarFinal] = useState(false);
  const [resultados, setResultados] = useState<{
    total: number;
    porcentaje: number;
    nivel: NivelViolencia;
  } | null>(null);


    const [datosPersonales, setDatosPersonales] = useState<null | {
        carrera: string;
        edad: number;
        curso: string;
        sexo: string;
        genero: string;
    }>(null);



    const guardarEnFirebase = async () => {
        // if (Object.keys(resultados).length === 0) return;
        const sessionId = crypto.randomUUID(); // ID único
        try {
            await addDoc(collection(db, "psicologia"), {
                sessionId,
                corta:respuestasViolencia.corta,
                larga:respuestasViolencia.larga,
                resultados,
                resultadoParcial,
                datosPersonales,
                fecha: new Date().toISOString(),
            });
            console.log("✅ Datos guardados en Firebase");
        } catch (error) {
            console.error("❌ Error al guardar en Firebase:", error);
        }
    };
    type ResultadoViolencia = {
        total: number;
        porcentaje: number;
        nivel: 'Bajo' | 'Sospecha Alta' | 'Maltrato Confirmado'; // o enum NivelViolencia
    };

  // Calcular resultados en tiempo real
  //const resultadoParcial = analizarWastViolencia(respuestasViolencia);

    const [resultadoParcial, setResultadoParcial] = useState<ResultadoViolencia | null>(null);



    /*
    useEffect(() => {
        setResultadoParcial(analizarWastViolencia(respuestasViolencia));
    }, [respuestasViolencia]);
   */

  /*
  // Detectar si ya se ha completado
  useEffect(() => {
    const completadas =
        Object.keys(respuestasViolencia.corta).length === 2 &&
        Object.keys(respuestasViolencia.larga).length === 6;

    if (completadas && !mostrarFinal) {
      setMostrarFinal(true);
      guardarEnFirebase();
    }
  }, [respuestasViolencia]);

  useEffect(() => {
    if (!mostrarFinal || resultados) return;

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });

    setResultados(analizarWastViolencia(respuestasViolencia));
  }, [mostrarFinal, respuestasViolencia, resultados]);
   */

    const [mostrarLarga, setMostrarLarga] = useState(true);

    useEffect(() => {
        const completadas =
            Object.keys(respuestasViolencia.corta).length === 2 &&
            Object.keys(respuestasViolencia.larga).length === 6;


        if(  Object.keys(respuestasViolencia.corta).length === 2){

           if( respuestasViolencia.corta['1a']==1 &&  respuestasViolencia.corta['2b']==1 ){
               setMostrarLarga(true)
            }
           else {
               setMostrarLarga(false)

           }



        }

        setResultadoParcial(analizarWastViolencia(respuestasViolencia));

        console.log(respuestasViolencia)

        if (completadas && !mostrarFinal) {
            setMostrarFinal(true);

            const resultados = analizarWastViolencia(respuestasViolencia);
            setResultados(resultados);

            console.log(datosPersonales)
            guardarEnFirebase();


            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });
        }

        if(mostrarFinal){

            guardarEnFirebase();

        }
    }, [respuestasViolencia, datosPersonales]);



    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">
                Bienestar universitario y el nombre del proyecto: Carla (Proyecto de Prevención y Atención Primaria en Casos de Violencia y Acoso) y de Karen (  Prevención al Consumo de Drogas,
                Bebidas Alcohólicas, Cigarrillo y Derivados del Tabaco

            </h1>

            <p className="mb-4 text-gray-700">

            </p>





            <FormularioDatos onSubmit={(datos) => setDatosPersonales(datos)}/>


            <Pregunta2_
                onSubmit={({respuestas}) => {

                    console.log(respuestas)


                    setRespuestasViolencia((prev) => ({
                        ...prev,
                        corta: respuestas, // ✅ CORRECTO
                    }));
                }}
            />


            {!mostrarLarga && (

                <Pregunta3_
                onSubmit={({respuestas}) => {
                    setRespuestasViolencia((prev) => ({
                        ...prev,
                        larga: respuestas, // ✅ CORRECTO
                    }));
                }}
            />
            )}

            <div className="mt-4 p-4 bg-gray-100 border rounded text-center">
                <p><strong>🔢 Puntaje acumulado:</strong> {resultadoParcial?.total} / 24</p>
                <p><strong>📊 Porcentaje:</strong> {resultadoParcial?.porcentaje}%</p>
                <p>
                    <strong>⚠️ Nivel de riesgo:</strong>{" "}
                    <span className={
                        !(resultadoParcial) || resultadoParcial.nivel === "Maltrato Confirmado"
                            ? "text-red-600 font-bold"
                            : resultadoParcial.nivel === "Sospecha Alta"
                                ? "text-yellow-600 font-semibold"
                                : "text-green-600"
                    }>
            {resultadoParcial?.nivel}
          </span>
                </p>
            </div>

            {mostrarFinal && resultados && (
                <div className="mt-6 p-4 bg-green-100 border rounded text-center">
                    <h2 className="text-xl font-bold mb-2">✅ Encuesta finalizada</h2>
                    <p>Total: {resultados.total} / 24</p>
                    <p>Porcentaje: {resultados.porcentaje}%</p>
                    <p>
                        Nivel:{" "}
                        <span className={
                            resultados.nivel === "Maltrato Confirmado"
                                ? "text-red-600 font-bold"
                                : resultados.nivel === "Sospecha Alta"
                                    ? "text-yellow-600 font-semibold"
                                    : "text-green-600"
                        }>
              {resultados.nivel}
            </span>
                    </p>
                </div>
            )}




        </main>
    );
}

// Función corregida
function analizarWastViolencia(
    respuestas: { corta: Record<string, number>; larga: Record<string, number> }
): { total: number; porcentaje: number; nivel: NivelViolencia } {
    const combinadas = {...respuestas.corta, ...respuestas.larga};
    const total = Object.values(combinadas).reduce((a, b) => a + b, 0);
    const porcentaje = (total / 24) * 100;

    const f = combinadas["6f"];
    const g = combinadas["7g"];
    const h = combinadas["8h"];

    const casoConfirmado = (f && f !== 1) || (g && g !== 1) || (h && h !== 1);
    const sospechaAlta = total >= 11 && f === 1 && g === 1 && h === 1;

    let nivel: NivelViolencia = "Bajo";
    if (casoConfirmado) nivel = "Maltrato Confirmado";
  else if (sospechaAlta) nivel = "Sospecha Alta";

  return {
    total,
    porcentaje: Math.round(porcentaje),
    nivel,
  };
}


/*


<!--
            <button
                onClick={() => {

                    guardarEnFirebase();

                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Guardar   Encuesta
            </button>


*  onSubmit={({ respuestas }) => {
              setRespuestasViolencia((prev) => {
                const actualizadas = { ...prev, corta: respuestas };
                return actualizadas;
              });
            }}
* */