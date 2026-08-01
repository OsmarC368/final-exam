"use server"
import { Message, Dragon, Character, Weapon, Episode } from "@/app/_methods/types";
import { URL_ACTUAL } from "@/app/_methods/variables";

//DRAGON METHODS
const metodoDragon = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const rider = data.get("rider") as string;
    const age = data.get("age") as string;
    const request = await fetch(`${URL_ACTUAL}mongo1`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "rider": rider,
            "age": +age
        })
    });
    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

const getListDragon = async () => {
    const request = await fetch(`${URL_ACTUAL}mongo1`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateDragon = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const rider = data.get("rider") as string;
    const age = data.get("age") as string;

    const request = await fetch(`${URL_ACTUAL}mongo1`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "rider": rider,
            "age": +age
        })
    });

    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    
    return ({ message: message_info, auth: auth_info });
} 

const getDragonByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}mongo1?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Dragon | null
    return test
}

const deleteDragon = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}mongo1`,
        {
            method: "DELETE",
            body: JSON.stringify({
                id
            })
        }
    );

    const body = await request.json();

    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}


//WEAPONS METHODS
const metodoWeapon = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const material = data.get("material") as string;
    const request = await fetch(`${URL_ACTUAL}mongo2`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "type": type,
            "material": material
        })
    });
    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

const getListWeapon = async () => {
    const request = await fetch(`${URL_ACTUAL}mongo2`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateWeapon = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const material = data.get("material") as string;

    const request = await fetch(`${URL_ACTUAL}mongo2`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "type": type,
            "material": material
        })
    });

    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    
    return ({ message: message_info, auth: auth_info });
} 

const getWeaponByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}mongo2?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Weapon | null
    return test
}

const deleteWeapon = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}mongo2`,
        {
            method: "DELETE",
            body: JSON.stringify({
                id
            })
        }
    );

    const body = await request.json();

    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

//CHARACTERS METHODS
const metodoCharacter = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const house = data.get("house") as string;
    const alias = data.get("alias") as string;
    const request = await fetch(`${URL_ACTUAL}mongo3`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "house": house,
            "alias": alias
        })
    });
    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

const getListCharacter = async () => {
    const request = await fetch(`${URL_ACTUAL}mongo3`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateCharacter = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const house = data.get("house") as string;
    const alias = data.get("alias") as string;

    const request = await fetch(`${URL_ACTUAL}mongo3`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "house": house,
            "alias": alias
        })
    });

    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    
    return ({ message: message_info, auth: auth_info });
} 

const getCharacterByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}mongo3?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Character | null
    return test
}

const deleteCharacter = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}mongo3`,
        {
            method: "DELETE",
            body: JSON.stringify({
                id
            })
        }
    );

    const body = await request.json();

    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

//EPISODES METHODS
const metodoEpisode = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const title = data.get("title") as string;
    const season = data.get("season") as string;
    const episodeNumber = data.get("episodeNumber") as string;
    const request = await fetch(`${URL_ACTUAL}mongo4`, {
        method: "POST",
        body: JSON.stringify({
            "title": title,
            "season": +season,
            "episodeNumber": +episodeNumber
        })
    });
    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}

const getListEpisode = async () => {
    const request = await fetch(`${URL_ACTUAL}mongo4`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateEpisode = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const title = data.get("title") as string;
    const season = data.get("season") as string;
    const episodeNumber = data.get("episodeNumber") as string;

    const request = await fetch(`${URL_ACTUAL}mongo4`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "title": title,
            "season": +season,
            "episodeNumber": +episodeNumber
        })
    });

    const body = await request.json();
    
    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    
    return ({ message: message_info, auth: auth_info });
} 

const getEpisodeByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}mongo4?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Episode | null
    return test
}

const deleteEpisode = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}mongo4`,
        {
            method: "DELETE",
            body: JSON.stringify({
                id
            })
        }
    );

    const body = await request.json();

    if(request.status != 200) {
        message_info = body["info"];
    } else {
        auth_info = true;
        message_info = body["info"];
    }
    return ({ message: message_info, auth: auth_info })
}


export {
    metodoDragon,
    getListDragon,
    updateDragon,
    getDragonByID,
    deleteDragon,
    metodoWeapon,
    getListWeapon,
    updateWeapon,
    getWeaponByID,
    deleteWeapon,
    metodoCharacter,
    getListCharacter,
    updateCharacter,
    getCharacterByID,
    deleteCharacter,
    metodoEpisode,
    getListEpisode,
    updateEpisode,
    getEpisodeByID,
    deleteEpisode
}