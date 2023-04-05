import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export function ClienSection() {

    const [clientData, setClientData] = useState([])

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
                    <h2>Lista de clientes</h2>
                    <div>
                        <Button>Novo Cliente</Button>
                        <SearchBar
                            placeholder="Buscar cliente"
                        />
                    </div>
                </Header>
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
                        <ul>
                            {
                                clientData.map(client =>
                                    <ListItem>
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
    flex-direction: column;

    & > div {
        display: flex;
        justify-content: space-between;
    }
`

const Button = styled.button`
    padding: 1rem;
    border: 0;
    font-size: 1.2rem;
    border-radius: 0.4rem;
    background-color: var(--black-200)
`

const SearchBar = styled.input`
    padding: 1rem;
    width: 100%;
    max-width: 40rem;
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
