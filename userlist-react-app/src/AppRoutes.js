import { Route, Routes } from "react-router-dom";
import UserList from "./views/users/UserList";
import UserForm from "./views/users/UserForm";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/user/new" element={<UserForm />} />
      <Route path="/user/:id" element={<UserForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
