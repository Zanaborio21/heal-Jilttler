import { string } from "prop-types";
import { Fragment, useEffect, useState } from "react";

interface SelectEvent extends React.ChangeEventHandler<HTMLSelectElement> {
    target: HTMLSelectElement & {
      selectedOptions: HTMLCollectionOf<HTMLOptionElement & { key: number }>;
    };
}

interface Pacient {
    pacient_id: number;
    id: number;
}

interface MedItem {
    id: number;
    nombre: string;
}

interface HTMLSelElement extends HTMLOptionElement {
    key: number;
}

export default function Recordatory () {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : {};
    const userId = user.id;
    const [meds, setMeds] = useState([]);
    const [error, setError] = useState("");
    const [pacientes, setPacientes] = useState([]);

    const [selectedMed, setSelectedMed] = useState("clorfenamina");
    const [medId, setMedId] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [interval, setInterval] = useState("");
    const [message, setMessage] = useState("");

    // function handleChange (event: React.SelectHTMLAttributes<HTMLSelectElement>) {
    //     console.log((event.target as HTMLInputElement).value);
    //     setSelectedMed((event.target as HTMLInputElement).value);
    //     setMedId(event.target.selectedOptions[0].key);
    // };

    useEffect(() => {
        
        async function fetchMeds() {
            const options = {
                method: "get",
                headers: {
                "Content-Type": "application/json"
                }
            };
            try {
                const response = await fetch('https://health-tracker-backend-production.up.railway.app/api/v1/pastilla', options);
                const data = await response.json();

                console.log(meds);
                setMeds(data.data);

            } catch (error: any) {
                setError(error);
                console.log(error);
            }
        }
        async function fetchPacientes() {
            const options = {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };
            try {
                const response = await fetch('https://health-tracker-backend-production.up.railway.app/api/v1/pacientes', options);
                const data = await response.json();
                console.log(pacientes);
                setPacientes(data.data);

            } catch (error: any) {
                setError(error);
                console.log(error);
            }
        }
        fetchMeds();
        fetchPacientes();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        console.log(typeof startDate, endDate, interval, medId, userId);
        const paciente = pacientes.find((obj: Pacient) => obj.pacient_id === userId);
        const pacienteId = paciente ? (paciente as Pacient).id: "";
        const data = {
            Fecha_inicio: startDate + ":00Z",
            Fecha_fin: endDate + ":00Z",
            interval: interval,
            message: message,
            medicamento: medId,
            pacientes: pacienteId
        };
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        };
        console.log(`medId -> ${medId}`);
        console.log(token);
        console.log(options.body);
        await fetch("https://health-tracker-backend-production.up.railway.app/api/v1/recordatory", options);
    }

	return (
        <Fragment>
        <h1 className="recordatorytitle"> Add Recordatory </h1>
        <form className="recordatoryform" onSubmit={handleSubmit}>
            <label className="recordatorylabel">Start Date:</label>
            <input type="datetime-local" className="recordatoryinput" id="start-date" name="start-date" required onChange={(e) => setStartDate(e.target.value)}/>
            
            <label className="recordatorylabel">End Date:</label>
            <input type="datetime-local" className="recordatoryinput" id="end-date" name="end-date" required onChange={(e) => setEndDate(e.target.value)}/>
            
            <label className="recordatorylabel">Intervals:</label>
            <input type="float" className="recordatoryinput" id="float-field" name="float-field" placeholder="Intervals in hours" required onChange={(e) => setInterval(e.target.value)}/>
            
            <label className="recordatorylabel">Select Field:</label>
            <select className="recordatoryinput" id="select-field" name="select-field" value={selectedMed} required onChange={(e) => setMedId((e.target.selectedOptions[0] as HTMLSelElement).key)}>
                {meds.map( (item: MedItem) => (
                    <option key={item.id} value={item.nombre}>{item.nombre}</option>
                ))}
            </select>

            <label className="recordatorylabel">Text Field:</label>
            <input type="text" className="recordatoryinput" id="text-field" name="text-field" required onChange={(e) => setMessage(e.target.value)}/>
            
            <input type="submit" className="recordatorysubmit" value="Submit"/>
        </form>
        </Fragment>
	)
}
