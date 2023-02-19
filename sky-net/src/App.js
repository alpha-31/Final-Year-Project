import "./App.css";
import "./Components/WelcomeSite/styles/index.css";
import "antd/dist/antd.min.css";
import WelcomeSite from "./Components/WelcomeSite";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Components/MainSite/scenes/signin";
import SignUp from "./Components/MainSite/scenes/signup";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useMode } from "./Components/MainSite/theme/theme";
import { ColorModeContext } from "./Components/MainSite/theme/theme";
import Account from "./Components/MainSite/scenes/account";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<WelcomeSite />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/account/*" element={<Account />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
