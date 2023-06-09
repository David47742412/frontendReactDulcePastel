import React, {ChangeEvent, memo, MouseEvent, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css.map';
import '../../style/customers/customersStyle.css';
import {NavBar} from "../nav/NavBar";
import {User} from "../../model/user/dto/User";
import {MessageSocket} from "../../model/message/MessageSocket";
import {GenericView} from "../../model/viewData/dto/GenericView";
import {Customers as Cliente} from "../../model/customers/dto/Customers";
import App from "../../App";

const url = process.env.REACT_APP_URL_API;

export const Customers = (): JSX.Element => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_SESSION as string) as string) as User | null;
    const [message, setMessage] = useState<MessageSocket<GenericView>>(new MessageSocket<GenericView>());
    message.Token = user?.Token as string;
    const client = new Cliente();
    const [FormData, setFormData] = useState({
        id: "",
        nombre: "",
        apellido: "",
        tipoDocId: "",
        nroDoc: "",
        direccion: "",
        celular: "",
        telFijo: "",
        email: "",
        fNacimiento: "",
    });

    const [document, setDocument] = useState<GenericView[] | null>(null);
    const [customers, setCustomers] = useState<GenericView [] | null>(null);
    let action = "1";

    const onClickModifed = (ev: MouseEvent<HTMLButtonElement>) => {
        const findCustomer = customers?.filter(e => e.Value1 === ev.currentTarget.value)[0] as GenericView;
        let fecha = findCustomer?.Value10.toString();
        fecha = fecha.split("/");
        fecha = new Date(Number(fecha[2]), Number(fecha[1]) - 1, Number(fecha[0]))
        fecha = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;
        setFormData({
            id: findCustomer?.Value1 ?? "",
            nombre: findCustomer?.Value2 ?? "",
            apellido: findCustomer?.Value3 ?? "",
            tipoDocId: findCustomer?.Value4,
            nroDoc: findCustomer?.Value5 ?? "",
            direccion: findCustomer?.Value6 ?? "",
            celular: findCustomer?.Value7 ?? "",
            telFijo: findCustomer?.Value8 ?? "",
            email: findCustomer?.Value9 ?? "",
            fNacimiento: fecha ?? "",
        });
    }

    const onSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        action = ev.target.value
        console.log(action === "1" ? "insert" : "update");
    }

    //find
    useEffect(() => {
        const wsCustomers: WebSocket = new WebSocket(`${url}/customers`);
        const wsDocument: WebSocket = new WebSocket(`${url}/document`);
        wsCustomers.onopen = () => {
            message.Message = "find";
            wsCustomers.send(JSON.stringify(message));
        };
        wsDocument.onopen = () => {
            message.Message = "find";
            wsDocument.send(JSON.stringify(message));
        };
        wsCustomers.onmessage = (ev: MessageEvent) => {
            const response = JSON.parse(ev.data) as MessageSocket<GenericView>;
            if (response.Status === 401) {
                window.location.href = "/login";
            } else {
                let array = response.Data;
                for (let i = 0; i < array.length; i++) {
                    let fecha = new Date(array[i].Value10).toLocaleString().toString();
                    for (let x = 0; x < fecha.length; x++) {
                        if (fecha[x] === ",") {
                            fecha = fecha.substring(0, x);
                            break;
                        }
                    }
                    array[i].Value10 = fecha;
                }
                setCustomers(response.Data);
            }
        };
        console.log(action);
        wsDocument.onmessage = (ev: MessageEvent) => {
            const response = JSON.parse(ev.data) as MessageSocket<GenericView>;
            if (response.Status === 401) {
                window.location.href = "/login"
            } else {
                setDocument(response.Data);
                FormData.tipoDocId = response.Data?.[0].Value1;
            }
        };
    }, []);

    const onClickDelete = (ev: MouseEvent<HTMLButtonElement>) => {
        client.Id = ev.currentTarget.value;
        client.FNacimiento = "2030-11-12";
        console.log(client.FNacimiento);
        const message = client.Assign("Delete", client);
        client.Crud(message);
    }

    const onSubmitCustomer = (ev: ChangeEvent<HTMLFormElement>) => {
        ev.preventDefault();
        client.Id = FormData.id;
        client.Nombre = FormData.nombre;
        client.Apellido = FormData.apellido;
        client.TipoDocId = FormData.tipoDocId;
        client.NroDoc = FormData.nroDoc;
        client.Direccion = FormData.direccion;
        client.Celular = FormData.celular;
        client.TelFijo = FormData.telFijo;
        console.log(FormData.telFijo);
        client.Email = FormData.email;
        client.FNacimiento = FormData.fNacimiento;
        const message = client.Assign(action === "1" ? "insert" : "update", client);
        client.Crud(message);
    }

    const handleChange = (ev: ChangeEvent<any>) => {
        const {name, value} = ev.target;
        setFormData({...FormData, [name]: value})
    }

    return (
        <>
            {
                user == null ? window.location.href = "/login" :
                    <>
                        <NavBar/>
                        <div className="mainTitleText">
                            <h1>Clientes</h1>
                            <p>Administración de clientes</p>
                        </div>
                        <div className="container text-center">
                            <form onSubmit={onSubmitCustomer}>
                                <div className="backGroundForm">
                                    <div className="row row-cols-2 row-cols-lg-5 g-2">
                                        <div className="form-floating">
                                            <input name="id" type="text" className="form-control" value={FormData.id}
                                                   id="txtId"
                                                   placeholder=" " disabled/>
                                            <label className="form-label" htmlFor="txtId">Código</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="nombre" type="text" className="form-control"
                                                   value={FormData.nombre}
                                                   id="txtNombre" onChange={handleChange} placeholder=" " required/>
                                            <label className="" htmlFor="txtNombre">Nombre</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="apellido" type="text" className="form-control"
                                                   value={FormData.apellido}
                                                   id="txtApellido" onChange={handleChange} placeholder=" " required/>
                                            <label htmlFor="txtApellido">Apellido</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <select name="tipoDocId" className="form-control" id="listTipoDocId"
                                                    placeholder=" " onChange={handleChange}
                                                    required>
                                                {document?.map((dt) => (
                                                    <option value={dt.Value1} key={dt.Value1}>
                                                        {dt.Value2}
                                                    </option>
                                                ))}
                                            </select>
                                            <label>Tipo de Documento</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="nroDoc" type="text" className="form-control"
                                                   value={FormData.nroDoc}
                                                   id="txtNroDoc" onChange={handleChange} placeholder=" " required/>
                                            <label className="" htmlFor="txtNroDoc">N° documento</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="direccion" type="text" className="form-control"
                                                   value={FormData.direccion}
                                                   id="txtDireccion" onChange={handleChange} placeholder=" " required/>
                                            <label className="" htmlFor="txtDireccion">Dirección</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="celular" type="text" className="form-control"
                                                   value={FormData.celular}
                                                   id="txtCelular" onChange={handleChange} placeholder=" " required/>
                                            <label className="" htmlFor="txtCelular">Celular</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="telFijo" onChange={handleChange} type="text"
                                                   className="form-control" value={FormData.telFijo}
                                                   id="txtTelfFijo" placeholder=" " required/>
                                            <label className="form-label" htmlFor="txtTelfFijo">Telefono Fijo</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="email" onChange={handleChange} type="text"
                                                   className="form-control" value={FormData.email}
                                                   id="txtEmail" placeholder=" " required/>
                                            <label className="form-label" htmlFor="txtEmail">Email</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3 splitComponents">
                                            <input name="fNacimiento" onChange={handleChange} type="date"
                                                   className="form-control" value={FormData.fNacimiento}
                                                   id="dtFNacimiento"/>
                                            <label htmlFor="dtFNacimiento" className="form-label">Fecha de
                                                Nacimiento</label>
                                        </div>
                                        <div className="form-floating mb-2 col-md-3">
                                            <select name="accion" className="form-control" id="listAccion"
                                                    placeholder=""
                                                    onChange={onSelect}
                                                    required>
                                                <option value="1">
                                                    Agregar Cliente
                                                </option>
                                                <option value="2">
                                                    Modificar Cliente
                                                </option>
                                            </select>
                                            <label htmlFor="txtApellido">Acción a realizar</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary styleButtonAction" value="Insert" type="submit"
                                            id="btnAccion">Registrar
                                    </button>
                                </div>
                            </form>
                        </div>
                        <form>
                            <div className="container text-center">
                                <div className="row row-cols-2 row-cols-lg-5 g-2">
                                    <div className="form-floating mb-2 col-md-3 paddingTopFind">
                                        <select name="param" className="form-control" id="listFind" placeholder=" "
                                                required>
                                            <option value="Id">
                                                código
                                            </option>
                                            <option value="Nombre">
                                                nombre
                                            </option>
                                            <option value="Apellido">
                                                apellido
                                            </option>
                                            <option value="DesDocument">
                                                tipo de Documento
                                            </option>
                                            <option value="NroDoc">
                                                n° Documento
                                            </option>
                                            <option value="Direccion">
                                                dirección
                                            </option>
                                            <option value="Celular">
                                                celular
                                            </option>
                                            <option value="TelfFijo">
                                                telefono Fijo
                                            </option>
                                            <option value="Email">
                                                email
                                            </option>
                                            <option value="F_NACIMIENTO">
                                                fecha de Nacimiento
                                            </option>
                                        </select>
                                        <label htmlFor="listFind">Buscar por</label>
                                    </div>
                                    <div className="form-floating mb-2 col-md-3 paddingTopFind">
                                        <input type="text" className="form-control" id="txtBuscar" name="data"
                                               placeholder=" "
                                               required/>
                                        <label className="form-label" htmlFor="txtTelfFijo" id="lblFind">Ingrese el
                                            Código</label>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary styleButtonAction" type="button"
                                                id="btnFind">Buscar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <table className="table table-striped-columns">
                            <thead className="table-light">
                            <tr>
                                <th>
                                    Código
                                </th>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Apellido
                                </th>
                                <th>
                                    Tipo de Documento
                                </th>
                                <th>
                                    N° Documento
                                </th>
                                <th>
                                    Dirección
                                </th>
                                <th>
                                    Celular
                                </th>
                                <th>
                                    Telefono Fijo
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Fecha de Nacimiento
                                </th>
                                <th className="text-center">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {customers?.map(e => (
                                <tr className="backGroundTable" key={e.Value1}>
                                    <td>{e.Value1}</td>
                                    <td>{e.Value2}</td>
                                    <td>{e.Value3}</td>
                                    <td>{e.Value4}</td>
                                    <td>{e.Value5}</td>
                                    <td>{e.Value6}</td>
                                    <td>{e.Value7}</td>
                                    <td>{e.Value8}</td>
                                    <td>{e.Value9}</td>
                                    <td>{e.Value10}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-primary btnAlign" type="button"
                                                onClick={onClickModifed} value={e.Value1}>
                                            Modificar
                                        </button>

                                        <button className="btn btn-outline-danger btnAlign" value={e.Value1}
                                                onClick={onClickDelete}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
            }
        </>
    );
}

export default memo(Customers);