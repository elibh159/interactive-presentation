import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { store } from "../src/store";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard";
import Attendee from "./components/attendee/Attendee";
import Presentation from "./components/presentation/Presentation";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendee/:login_code" element={<Attendee />} />
            <Route path="/presentation/:login_code" element={<Presentation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
