import styled from "styled-components"

export function NavBar() {
    return (
        <>
            <Container>
                <Nav>
                    <ul>
                        <li>
                            Cliente
                        </li>
                        <li>
                            Estoque
                        </li>
                        <li>
                            Produtos
                        </li>
                    </ul>
                </Nav>
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 1rem;
    background-color: var(--black-200);
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > ul {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
`