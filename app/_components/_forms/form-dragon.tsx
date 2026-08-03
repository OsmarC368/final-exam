"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import {  updateDragon, metodoDragon } from "@/app/_methods/mongo_methods";
import { Dragon } from "@/app/_methods/types";

interface DragonDataProps {
    dragon?: Dragon | null
}

const FormDragons = ({ dragon }: DragonDataProps) => {
    const handleEvent = dragon? updateDragon : metodoDragon;
    
    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
            if (request.auth) {
                window.location.href = "/dragons?message=Action Completed Succesfully!";
            }
        }, [request]);
    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {dragon?._id && (
                        <input type="hidden" name="id" value={dragon._id.toString()} />
                    )}
                    <legend>{dragon ? "Actualizar Dragon" : "Registro de Dragon"}</legend>       
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required disabled={pending} defaultValue={dragon?.name || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="rider">Rider</label>
                        <input type="text" id="rider" name="rider" required disabled={pending} defaultValue={dragon?.rider || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" required disabled={pending} defaultValue={dragon?.age || ""}/>
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>{dragon ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormDragons