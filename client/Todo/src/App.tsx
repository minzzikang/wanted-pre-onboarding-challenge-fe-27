import { BrowserRouter } from "react-router-dom";
import HomeRouter from "./routers/homeRouter";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <HomeRouter />
    </BrowserRouter>
  );
}

export default App;
