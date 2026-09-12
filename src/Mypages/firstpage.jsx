import axios from "axios";
import { useState, useRef } from "react";
import { SignUp } from "./signup";
import "./firstpage.css";
const generalurl = import.meta.env.VITE_url;

export function Login({ setviewthis }) {
  const email = useRef(null);
  const pass = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [load, setload] = useState("nothing");
  const [signupview, setsignupview] = useState(true);
  const [problem, setproblem] = useState("");
  let displayafterlogin;

  function validation() {
    setviewthis(false);
    let e = email.current.value.trim();
    let p = pass.current.value.trim();
    if (e === "") {
      setload("stop");
      //console.log("email is empty");
      setproblem("Email can never be empty");
      return false;
    }
    if (e.length != 10) {
      setload("stop");
     // console.log("not valid number");
      setproblem("Namba na Msimbo sio sahihi");
      return false;
    }
    if (e.charAt(0) !== "0") {
      setload("stop");
     // console.log("email value of 0 problem");
      setproblem("Namba na Msimbo sio sahihi");
      return false;
    }
    if (e.charAt(1) != "7" && e.charAt(1) != "6") {
      setload("stop");
      //console.log("email value of 7 or 6 problem");
      setproblem("Namba na Msimbo sio sahihi");
      return false;
    }
    if (p === "") {
      setload("stop");
      //console.log(p.length, "pass not greater than 3");
      setproblem("Msimbo hujaweka ");
      return false;
    }
    if (p.length <= 6) {
      setload("stop");
      //console.log(p.length, "pass not greater than 3");
      setproblem("Namba na Msimbo sio sahihi");
      return false;
    } else {
      return true;
    }
  }

  const jiunge = () => {
    setsignupview(false);
  };

  const post = async () => {
    // console.log("dfgtyuiopoiuyhgfdsasdrtyuiop");
    if (validation()) {
      setload("loading");
      let body = {
        email: email.current.value,
        password: pass.current.value,
      };
      const url = `${generalurl}/post/api/user/login`;
      const send = await axios.post(url, body, {withCredentials: true });
      setviewthis(send.data.gonext);
      setload(send.data.state);
      setproblem(send.data.value);
      //console.log(send.data);
    } 
    //else {}
  };

  const reload = () => {
    setload("nothing");
  };

  if (load == "stop") {
    displayafterlogin = (
      <div className="theblock">
        <p>{`${problem}`}</p>
        <button className="tryagain" onClick={reload}>
          try Again
        </button>
      </div>
    );
  }

  if (load == "loading") {
    displayafterlogin = (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (load == "nothing") {
    displayafterlogin = <></>;
  }

  return (
    <>
      {signupview && (
        <div className="login-container">
          <div className="login-box">
            <h2 style={{textAlign:"center"}}>Login Page</h2>
            <input ref={email} type="text" placeholder="Email" />
            <div className="password-box">
              <input
                ref={pass}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="button-group">
              <button className="signin-btn" onClick={jiunge}>
                Sign In
              </button>
              <button className="login-btn" onClick={post}>
                Login
              </button>
            </div>
          </div>
          {displayafterlogin}
        </div>
      )}
      {!signupview && <SignUp setsignupview={setsignupview}></SignUp>}
    </>
  );
}
