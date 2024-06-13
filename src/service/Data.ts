import "../service/firebase";
import {getFirestore,collection, addDoc,getDocs, doc, updateDoc,deleteDoc} from 'firebase/firestore'
const db=getFirestore()
class Data{

async InsertNew <T>(data:T,table:string){
    try {
        let result=await addDoc(collection(db,table),
        data!
      )
      return true
       
      } catch (error) {
         console.log(error)
        return false
       
      }
}
async UpdateItem<T>(data:T,table:string, idDoc:string){
  try {
    const docRef=doc(db,table,idDoc)
    const result=updateDoc(docRef,data!)
    return true
  } catch (error) {
    return false
  }
}
async ViewData(table:string){
    try {
        let querySnapshot=await getDocs(collection(db,table));
     
        let temporalResult:any[]=[];
        querySnapshot.forEach((doc)=>{       
          temporalResult.push({id:doc.id,...doc.data()})
        })
        if(temporalResult.length > 0)
            {
                return temporalResult
            }
        return [];
       } catch (error) {
          console.log(error)
       return []
      
        
       }
}
ViewDataById(){}
async DeleteData(table:string,idDoc:string){
  try {
    const docRef=doc(db,table,idDoc);
    await deleteDoc(docRef)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

}
export default new Data
/**
 * import { collection, query, where, getDocs } from "firebase/firestore";

const q = query(collection(db, "cities"), where("capital", "==", true));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
 */