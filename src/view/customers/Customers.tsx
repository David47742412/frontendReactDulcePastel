import React, {ChangeEvent, useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/customers/customersStyle.css';
import {NavBar} from "../nav/NavBar";
import {Login, UserContext} from "../login/Login";

export interface isHidden {
    hidden: boolean;
}

export const Customers = (): JSX.Element => {
    
    const context = useContext(UserContext);

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
        token: ""
    });
    
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = ev.target;
        setFormData({...FormData, [name]: value})
    }
    
    const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = ev.target;
        setFormData({...FormData, [name]: value})
        console.log(value);
    }
    if (context == null) return <Login />
    
    return (
        <div>
            <NavBar />
            <div className="mainTitleText">
                <h1>Clientes</h1>
                <p>Administración de clientes</p>
            </div>
            <div className="container text-center">
                <form>
                    <div className="backGroundForm">
                        <div className="row row-cols-2 row-cols-lg-5 g-2">
                            <div className="form-floating">
                                <input name="id" type="text" className="form-control" value={FormData.id} id="txtId"
                                       placeholder=" " disabled />
                                <label className="form-label" htmlFor="txtId">Código</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="nombre" type="text" className="form-control" value={FormData.nombre}
                                       id="txtNombre" onChange={handleChange} placeholder=" " required />
                                    <label className="" htmlFor="txtNombre">Nombre</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="apellido" type="text" className="form-control" value={FormData.apellido}
                                       id="txtApellido" onChange={handleChange} placeholder=" " required />
                                    <label htmlFor="txtApellido">Apellido</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <select name="tipoDocId" className="form-control" id="listTipoDocId"
                                        placeholder=" " onSelect={handleSelect}  required>
                                    <option value={FormData.tipoDocId}>
                                        @items.Value2
                                    </option>
                                    <option value="@items.Value1">
                                        @items.Value3
                                    </option>
                                </select>
                                <label>Tipo de Documento</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="nroDoc" type="text" className="form-control" value={FormData.nroDoc}
                                       id="txtNroDoc" onChange={handleChange} placeholder=" " required />
                                    <label className="" htmlFor="txtNroDoc">N° documento</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="direccion" type="text" className="form-control" value={FormData.direccion}
                                       id="txtDireccion" onChange={handleChange} placeholder=" " required />
                                    <label className="" htmlFor="txtDireccion">Dirección</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="celular" type="text" className="form-control" value={FormData.celular}
                                       id="txtCelular" onChange={handleChange} placeholder=" " required />
                                    <label className="" htmlFor="txtCelular">Celular</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="telFijo" onChange={handleChange} type="text" className="form-control" value={FormData.telFijo}
                                       id="txtTelfFijo"  placeholder=" " required />
                                    <label className="form-label" htmlFor="txtTelfFijo">Telefono Fijo</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="email" onChange={handleChange} type="text" className="form-control" value={FormData.email}
                                       id="txtEmail" placeholder=" " required />
                                    <label className="form-label" htmlFor="txtEmail">Email</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <input name="fNacimiento" onChange={handleChange} type="date" className="form-control" value={FormData.fNacimiento}
                                       id="dtFNacimiento"/>
                                <label htmlFor="dtFNacimiento" className="form-label">Fecha de Nacimiento</label>
                            </div>
                            <div className="form-floating mb-2 col-md-3 splitComponents">
                                <select name="accion" className="form-control" id="listAccion" placeholder=" "
                                        required>
                                    <option value="1">
                                        Agregar Cliente
                                    </option>
                                    <option value="2">
                                        Modificar Cliente
                                    </option>
                                    <option value="3">
                                        Eliminar Cliente
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
                        <div className="form-floating mb-2 col-md-3 paddingTopFind"
                             >
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
                            <input type="text" className="form-control" id="txtBuscar" name="data" placeholder=" "
                                   required />
                                <label className="form-label" htmlFor="txtTelfFijo" id="lblFind">Ingrese el
                                    Código</label>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary styleButtonAction" type="submit" id="btnFind">Buscar
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
                </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <td>@item.Value1</td>
                        <td>@item.Value2</td>
                        <td>@item.Value3</td>
                        <td>@item.Value4</td>
                        <td>@item.Value5</td>
                        <td>@item.Value6</td>
                        <td>@item.Value7</td>
                        <td>@item.Value8</td>
                        <td>@item.Value9</td>
                        <td>@fecha</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}