import moment from "moment";


export const DayInterval=(fechaEvento:string, hours:string):string=>{
  
  

   
    let hora=fechaEvento+" "+hours+":00"


    let cantMinute=Number(moment(new Date(hora)).diff(moment(new Date()),"minutes")).toFixed(2) 
    let positive=(Math.sign(Number(cantMinute)))
    let result=Math.abs(Math.round(Number(cantMinute)));  
    let days=0;
    let hour=0;
    let minute=0;
    while(Number(result) >= 60){
        if(Number(result) >= 1440){
            days++
            result= (Number(result)-1440)
         
           continue
        }
        if(Number(result) >= 60){
            hour++
            result= (Number(result)-60)
          
        continue   
        }
      
        
    }
  
        minute=minute+result
 
        

    if(positive === 1 || positive === 0){
      return `Entre: ${devolver(days,hour,minute)}  `
             
    }else{
      return `Hace: ${devolver(days,hour,minute)}`
         
    }
   
}
function devolver(dia:number, hora:number, minutos:number){
    if(dia>0){
        return dia>1 ? dia+" dias" : dia+" dia"
    }
    if(hora>0){
        return hora>1 ? hora+" hrs" : hora+" hr"
    }
    if(minutos>0){
        return minutos>1 ? minutos+" mins" : minutos+" min"
    }
}