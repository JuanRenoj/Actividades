interface Turno{
    id?:string
    nombre:string,
    lugar:string
    fecha:string,
    hora:string
    lectores?:string,
    ministros?:string,
    delegados?:string,
    monaguillos?:string,
    coros?:string
    estado:string
}
export type{Turno as TurnoType}

export const getDataTurnoLector=(nombre:string,lugar:string,fecha: string,hora:string,lectores:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        lectores:lectores,
        estado:estado

    }
    return turno
}
export const getDataTurnoMinistros=(nombre:string,lugar:string,fecha: string,hora:string,ministros:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        ministros:ministros,
        estado:estado

    }
    return turno
}
export const getDataTurnoDelegados=(nombre:string,lugar:string,fecha: string,hora:string,delegados:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        delegados:delegados,
        estado:estado

    }
    return turno
}
export const getDataTurnoCoros=(nombre:string,lugar:string,fecha: string,hora:string,Coros:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        coros:Coros,
        estado:estado

    }
    return turno
}
export const getDataTurnoMonaguillos=(nombre:string,lugar:string,fecha: string,hora:string,monaguillos:string,estado:string):Turno=>{
    let turno:Turno={        
        nombre:nombre,
        lugar:lugar,
        fecha:fecha,
        hora:hora,
        monaguillos:monaguillos,
        estado:estado

    }
    return turno
}