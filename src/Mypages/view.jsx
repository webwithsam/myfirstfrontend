import { useEffect , useState} from "react";
import "./view.css";
import axios from "axios";
const generalurl = import.meta.env.VITE_url;

export function View() {
const [thedata , setthedata] = useState([])
 const data = async()=>{ 
    const data =  await axios.get(
      `${generalurl}/get/api/users`,
      { withCredentials:true }
    ) 
    setthedata(data.data)
    console.log(data.data)
   
   }
 const remove =()=>{
  axios.post(`${generalurl}/logout`,{},{
    withCredentials:true
  })
   window.navigation.reload();
 }
                           
 useEffect (()=>{
  data()
 },[])

  return (
    <>
      <div className="thetitle">
        <div className="titlename">firstname</div>
        <div className="titlelast">lastname</div>
            <div className="titlemail">Email</div>
        <div className="titlerole">Role</div>
      </div>
      <div className="logout"><button onClick={remove}>LogOut</button></div>
      {thedata.map((dd , id) => {
        // console.log(dd)
        return (
          <div key={id} className="thehead">
            <div className="name">{`${dd.firstname}`}</div>
            <div className="last">{`${dd.lastname}`}</div>
            <div className="email">{`${dd.email}`}</div>
            <div className="role">{`${dd.role}`}</div>
            </div> 
        );
      })}
    </>
  );
}

