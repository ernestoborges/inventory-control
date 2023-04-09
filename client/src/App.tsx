import styled from "styled-components"
import { NavBar } from './components/NavBar'
import { ClienSection } from "./components/ClientComponents/ClientSection"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientForm } from "./components/ClientComponents/ClientForm";

export default function App() {

  return (
    <Router>
      <AppStyle className="App">
        <NavBar />
        <DashboardContainer>
          <Routes>
            <Route path="/" element={<div>Bem vindo!</div>} />
            <Route path="/cliente" element={<ClienSection />} />
            <Route path="/cliente/registro" element={<ClientForm />} />
          </Routes>
        </DashboardContainer>
      </AppStyle>
    </Router>
  )
}


const AppStyle = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
`

const DashboardContainer = styled.div`
  flex-grow: 1;
  border: 0.1rem solid var(--black-200);
`