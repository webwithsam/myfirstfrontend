import { useRef, useState } from "react";
import axios from "axios";
import "./signup.css";

export function SignUp({ setsignupview }) {
  const [showPassword, setShowPassword] = useState(false);
  const [load, setload] = useState("wait");
  let displayaftersignup;
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);
  const confirmpass = useRef(null);
  const [problem, setproblem] = useState("");
  const jiunge = () => {
    setsignupview("true");
  };

  function validation() {
    let e = email.current.value.trim();
    let p = pass.current.value.trim();
    let fn = firstname.current.value.trim();
    let sc = lastname.current.value.trim();
    let cpm = confirmpass.current.value.trim();

    if (fn === "") {
      setload("stop");
      setproblem("firstname can never be empty");
      console.log("name is empty");
      return false;
    }
    if (sc === "") {
      setload("stop");
      setproblem("secondname can never be empty");
      console.log("lastname is empty");
      return false;
    }
    if (e === "") {
      setload("stop");
      setproblem("email can never be empty");
      console.log("email is empty");
      return false;
    }
    if (p === "") {
      setload("stop");
      setproblem("pasword can never be empty");
      console.log("p is empty");
      return false;
    }
    if (cpm === "") {
      setload("stop");
      setproblem("confirm can never be empty");
      console.log("confirm pp  is empty");
      return false;
    }
    if (e.length != 10) {
      setload("stop");
      setproblem("email not oky");
      console.log(e.length, "not valid number");
      return false;
    }
    if (e.charAt(0) !== "0") {
      setload("stop");
      setproblem("email start only with 0 ");
      console.log("email value of 0 problem");
      return false;
    }
    if (e.charAt(1) != "7" && e.charAt(1) != "6") {
      setload("stop");
      setproblem("email second value is 7 0r 6");
      console.log("email value of 7 or 6 problem");
      return false;
    }
    if (p.length <= 6) {
      setload("stop");
      setproblem("password lenght is short < 6");
      console.log(p.length, "pass not greater than 3");
      return false;
    }
    if (p != cpm) {
      setload("stop");
      setproblem("password not the same");
      console.log("password not the same as cnf");
      return false;
    } else {
      return true;
    }
  }
  const post = async () => {
    if (validation()) {
      setload("true");
      let body = {
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        email: email.current.value,
        password: pass.current.value,
        confirmpass: confirmpass.current.value,
      };
      const url = "https://myfirstserver-y0gs.onrender.com/post/api/signup";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const send = await axios.post(url, body, config);
      //setviewthis(send.data.state);
      setload(send.data.state);
      setproblem(send.data.value);
    }
  };

  if (load == "stop") {
    displayaftersignup = (
      <div className="theblock">
        <p>{`${problem}`}</p>
        <button
          className="tryagain"
          onClick={() => {setload("wait");}}>
          ok
        </button>
      </div>
    );
  }
  if (load == "true") {
    displayaftersignup = (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (load == "false") {
    displayaftersignup = <>
      <div className="theblock">
        <p>{`${problem}`}</p>
        <button
          className="tryagain"
         onClick={jiunge}
        >
          ok
        </button>
      </div>
    );
    </>;
  }
   if (load == "wait") {
    displayaftersignup = <></>;
  }
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 style={{ textAlign: "center" }}>Sign up </h2>
        <input
          ref={firstname}
          className="ff"
          type="text"
          placeholder="FirstName"
        />
        <input
          ref={lastname}
          className="ff"
          type="text"
          placeholder="LastName"
        />
        <input ref={email} className="ff" type="text" placeholder="Email" />
        <div className="setpass">
          <input
            className="ff"
            ref={pass}
            type={showPassword ? "text" : "password"}
            placeholder="set Password"
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <input
          className=" ff checkpass"
          type="password"
          ref={confirmpass}
          placeholder="confrim Password"
        />

        <div className="button-group">
          <button className="signin-btn" onClick={jiunge}>
            Cancel
          </button>
          <button className="login-btn" onClick={post}>
            SignUp
          </button>
        </div>
      </div>
      {displayaftersignup}
    </div>
  );
}
