import { BrowserRouter } from "react-router-dom";
import Contador from "./components/Contador";
import UserList from "./views/users/UserList";
import AppRoutes from "./AppRoutes";
import Header from "./views/Header";

function App() {
  
  return(
    <>
      <BrowserRouter>
        <Header />
        <div className="container mt-4">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;