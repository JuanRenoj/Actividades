interface Turno{
    id?:string
    nombre:string,
    lugar:string
    fecha:string,
    hora:string
    encargados:string,
    estado:string
}
export type{Turno as TurnoType}

export const getDataTurno=(nombre:string,lugar:string,fecha: string,hora:string,encargados:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        encargados:encargados,
        estado:estado

    }
    return turno
}