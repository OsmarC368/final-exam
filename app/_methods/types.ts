import { ObjectId } from "mongodb"

export type Message = {
    message: string,
    auth: boolean
}

export type Payload = {
    username: string,
    email: string,
    userType: string
}

export type User = {
    _id?: ObjectId,
    username: string,
    email: string,
    password: string,
    userType: string
}

export type House = {
    id?: number,
    name: string, 
    motto: string,
    animal: string,
    region: string,
    shield?: string
}

export type Valyrian = {
    id?: number,
    word: string, 
    translation: string,
    pronunciation: string
}

export type Monarch = {
    id?: number,
    name: string,
    reign: number,
    predecessor: string,
    successor: string
}

export type Castle = {
    id?: number,
    name: string,
    house: string,
    inCharge: string,
    location: string
}

export type Dragon = {
    _id?: ObjectId,
    name: string,
    rider: string,
    age: number
}

export type Weapon = {
    _id?: ObjectId,
    name: string,
    type: string,
    material: string
}

export type Character = {
    _id?: ObjectId,
    name: string,
    house: string,
    alias: string
}

export type Episode = {
    _id?: ObjectId,
    title: string,
    season: number,
    episodeNumber: number
}

export enum UserType {
    DRAGONSEED = "dragonseed",
    DRAGONRIDER = "dragonrider",
    HANDOFTHEKING = "hand_of_the_king",
}