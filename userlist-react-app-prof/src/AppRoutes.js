import { Route, Routes } from 'react-router-dom';
import UserList from './components/user/UserList';
import UserForm from './components/user/UserForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/user/new" element={<UserForm />} />
      <Route path="/user/:id" element={<UserForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;