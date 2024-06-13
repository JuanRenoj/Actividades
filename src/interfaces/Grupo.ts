interface Grupo{
    id?:string
    nombre:string
    integrantres:string
}
export type{Grupo as GrupoType}

export const getDataGrupo=(nombre:string,integrantres:string):Grupo=>{
    let grupo:Grupo={        
        nombre:nombre,
        integrantres:integrantres    
    }
    return grupo
}