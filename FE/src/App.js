import {BrowserRouter , Routes , Route} from "react-router-dom";
import Home from "./views/pages/home";
import Test from "./views/pages/test";
import Admin from "./views/pages/admin";
import User from "./views/pages/user";
import Greet from "./views/pages/greet";
import Verification from "./views/pages/verification";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/admin" element={<Admin /> } />
        <Route path="/test" element={<Test /> } />
        <Route path="/user/:key" element={<User /> } />
        <Route path="/greet" element={<Greet/>} />
        <Route path="/verification" element={<Verification/>} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
