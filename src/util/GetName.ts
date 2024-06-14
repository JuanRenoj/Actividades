export const GetNames= (integrantes:string):string[] => {
    console.log(integrantes)
  let result:string[]=[]
  if(integrantes !==undefined){
  result=integrantes.split(",");
  }
  return result
}