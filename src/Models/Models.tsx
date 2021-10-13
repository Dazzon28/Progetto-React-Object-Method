export interface Animale{
    id:number,
    nome:string,
    genere:string,
    nzampe:number,
    idCasa:number
}

export interface Casa{
    id:number,
    via:string,
    city:string,
    nlocali:number,
}
export interface Persona{
    id:number,
    nome:string,
    cognome:string,
    dataNascita:string,
    idCasa:number
}