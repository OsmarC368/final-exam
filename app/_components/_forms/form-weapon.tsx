"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import { updateWeapon, metodoWeapon } from "@/app/_methods/mongo_methods";
import { Weapon } from "@/app/_methods/types";

interface WeaponDataProps {
    weapon?: Weapon | null
}

const FormWeapons = ({ weapon }: WeaponDataProps) => {
    const handleEvent = weapon ? updateWeapon : metodoWeapon;

    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
        if (request.auth) {
            window.location.href = "/weapons";
        }
    }, [request]);

    return (
        <div>
            <div>
                <Form action={action2}>
                    <fieldset>
                        {weapon?._id && (
                            <input type="hidden" name="id" value={weapon._id.toString()} />
                        )}
                        <legend>{weapon ? "Actualizar Weapon" : "Registro de Weapon"}</legend>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required disabled={pending} defaultValue={weapon?.name || ""} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="type">Type</label>
                            <input type="text" id="type" name="type" required disabled={pending} defaultValue={weapon?.type || ""} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="material">Material</label>
                            <input type="text" id="material" name="material" required disabled={pending} defaultValue={weapon?.material || ""} />
                        </div>
                        <br />
                        <button type="submit" disabled={pending}>{weapon ? "Actualizar" : "Guardar"}</button>
                    </fieldset>
                    <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                        <h3>{request.message}</h3>
                    </Activity>
                </Form>
            </div>
        </div>
    )
}

export default FormWeapons