import { Route, Routes } from "react-router-dom";
import "./App.css";
import TopNav from "./Components/TopNav";
import Main from "./pages/Main";

function App() {
    return (
        <div className="App">
            <TopNav />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;
