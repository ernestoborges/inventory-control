import './App.css'
import styled from "styled-components"
import { ClientForm } from './components/ClientForm'

export default function App() {

  return (
    <div className="App">
      <Container>
        <ClientForm />
      </Container>
    </div>
  )
}

const Container = styled.div`

`