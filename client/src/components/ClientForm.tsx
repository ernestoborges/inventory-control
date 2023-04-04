import axios from "axios";
import { Formik, FormikHelpers, FormikState } from "formik";
import { useState } from "react";
import styled from "styled-components";

interface Client {
    code: string
    name: string
    cpf: number | undefined,
    address: {
        street: string
        district: string
        number: number | undefined,
        city: string
        state: string
        complement: string
    },
    phone: number | undefined,
    entity: string
}

const initialValues: Client = {
    code: "",
    name: "",
    cpf: undefined,
    address: {
        street: "",
        district: "",
        number: undefined,
        city: "",
        state: "",
        complement: ""
    },
    phone: undefined,
    entity: ""
}



export function ClientForm() {

    const [clientCodes, setClientCodes] = useState([]);

    const handleSubmit = (values: Client, { resetForm }: FormikHelpers<Client>) => {
        axios
            .post("http://localhost:3000/add/clientes", values)
            .then((res) => {
                console.log(res.data);
                resetForm();
            })
            .catch((err) => {
                console.error(err);
                alert(err.response.data.message);
            });
    };

    function checkCode() {
        axios
            .get("http://localhost:3000/clientes/code")
            .then((res) => {
                setClientCodes(res.data)
            })
            .catch((err) => {
                console.error(err);
                alert(err.response.data.message);
            });
    }

    useState(() => {
        checkCode()
    }, [])

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <InputsContainer>
                            <InputLabel>
                                <div>
                                    <span>Código</span>
                                    <span>
                                        {errors.name && touched.name}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="code"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.code}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Nome</span>
                                    <span>
                                        {errors.name && touched.name}

                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>CPF</span>
                                    <span>
                                        {errors.cpf && touched.cpf}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="cpf"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.cpf}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Telefone</span>
                                    <span>
                                        {errors.phone && touched.phone}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Pessoa (Física/Jurídica)</span>
                                    <span>
                                        {errors.entity && touched.entity}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="entity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.entity}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Rua</span>
                                    <span>
                                        {errors.address?.street && touched.address?.street}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.street"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.street}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Número</span>
                                    <span>
                                        {errors.address?.number && touched.address?.number}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.number"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.number}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Complemento</span>
                                    <span>
                                        {errors.address?.complement && touched.address?.complement}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.complement"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.complement}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Bairro</span>
                                    <span>
                                        {errors.address?.district && touched.address?.district}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.district"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.district}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Cidade</span>
                                    <span>
                                        {errors.address?.city && touched.address?.city}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.city"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.city}
                                />
                            </InputLabel>
                            <InputLabel>
                                <div>
                                    <span>Estado</span>
                                    <span>
                                        {errors.address?.state && touched.address?.state}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    name="address.state"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address.state}
                                />
                            </InputLabel>
                            <button type="submit">
                                Submit
                            </button>
                        </InputsContainer>
                    </form>
                )}
            </Formik>
        </>
    )
}

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`