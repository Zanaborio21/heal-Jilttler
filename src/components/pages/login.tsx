import { useState } from "react";

const Login = () => {
	const [correo, setCorreo] = useState("");
	const [password, setPassword] = useState("");
  
	const handleSubmit = (e: { preventDefault: () => void; }) => {
	  e.preventDefault();
  
	  fetch("https://health-tracker-backend-production.up.railway.app/api/v1/user/login", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({ correo, password }),
	  })
		.then((res) => res.json())
		.then((data) => {
			if (data.ok) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("user",JSON.stringify(data.user));
				window.location.replace("/");
			  } else {
				console.error("Inicio de sesión fallido");
			  }
		})
		.catch((error) => {
		  console.error(error);
		});
	};
  
	return (
	  <div className="logform">
		<form onSubmit={handleSubmit}>
		  <div className="wrapper">
			<h1 id="headline">Log in to connect</h1>
			<div className="input-data">
			  <input
				className="form__input"
				type="text"
				id="correo"
				autoComplete="off"
				placeholder=" "
				required
				value={correo}
				onChange={(e) => setCorreo(e.target.value)}
			  />
			  <label className="form__label">Correo</label>
			</div>
			<div className="input-data">
			  <input
				className="form__input"
				type="password"
				id="password"
				autoComplete="off"
				placeholder=" "
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			  />
			  <label className="form__label">Password</label>
			</div>
			<button className="logbut">Log in</button>
			<p className="bottom__lines">
			  Don't have an account <a className="link__one" href="">register here</a>
			  <br />
			  By Logging in you accept our <a className="link__two" href="#YOUR_TERMS">terms of use</a>
			  <br />
			</p>
		  </div>
		</form>
	  </div>
	);
  };
  
  export default Login;