import styled from "styled-components"
import { ClientForm } from './components/ClientComponents/ClientForm'
import { NavBar } from './components/NavBar'
import { ClienSection } from "./components/ClientComponents/ClientSection"

export default function App() {

  return (
    <AppStyle className="App">
      <NavBar />
      <DashboardContainer>
        <ClienSection />
      </DashboardContainer>
    </AppStyle>
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