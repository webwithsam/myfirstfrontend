import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios"
import { Login } from "./Mypages/firstpage";
import { View } from "./Mypages/view";
//import { SignUp } from "./Mypages/signup";
const generalurl = import.meta.env.VITE_url;

function App() {
  const [viewthis, setviewthis] = useState(null);
 
  const data = async()=>{
      const data =  await axios.get(`${generalurl}/get/api/users`,{ withCredentials:true }
        ) 
        console.log(data.data.token)
      if(data.data.token === undefined){
        setviewthis(true)
      }
      else{
        setviewthis(false);
      }
        
  }

 useEffect(()=>{
   data
 },[])
  
  return (
    <>
      {!viewthis && <Login setviewthis={setviewthis}></Login>}
      {viewthis && <View></View>}
    </>
  );
}
export default App;
 