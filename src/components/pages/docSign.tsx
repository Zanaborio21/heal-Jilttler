import { useState } from "react";

interface SignupData {
  name: string;
  last_name: string;
  dni: string;
  celular: string;
  users: {
    correo: string;
    password: string;
  };
}

const DocSign = () => {
  const [last_name,setLast_name] = useState("");
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signupData: SignupData = {
      name,
      dni,
      last_name,
      celular,
      users: { correo, password },
    };

    try {
      const response = await fetch("https://health-tracker-backend-production.up.railway.app/api/v1/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (data.ok) {
        console.log("Registro exitoso");
		window.location.replace("/");
      } else {
        console.error("Error al registrarse:", data);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
  
	return (
	  <div className="logform">
		<form onSubmit={handleSubmit}>
		  <div className="wrapper">
			<h1 id="headline">Registrarse</h1>
			<div className="input-data">
			  <input
				className="form__input"
				type="text"
				id="name"
				autoComplete="off"
				placeholder=" "
				required
				value={name}
				onChange={(e) => setName(e.target.value)}
			  />
			  <label className="form__label">Nombre</label>
			</div>

            <div className="input-data">
			  <input
				className="form__input"
				type="text"
				id="last_name"
				autoComplete="off"
				placeholder=" "
				required
				value={last_name}
				onChange={(e) => setLast_name(e.target.value)}
			  />
			  <label className="form__label">Apellido</label>
			</div>

			<div className="input-data">
			  <input
				className="form__input"
				type="text"
				id="dni"
				autoComplete="off"
				placeholder=" "
				required
				value={dni}
				onChange={(e) => setDni(e.target.value)}
			  />
			  <label className="form__label">Dni</label>
			</div>

			<div className="input-data">
			  <input
				className="form__input"
				type="text"
				id="celular"
				autoComplete="off"
				placeholder=" "
				required
				value={celular}
				onChange={(e) => setCelular(e.target.value)}
			  />
			  <label className="form__label">Celular</label>
			</div>

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
			<button className="logbut">Registrarse</button>
			<div className="otheroption">
			  <img src="img/google.png" width="70" alt="" id="google" />
			  <img src="img/facebook.png" width="70" alt="" id="facebook" />
			</div>
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
  

export default DocSign;