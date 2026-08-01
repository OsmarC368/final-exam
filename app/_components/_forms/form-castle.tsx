"use client"
import Form from "next/form"
import { Activity, useActionState } from "react"
import { useEffect, useState } from "react"
import { metodoCastle, updateCastle } from "@/app/_methods/postgre_methods";
import { Castle, House } from "@/app/_methods/types";

interface CastleDataProps {
    castle?: Castle | null
}

const FormCastles = ({ castle }: CastleDataProps) => {
    const [houses, setHouses] = useState<House[]>([]);
    const handleEvent = castle? updateCastle : metodoCastle;
    
    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
        const loadHouses = async () => {
            try {
                const res = await fetch('/postgre', { cache: 'no-store' });
                if (!res.ok) return;
                const body = await res.json();
                setHouses(body.data ?? []);
            } catch (error) {
                console.error('Error cargando houses:', error);
            }
        }
        loadHouses();
    }, []);

    useEffect(() => {
        if (request.auth) {
            window.location.href = "/castle";
        }
    }, [request]);

    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {castle?.id && (
                        <input type="hidden" name="id" value={castle.id} />
                    )}
                    <legend>{castle ? "Actualizar Castle" : "Registro de Castle"}</legend>       
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required disabled={pending} defaultValue={castle?.name || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="house">House</label>
                        <select id="house" name="house" required disabled={pending} defaultValue={castle?.house || ""}>
                            <option value="" disabled>{houses.length ? 'Seleccione una casa' : 'Cargando casas...'}</option>
                            {houses.map((house) => (
                                <option key={house.id} value={house.name}>{house.name}</option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="inCharge">In Charge</label>
                        <input type="text" id="inCharge" name="inCharge" required disabled={pending} defaultValue={castle?.inCharge || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="location">Location</label>
                        <input type="number" id="location" name="location" required disabled={pending} defaultValue={castle?.location || ""}/>
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>{castle ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormCastles