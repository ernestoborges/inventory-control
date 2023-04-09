import axios from "axios";
import { ErrorMessage, Field, Formik, FormikHelpers, FormikState } from "formik";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Client {
    code: string
    name: string
    cpf: string
    address: {
        street: string
        district: string
        number: string,
        city: string
        state: string
        complement: string
    },
    phone: string
    celphone: string
    entity: string
}

const initialValues: Client = {
    code: "",
    name: "",
    cpf: "",
    address: {
        street: "",
        district: "",
        number: "",
        city: "",
        state: "",
        complement: ""
    },
    phone: "",
    celphone: "",
    entity: "fisica"
}

export function ClientForm() {

    const [clientCodes, setClientCodes] = useState<string[]>([]);

    const handleValidate = (values: Client) => {
        const errors: any = {};
        const addressErrors: any = {};

        // code
        if (!values.code) {
            errors.code = "Campo Obrigatório";
        } else if (clientCodes.includes(values.code)) {
            errors.code = "Codigo já cadastrado"
        }

        // name
        if (!values.name) {
            errors.name = 'Campo Obrigatório';
        }

        // cpf
        if (!values.cpf) {
            errors.cpf = 'Campo Obrigatório';
        } else if (
            !/^\d+$/.test(values.cpf)
        ) {
            errors.cpf = "Apenas números";
        } else if (values.cpf.length !== 11) {
            errors.cpf = "Mínimo 11 dígitos";
        }

        // phone
        if (!values.phone && !values.celphone) {
            errors.phone = "Telefone ou Celular necesário"
        } else if (
            values.phone &&
            /^\d$/.test(values.phone)
        ) {
            errors.cpf = "Apenas números";
        } else if (values.phone && values.phone.length !== 10) {
            errors.phone = "Mínimo 10 dígitos"
        }

        // celphone
        if (!values.phone && !values.celphone) {
            errors.celphone = "Telefone ou Celular necesário"
        } else if (
            values.celphone &&
            /^\d$/.test(values.celphone)
        ) {
            errors.celphone = "Apenas números";
        } else if (values.celphone && values.celphone.length !== 11) {
            errors.celphone = "Mínimo 11 dígitos"
        }

        // street
        if (!values.address.street) {
            addressErrors.street = 'Campo Obrigatório';
        }

        // number
        if (!values.address.number) {
            addressErrors.number = 'Campo Obrigatório';
        }

        // complement
        if (!values.address.complement) {
            addressErrors.complement = 'Campo Obrigatório';
        }

        // district
        if (!values.address.district) {
            addressErrors.district = 'Campo Obrigatório';
        }

        // city
        if (!values.address.city) {
            addressErrors.city = 'Campo Obrigatório';
        }

        // state
        if (!values.address.state) {
            addressErrors.state = 'Campo Obrigatório';
        }

        return {
            ...errors,
            address: addressErrors
        };
    }

    const handleFormSubmit = (values: Client, { resetForm }: FormikHelpers<Client>) => {
        console.log("submiting")
        console.log(JSON.stringify(values))
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

    const checkCode = () => {
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

    useEffect(() => {
        checkCode()
    }, [])

    return (
        <>
            <Container>
                <Formik
                    initialValues={initialValues}
                    validate={()=>({})}
                    onSubmit={handleFormSubmit}
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
                                        <ErrorMessage name="code" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="name" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="cpf" component="span" />
                                    </div>
                                    <Field
                                        type="text"
                                        name="cpf"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cpf}
                                        maxLength={11}
                                    />
                                </InputLabel>
                                <InputRadioLabel>
                                    <div>
                                        <span>Pessoa</span>
                                        <span>
                                            {errors.entity && touched.entity}
                                        </span>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="entity"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value="fisica"
                                                checked={values.entity === "fisica"}
                                            />
                                            <span>
                                                Física
                                            </span>
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="entity"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value="juridica"
                                                checked={values.entity === "juridica"}
                                            />
                                            <span>
                                                Jurídica
                                            </span>
                                        </label>
                                    </div>
                                </InputRadioLabel>
                                <InputLabel>
                                    <div>
                                        <span>Telefone</span>
                                        <ErrorMessage name="phone" component="span" />
                                    </div>
                                    <Field
                                        type="text"
                                        name="phone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.phone}
                                        maxLength={10}
                                    />
                                </InputLabel>
                                <InputLabel>
                                    <div>
                                        <span>Celular</span>
                                        <ErrorMessage name="celphone" component="span" />
                                    </div>
                                    <Field
                                        type="text"
                                        name="celphone"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.celphone}
                                        maxLength={11}
                                    />
                                </InputLabel>
                                <InputLabel>
                                    <div>
                                        <span>Rua</span>
                                        <ErrorMessage name="address.street" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="address.number" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="address.complement" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="address.district" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="address.city" component="span" />
                                    </div>
                                    <Field
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
                                        <ErrorMessage name="address.state" component="span" />
                                    </div>
                                    <Field
                                        type="text"
                                        name="address.state"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address.state}
                                    />
                                </InputLabel>
                                <button type="submit" onClick={()=>handleFormSubmit}>
                                    Submit
                                </button>
                            </InputsContainer>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    )
}

const Container = styled.div`
    display: flex;
`

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    & > input[type="number"] {
        -moz-appearance: textfield;
    }

    & > input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;  
        margin: 0;
    }
    
    & > input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;  
        margin: 0;
    }
`

const InputRadioLabel = styled.div`
    & > div {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 1rem;

    }
    & label {
        cursor: pointer;
    }
    & input {
        cursor: pointer;
    }
    
    `