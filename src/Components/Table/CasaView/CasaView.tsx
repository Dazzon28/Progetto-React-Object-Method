
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GetById from "../../../Apis/GetById";
import { Animale, Persona } from "../../../Models/Models";

const CasaView = () => {
    const id = useParams();
    const [animaleList, setAnimaleList] = useState<Animale[]>([]);
    const [personaList, setPersonaList] = useState<Persona[]>([]);
    const [loading, setLoading] = useState(true);
    const viewCasa = (id: any) => {
        console.log(id.id)
        GetById(id.id, "animale")
            .then(data => setAnimaleList(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
        GetById(id.id, "persona")
            .then(data => setPersonaList(data))
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        viewCasa(id);
    },[])
    return (
        <div className="table-container">
            <table>
                <thead>
                    <th>NOME</th>
                </thead>
                <tbody>
                    {animaleList.map((elem, index) => <tr><td>{elem.nome}</td></tr>)}
                </tbody>
            </table>
            <table>
                <thead>
                    <th>NOME</th> <th>COGNOME</th>
                </thead>
                <tbody>
                    {personaList.map((elem, index) => <tr><td>{elem.nome}</td><td>{elem.cognome}</td></tr>)}
                </tbody>
            </table>
            <Link to="/Casa" className="table-button">GO BACK</Link>
        </div>
    )
}
export default CasaView;