import React, {ChangeEvent, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css.map';
import '../../style/customers/customersStyle.css';
import {NavBar} from "../nav/NavBar";
import {User} from "../../model/user/dto/User";
import {MessageSocket} from "../../model/message/MessageSocket";
import {GenericView} from "../../model/viewData/dto/GenericView";

export const Customers = (): JSX.Element => {
    const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_SESSION as string) as string) as User | null;
    const url = process.env.REACT_APP_URL_API;
    const message = new MessageSocket<GenericView>();
    message.Token = user?.Token as string;

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

    //find documents
    useEffect(() => {
        const wsDocument = new WebSocket(`${url}/document`);
        wsDocument.onopen = (ev: Event) => {
            message.Message = "find";
            wsDocument.send(JSON.stringify(message));
        };
        wsDocument.onmessage = (ev: MessageEvent) => {
            const response = JSON.parse(ev.data) as MessageSocket<GenericView>;
            if (response.Status === 401) {
                window.location.href = "/login"
            } else {
                setDocument(response.Data);
            }
        };

    }, []);

    console.log(FormData.tipoDocId);

    //Crud customers
    useEffect(() => {
        const wsCustomers = new WebSocket(`${url}/customers`);
        wsCustomers.onopen = () => {
            message.Message = "find";
            wsCustomers.send(JSON.stringify(message));
        }
        wsCustomers.onmessage = (ev: MessageEvent) => {
            const response = JSON.parse(ev.data) as MessageSocket<GenericView>;
            if (response.Status === 401) {
                window.location.href = "/login"
            } else {
                setCustomers(response.Data);
            }
        }
    }, []);

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = ev.target;
        setFormData({...FormData, [name]: value})
    }

    const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = ev.target;
        setFormData({...FormData, [name]: value})
    }

    const iso8601Regex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

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
                            <form>
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
                                                    placeholder=" " onSelect={handleSelect} required>
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
                                                    placeholder=" "
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
                                        <button className="btn btn-primary styleButtonAction" type="submit"
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
                                    <td>{typeof e.Value10 === 'string' && iso8601Regex.test(e.Value10) ? new Date(e.Value10).toLocaleString().toString().substring(0, 10) : ''}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-primary btnAlign">Modificar</button>
                                        <form>
                                            <button className="btn btn-outline-danger btnAlign"
                                                    value={e.Value1}>
                                                Eliminar
                                            </button>
                                        </form>
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