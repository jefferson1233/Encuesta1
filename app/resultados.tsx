// components/ResumenFinal.tsx
"use client";

import React from "react";

let  sustancias = {
  a: "Productos de tabaco",
  b: "Bebidas alcohólicas",
  c: "Cannabis",
  d: "Cocaína",
  e: "Estimulantes de tipo anfetamina",
  f: "Inhalantes",
  g: "Sedantes o pastillas para dormir",
  h: "Alucinógenos",
  i: "Opiáceos",
  j: "Otras, especifique:",
};

type NivelRiesgo = "Bajo" | "Moderado" | "Alto";

type Resultado = {
  total: number;
  riesgo: NivelRiesgo;
};

type Props = {
  resultados: Record<string, Resultado>;
  otrasTexto:string;
};

export default function ResumenFinal({ resultados,otrasTexto }: Props) {


    const sustanciasFinal = { ...sustancias };
    if (otrasTexto) {
      sustanciasFinal.j = `Otras: ${otrasTexto}`;
    }


  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
      🧾 Resultado de tu evaluación sobre consumo de sustancias


      </h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Sustancia</th>
            <th className="border p-2 text-center">Puntuación</th>
            <th className="border p-2 text-center">Nivel de Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(resultados).map(([letra, { total, riesgo }]) => (
            <tr key={letra}>
              <td className="border p-2">{sustanciasFinal[letra as keyof typeof sustanciasFinal]}</td>
              <td className="border p-2 text-center">{total}</td>
              <td className="border p-2 text-center">
                <span
                  className={
                    riesgo === "Alto"
                      ? "text-red-600 font-bold"
                      : riesgo === "Moderado"
                      ? "text-yellow-600 font-semibold"
                      : "text-green-600"
                  }
                >
                  {riesgo}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="mt-6 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
  <h4 className="text-base font-semibold mb-2 text-blue-800">
    ¿Qué significan sus puntuaciones?
  </h4>
  <p className="mb-1">
    <strong>Bajo:</strong> Riesgo bajo de problemas relacionados con el consumo.
  </p>
  <p className="mb-1">
    <strong>Moderado:</strong> Riesgo moderado de problemas relacionados con el consumo.
  </p>
  <p>
    <strong>Alto:</strong> Usted corre un <span className="text-red-600 font-semibold">riesgo alto</span> de tener problemas graves (de salud, sociales, económicos, legales, en sus relaciones) a consecuencia de sus hábitos actuales de consumo y es probable que sea dependiente.
  </p>
</div>

    
    </div>
  );
}
/*
  <div className="mt-6 text-sm text-gray-700 bg-blue-50 p-4 rounded">
        <h4>¿Qué significan sus puntuaciones?        </h4>
        <p><strong>Bajo:</strong> Riesgo bajo de problemas relacionados con el consumo.</p>
        <p><strong>Moderado:</strong> Riesgo moderado de problemas relacionados con el consumo.</p>
        <p><strong>Alto:</strong>  Usted corre un riesgo alto de tener problemas graves (de salud, sociales, económicos, legales, en sus
            relaciones) a consecuencia de sus hábitos actuales de consumo y es probable que sea dependiente.</p>
      </div>
*/