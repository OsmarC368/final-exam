"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import {  metodoValyrian, updateValyrian } from "@/app/_methods/postgre_methods";
import { Valyrian } from "@/app/_methods/types";

interface ValyrianDataProps {
    valyrian?: Valyrian | null
}

const FormValyrians = ({ valyrian }: ValyrianDataProps) => {
    const handleEvent = valyrian? updateValyrian : metodoValyrian;
    
    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
            if (request.auth) {
                window.location.href = "/valyrian?message=Action Completed Succesfully!";
            }
        }, [request]);
        
    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {valyrian?.id && (
                        <input type="hidden" name="id" value={valyrian.id} />
                    )}
                    <legend>{valyrian ? "Actualizar Valyrian" : "Registro de Valyrian"}</legend>       
                    <div>
                        <label htmlFor="word">Word</label>
                        <input type="text" id="word" name="word" required disabled={pending} defaultValue={valyrian?.word || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="translation">Translation</label>
                        <input type="text" id="translation" name="translation" required disabled={pending} defaultValue={valyrian?.translation || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="pronunciation">Pronunciation</label>
                        <input type="text" id="pronunciation" name="pronunciation" required disabled={pending} defaultValue={valyrian?.pronunciation || ""}/>
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>{valyrian ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormValyrians