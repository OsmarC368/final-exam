"use client"
import Form from "next/form"
import { Activity, useActionState } from "react"
import { useEffect, useState } from "react"
import {  updateCharacter, metodoCharacter } from "@/app/_methods/mongo_methods";
import { Character, House } from "@/app/_methods/types";

interface CharacterDataProps {
    character?: Character | null
}

const FormCharacters = ({ character }: CharacterDataProps) => {
    const [houses, setHouses] = useState<House[]>([]);
    const handleEvent = character? updateCharacter : metodoCharacter;

    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
        if (request.auth) {
            window.location.href = "/character";
        }
    }, [request]);

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
    return(
        <div>
            <div>
                <Form action={action2}>
                <fieldset>
                    {character?._id && (
                        <input type="hidden" name="id" value={character._id.toString()} />
                    )}
                    <legend>{character ? "Actualizar Character" : "Registro de Character"}</legend>       
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required disabled={pending} defaultValue={character?.name || ""}/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="house">House</label>
                        <select id="house" name="house" required disabled={pending} defaultValue={character?.house || ""}>
                            <option value="" disabled>{houses.length ? 'Select a House' : 'Loading Houses...'}</option>
                            {houses.map((house) => (
                                <option key={house.id} value={house.name}>{house.name}</option>
                            ))}
                        </select>
                    </div>
                    <br />
                    <div>
                        <label htmlFor="alias">Alias</label>
                        <input type="text" id="alias" name="alias" required disabled={pending} defaultValue={character?.alias || ""}/>
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>{character ? "Actualizar" : "Guardar"}</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
            </div>
        </div>
    )
}

export default FormCharacters