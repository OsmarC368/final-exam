"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import { metodoMonarch, updateMonarch } from "@/app/_methods/postgre_methods";
import { Monarch } from "@/app/_methods/types";

interface MonarchDataProps {
    monarch?: Monarch | null
}

const FormMonarchs = ({ monarch }: MonarchDataProps) => {
    const handleEvent = monarch? updateMonarch : metodoMonarch;
    
    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
        if (request.auth) {
            window.location.href = "/monarch";
        }
    }, [request]);

    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {monarch?.id && (
                        <input type="hidden" name="id" value={monarch.id} />
                    )}
                    <legend>{monarch ? "Actualizar Monarch" : "Registro de Monarch"}</legend>       
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required disabled={pending} defaultValue={monarch?.name || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="reign">Reign</label>
                        <input type="number" id="reign" name="reign" required disabled={pending} defaultValue={monarch?.reign || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="predecessor">Predecessor</label>
                        <input type="text" id="predecessor" name="predecessor" required disabled={pending} defaultValue={monarch?.predecessor || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="successor">Successor</label>
                        <input type="text" id="successor" name="successor" required disabled={pending} defaultValue={monarch?.successor || ""}/>
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>{monarch ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormMonarchs