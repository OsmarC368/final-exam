"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import { metodoHouse, updateHouse,  } from "@/app/_methods/postgre_methods";
import { House } from "@/app/_methods/types";

interface HouseDataProps {
    house?: House | null
}

const FormHouses = ({ house }: HouseDataProps) => {
    const handleEvent = house? updateHouse : metodoHouse;
    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });
    useEffect(() => {
        if (request.auth) {
            window.location.href = "/house";
        }
    }, [request]);

    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {house?.id && (
                        <input type="hidden" name="id" value={house.id} />
                    )}
                    <legend>{house ? "Actualizar House" : "Registro de House"}</legend>       
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required disabled={pending} defaultValue={house?.name || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="motto">Motto</label>
                        <input type="text" id="motto" name="motto" required disabled={pending} defaultValue={house?.motto || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="animal">Animal</label>
                        <input type="text" id="animal" name="animal" required disabled={pending} defaultValue={house?.animal || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="description">Region</label>
                        <input type="text" id="description" name="description" required disabled={pending} defaultValue={house?.region || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="shieldUrl">Shield URL</label>
                        <input type="text" id="shieldUrl" name="shieldUrl" required disabled={pending} defaultValue={house?.shield || ""}/>
                    </div>
                    <br />
                    <br />
                    <button type="submit" disabled={pending}>{house ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormHouses