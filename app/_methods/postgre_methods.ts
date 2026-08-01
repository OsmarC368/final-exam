"use server"
import { URL_ACTUAL } from "@/app/_methods/variables"
import { Message, House, Valyrian, Monarch, Castle } from "@/app/_methods/types"

//House Methods
const metodoHouse = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const motto = data.get("motto") as string;
    const animal = data.get("animal") as string;
    const region = data.get("region") as string;
    const shield = data.get("shield") as string;
    const request = await fetch(`${URL_ACTUAL}postgre`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "motto": motto,
            "animal": animal,
            "region": region,
            "shield": shield
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

const updateHouse = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const motto = data.get("motto") as string;
    const animal = data.get("animal") as string;
    const region = data.get("region") as string;
    const shield = data.get("shield") as string;

    const request = await fetch(`${URL_ACTUAL}postgre`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "motto": motto,
            "animal": animal,
            "region": region,
            "shield": shield
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

const getListHouses = async () => {
    const request = await fetch(`${URL_ACTUAL}postgre`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const getHouseByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}postgre?id=${id}`);
    const body = await request.json();
    const house = body["data"] as House | null
    return house
}

const deleteHouse = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}postgre`,
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

// Valyrian Methods

const metodoValyrian = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const word = data.get("word") as string;
    const translation = data.get("translation") as string;
    const pronunciation = data.get("pronunciation") as string;
    const request = await fetch(`${URL_ACTUAL}postgre2`, {
        method: "POST",
        body: JSON.stringify({
            "word": word,
            "translation": translation,
            "pronunciation": pronunciation
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

const getListValyrians = async () => {
    const request = await fetch(`${URL_ACTUAL}postgre2`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateValyrian = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const word = data.get("word") as string;
    const translation = data.get("translation") as string;
    const pronunciation = data.get("pronunciation") as string;

    const request = await fetch(`${URL_ACTUAL}postgre2`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "word": word,
            "translation": translation,
            "pronunciation": pronunciation
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

const getValyrianByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}postgre2?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Valyrian | null
    return test
}

const deleteValyrian = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}postgre2`,
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

//Castle Methods

const metodoCastle = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const house = data.get("house") as string;
    const inCharge = data.get("inCharge") as string;
    const location = data.get("location") as string;
    const request = await fetch(`${URL_ACTUAL}postgre4`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "house": house,
            "inCharge": inCharge,
            "location": location
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

const getListCastles = async () => {
    const request = await fetch(`${URL_ACTUAL}postgre4`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateCastle = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const house = data.get("house") as string;
    const inCharge = data.get("inCharge") as string;
    const location = data.get("location") as string;

    const request = await fetch(`${URL_ACTUAL}postgre4`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "house": house,
            "inCharge": inCharge,
            "location": location
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

const getCastleByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}postgre4?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Castle | null
    return test
}

const deleteCastle = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}postgre4`,
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

//Monarch Methods

const metodoMonarch = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    const name = data.get("name") as string;
    const reign = data.get("reign") as string;
    const predecessor = data.get("predecessor") as string;
    const successor = data.get("successor") as string;
    const request = await fetch(`${URL_ACTUAL}postgre3`, {
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "reign": +reign,
            "predecessor": predecessor,
            "successor": successor
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

const getListMonarch = async () => {
    const request = await fetch(`${URL_ACTUAL}postgre3`);
    const body = await request.json();
    const list = body["data"];
    return list
}

const updateMonarch = async (message: Message, data : FormData) => {
    let message_info = "";
    let auth_info = false;
    

    const id = data.get("id") as string;
    const name = data.get("name") as string;
    const reign = data.get("reign") as string;
    const predecessor = data.get("predecessor") as string;
    const successor = data.get("successor") as string;

    const request = await fetch(`${URL_ACTUAL}postgre3`, {
        method: "PUT",
        body: JSON.stringify({
            "id": id,
            "name": name,
            "reign": +reign,
            "predecessor": predecessor,
            "successor": successor
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

const getMonarchByID = async (id: string) => {
    const request = await fetch(`${URL_ACTUAL}postgre3?id=${id}`);
    const body = await request.json();
    const test = body["data"] as Monarch | null
    return test
}

const deleteMonarch = async (id: string) => {
    let message_info = "";
    let auth_info = false;
    const request = await fetch(`${URL_ACTUAL}postgre3`,
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
    metodoHouse, 
    getListHouses, 
    getHouseByID, 
    updateHouse, 
    deleteHouse, 
    metodoMonarch, 
    getListMonarch,
    getMonarchByID, 
    updateMonarch, 
    deleteMonarch, 
    metodoValyrian, 
    getListValyrians,
    getValyrianByID, 
    updateValyrian, 
    deleteValyrian,
    metodoCastle,
    getListCastles,
    getCastleByID,
    updateCastle,
    deleteCastle
}
