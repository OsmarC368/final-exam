"use client"
import Form from "next/form";
import { useActionState, Activity, useEffect, useState } from "react"
import { Register } from "@/app/_methods/auth"
import Estilos from "@/app/login/styles.module.css"
import { useRouter } from "next/navigation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"

const Page = () => {
    const [request, action, pending] = useActionState(Register, {
        message: "",
        auth: false
    });
    const [fecha, setFecha] = useState<Dayjs | null>(dayjs("2003-05-30"))
    const formattedDate = fecha ? fecha.format("YYYY-MM-DD") : "";
    const router = useRouter();

    useEffect(() => {
        if (request.auth) {
            router.push("/login");
        }
    }, [request, router]);

    return (
        <div>
            <Form action={action} className={Estilos["form-container"]}>
                <fieldset>
                    <legend>Register</legend>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" required disabled={pending} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" required disabled={pending} />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required disabled={pending} />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="passwordAgain">Password Again</label>
                        <input type="password" id="passwordAgain" name="passwordAgain" required disabled={pending} />
                    </div>
                    <br />

                    <div>
                        <label htmlFor="userType">User Type</label>
                        <select name="userType" id="userType" required disabled={pending} className="bg-gray-950">
                            <option value="dragonseed">Dragon Seed</option>
                            <option value="dragonrider">Dragon Rider</option>
                            <option value="hand_of_the_king">Hand of the King</option>
                        </select>
                    </div>
                    <br />
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="BirthDate"
                                defaultValue={fecha}
                                value={fecha}
                                onChange={(newFecha) => { setFecha(newFecha) }}

                            />
                        </LocalizationProvider>
                        <input type="hidden" name="selectedDate" value={formattedDate} />
                    </div>
                    <br />
                    <button type="submit" disabled={pending}>Enter</button>
                </fieldset>
                <Activity mode={(request.message && !request.auth) ? "visible" : "hidden"}>
                    <h3>{request.message}</h3>
                </Activity>
            </Form>
        </div>
    )
}

export default Page;