"use client"
import Form from "next/form"
import { Activity, useActionState, useEffect } from "react"
import { updateEpisode, metodoEpisode } from "@/app/_methods/mongo_methods";
import { Episode } from "@/app/_methods/types";

interface EpisodeDataProps {
    episode?: Episode | null
}

const FormEpisode = ({ episode }: EpisodeDataProps) => {
    const handleEvent = episode ? updateEpisode : metodoEpisode;

    const [request, action2, pending] = useActionState(handleEvent, {
        message: "",
        auth: false
    });

    useEffect(() => {
        if (request.auth) {
            window.location.href = "/episode";
        }
    }, [request]);

    return (
        <div>
            <div>
                <Form action={action2}>
                    <fieldset>
                        {episode?._id && (
                            <input type="hidden" name="id" value={episode._id.toString()} />
                        )}
                        <legend>{episode ? "Actualizar Episode" : "Registro de Episode"}</legend>
                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" required disabled={pending} defaultValue={episode?.title || ""} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="season">Season</label>
                            <input type="number" id="season" name="season" required disabled={pending} defaultValue={episode?.season || ""} />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="episodeNumber">Episode Number</label>
                            <input type="number" id="episodeNumber" name="episodeNumber" required disabled={pending} defaultValue={episode?.episodeNumber || ""} />
                        </div>
                        <br />
                        <button type="submit" disabled={pending}>{episode ? "Actualizar" : "Guardar"}</button>
                    </fieldset>
                    <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                        <h3>{request.message}</h3>
                    </Activity>
                </Form>
            </div>
        </div>
    )
}

export default FormEpisode