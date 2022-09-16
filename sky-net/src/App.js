import './App.css';
import 'antd/dist/antd.min.css'
import { AccountBox } from "./Components/accountBox";

import styled from 'styled-components';
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
function App() {
  return (
   <>
   <AppContainer><AccountBox/></AppContainer>
   </>
  );
}

export default App;
