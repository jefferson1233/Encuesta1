'use client';

import { useState } from 'react';

type Props = {
    onSubmit: (respuestas: Record<string, any>) => void;
};

export default function FactoresRiesgoGenero({ onSubmit }: Props) {
    const [respuestas, setRespuestas] = useState<Record<string, any>>({});


    /*
    const handleChange = (key: string, value: any) => {
        setRespuestas((prev) => ({ ...prev, [key]: value }));

        onSubmit(respuestas);

    };
*/
    const handleChange = (key: string, value: any) => {
        setRespuestas(prev => {

            onSubmit({ respuestas });


            const next = { ...prev, [key]: value };
            onSubmit(next);               // emite el estado NUEVO
            return next;
        });


    };




    const handleCheckboxChange = (key: string, value: string) => {
        const current = respuestas[key] || [];
        const updated = current.includes(value)
            ? current.filter((v: string) => v !== value)
            : [...current, value];
        setRespuestas((prev) => ({ ...prev, [key]: updated }));
    };



    return (
        <div className="max-w-3xl  p-6 bg-white   ">
            <h2 className="text-xl font-bold mb-4">Factores de Riesgo de Violencia de Género</h2>

            <div className="space-y-6">
                {/* Pregunta 1 */}
                <div>
                    <p>1. ¿Usted ha sido testigo de un caso de violencia de género?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p1" onChange={() => handleChange('testigoViolencia', 'Si')} /> Si</label>
                        <label><input type="radio" name="p1" onChange={() => handleChange('testigoViolencia', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 2 */}
                <div>
                    <p>2. ¿Usted tiene pareja?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p2" onChange={() => handleChange('tienePareja', 'Si')} /> Si</label>
                        <label><input type="radio" name="p2" onChange={() => handleChange('tienePareja', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 3 (condicional) */}
                {respuestas.tienePareja === 'Si' && (
                    <div>
                        <p>3. En caso de responder Sí, ¿Quién toma las decisiones?</p>
                        <div className="flex gap-4 mt-2">
                            <label><input type="radio" name="p3" onChange={() => handleChange('quienDecide', 'Usted')} /> Usted</label>
                            <label><input type="radio" name="p3" onChange={() => handleChange('quienDecide', 'Pareja')} /> Pareja</label>
                            <label><input type="radio" name="p3" onChange={() => handleChange('quienDecide', 'Ambos')} /> Ambos</label>
                        </div>
                    </div>
                )}

                {/* Pregunta 4 */}
                <div>
                    <p>4. ¿Usted o su pareja consume alcohol y/o drogas ocasionalmente?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p4" onChange={() => handleChange('consumoSustancias', 'Si')} /> Si</label>
                        <label><input type="radio" name="p4" onChange={() => handleChange('consumoSustancias', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 5 */}
                <div>
                    <p>5. ¿Usted o su pareja controlan sus emociones?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p5" onChange={() => handleChange('controlEmocional', 'Si')} /> Si</label>
                        <label><input type="radio" name="p5" onChange={() => handleChange('controlEmocional', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 6 */}
                <div>
                    <p>6. ¿Usted o su pareja creen en los roles de género?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p6" onChange={() => handleChange('rolesGenero', 'Si')} /> Si</label>
                        <label><input type="radio" name="p6" onChange={() => handleChange('rolesGenero', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 7 */}
                <div>
                    <p>7. ¿Su comunidad es violenta o permite la violencia de género?</p>
                    <div className="flex gap-4 mt-2">
                        <label><input type="radio" name="p7" onChange={() => handleChange('comunidadViolenta', 'Si')} /> Si</label>
                        <label><input type="radio" name="p7" onChange={() => handleChange('comunidadViolenta', 'No')} /> No</label>
                    </div>
                </div>

                {/* Pregunta 8 */}
                <div>
                    <p>8. En caso de haber sufrido violencia de género alguna vez, por favor señale qué tipo:</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                            'Física',
                            'Psicológica',
                            'Sexual',
                            'Económica / Patrimonial',
                            'Obstétrica',
                            'Digital',
                            'Acoso sexual',
                        ].map((tipo) => (
                            <label key={tipo} className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange('tiposViolenciaSufrida', tipo)}
                                    checked={respuestas.tiposViolenciaSufrida?.includes(tipo) || false}
                                />
                                {tipo}
                            </label>
                        ))}
                    </div>
                </div>
            </div>




        </div>
    );
}

/*
 <div className="mt-6 text-center">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Enviar respuestas
                </button>
            </div>
* */
