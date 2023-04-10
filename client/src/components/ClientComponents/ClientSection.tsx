import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

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
    [key: string]: any;
}

function filterTranslation(string: string) {
    switch (string) {
        case "name": return "nome";
        case "cpf": return "cpf";
        case "code": return "código";
        case "phone": return "telefone";
        case "celphone": return "celular";
        case "city": return "cidade";
        default: break;
    }
}

export function ClienSection() {

    const [clientData, setClientData] = useState<Client[]>()
    const [clientFilter, setClientFilter] = useState("");
    const [filterOption, setFilterOption] = useState("name");
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get("http://localhost:3000/clientes")
            .then((res) => {
                setClientData(res.data)
            })
            .catch((err) => {
                console.error(err);
                alert(err.response.data.message);
            });
    }, [])


    return (
        <>
            <ContainerSection>
                <Header>
                    <div>
                        <h2>Lista de clientes</h2>
                        <Button to="/cliente/registro">Novo Cliente</Button>
                    </div>
                    <SearchBarContainer>
                        <SearchBar
                            placeholder={`Buscar ${filterTranslation(filterOption)}`}
                            onChange={(e) => setClientFilter(e.target.value)}
                            value={clientFilter}
                        />
                        <AdvancedSearch>
                            <label>
                                <span>
                                    Filtrar por:
                                </span>
                                <select name="filter" value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                                    <option value="name">Nome</option>
                                    <option value="code">Código</option>
                                    <option value="cpf">CPF</option>
                                    <option value="phone">Telefone</option>
                                    <option value="celphone">Celular</option>
                                    <option value="address.city">Cidade</option>
                                </select>
                            </label>

                        </AdvancedSearch>
                    </SearchBarContainer>
                </Header>
                <ListController>
                    <label>
                        <span>
                            Por página:
                        </span>
                        <select value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                            {
                                Array.from({ length: 30 }, (_, index) => index + 1)
                                    .map((value) => (
                                        <option value={value}>{value}</option>
                                    ))
                            }
                        </select>
                    </label>
                    <button onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage(currentPage - 1)
                        }
                    }}>anterior</button>
                    <label>
                        <span>Página:</span>
                        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}>
                            {
                                Array.from({ length: clientData ? Math.ceil(clientData.length / itensPerPage) : 1 }, (_, index) => index + 1)
                                    .map((value) => (
                                        <option value={value}>{value}</option>
                                    ))
                            }
                        </select>
                    </label>
                    <label>
                        <span>de:</span>
                        <output>{clientData && Math.ceil(clientData.length / itensPerPage)}</output>
                    </label>
                    <button onClick={() => {
                        if (
                            clientData &&
                            currentPage < Math.ceil(clientData.length / itensPerPage)
                        ) {
                            setCurrentPage(currentPage + 1)
                        }
                    }}>proximo</button>
                </ListController>
                <ListContainer>
                    <List>
                        <ListHeader as="div">
                            <div className="code">Código</div>
                            <div className="name">Nome</div>
                            <div className="cpf">CPF</div>
                            <div className="entity">Entidade</div>
                            <div className="phone">Telefone</div>
                            <div className="entity">Cidade</div>
                        </ListHeader>
                        <HorizontalRule />
                        {
                            !clientData
                                ? "Loading..."
                                : <ul>
                                    {
                                        clientData
                                            .filter(client => client[filterOption].toString().toLowerCase().includes(clientFilter.toLowerCase()))
                                            // .filter((client, index) =>
                                            //     index + 1 >= Math.floor(clientData.length / itensPerPage) * currentPage &&
                                            //     index + 1 <= Math.floor(clientData.length / itensPerPage) * currentPage + 4
                                            //     )
                                            .filter((client, index) =>
                                                index + 1 >= currentPage &&
                                                index + 1 <= currentPage + itensPerPage - 1
                                                )
                                            .map(client =>
                                                <ListItem key={Number(client.code)}>
                                                    <div className="code">{client.code}</div>
                                                    <div className="name">{client.name}</div>
                                                    <div className="cpf">{client.cpf}</div>
                                                    <div className="entity">{client.entity}</div>
                                                    <div className="phone">{client.celphone ? client.celphone : client.phone}</div>
                                                    <div className="entity">{client.address.city}</div>
                                                </ListItem>
                                            )
                                    }
                                </ul>
                        }
                    </List>
                </ListContainer>
            </ContainerSection>
        </>
    )
}

const ContainerSection = styled.section`
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 4rem;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    & > div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 1rem;
    }
`

const Button = styled(Link)`
    padding: 1rem;
    border: 0;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    background-color: var(--black-200);
    cursor: pointer;
    border: 0.1rem solid transparent;

    &:hover {
        border: 0.1rem solid var(--white);
    }
`

const ListController = styled.div`

`

const SearchBarContainer = styled.div`
    width: 100%;
    max-width: 40rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const SearchBar = styled.input`
    padding: 1rem;
    width: 100%;
    max-width: 40rem;
`

const AdvancedSearch = styled.div`
    & > label {
        display: flex;
        gap: 1rem;
    }
`

const ListContainer = styled.div`

`

const List = styled.div`
    & > ul {
        display: flex;
        flex-direction: column;
        background-color: var(--gray);
        gap: 0.1rem;
    }
`

const ListItem = styled.li`
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr 2fr;
    column-gap: 0.1rem;
    background-color: var(--black-100);
    padding: 1rem 0;

    & > div {
        padding: 0 0 0 1rem;
        overflow: hidden;
        white-space: nowrap;
    }

    & > .name {
        min-width: 25rem;
    }
`

const ListHeader = styled(ListItem)`
    font-weight: bold;
    background-color: var(--white);
    padding: 0;

    & > div {
        background-color: var(--black-100); 
    }
`

const HorizontalRule = styled.hr`
    border: 0.1rem 0 0 0;
    height: 0;
    width: 100%;
    margin: 1rem 0 0;
`
