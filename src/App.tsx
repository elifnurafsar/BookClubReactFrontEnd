
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import CreateBook from './Components/AdminComponents/CreateBook';
import Home from "./Components/Home";
import AddPublisher from "./Components/AdminComponents/PublisherComponent";
import CreateAuthor from "./Components/AdminComponents/CreateAuthor";
import Author from "./Components/BookComponents/Author";
import Publishers from "./Components/BookComponents/Publisher";
import Shop from "./Components/BookComponents/Shop";
import SetDiscount from "./Components/AdminComponents/SetDiscount";
import MyBasket from "./Components/BookComponents/MyBasket";
import Authors from "./Components/AdminComponents/Authors";
import PublishersAdmin from "./Components/AdminComponents/Publishers";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import { useAuth } from "./Components/Navbar/UseAuth";
import NavbarUserAuthenticaed from "./Components/Navbar/NavbarUserAuthenticated";
import NavbarAdmin from "./Components/Navbar/NavbarAdmin";
import Orders from "./Components/AdminComponents/Orders";
import MyProfile from "./Components/UserComponents/MyProfile";
import NotFound from "./Components/NotFound";
import UpdateOrDeleteBook from "./Components/AdminComponents/UpdateOrDeleteBook";

//Welcome to your favorite Book Club!
function App() {
  const { auth, user } = useAuth()
  console.log("Auth: ", auth, " Username: ", user)
  return (
    <div className="App">
      <BrowserRouter>
        {auth === 2 ? <NavbarAdmin /> : (auth === 1 ? <NavbarUserAuthenticaed /> : <Navbar />) }
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path="/addPublisher" element={<AddPublisher/>} />
          <Route path="/publishers" element={<Publishers/>} />
          <Route path="/createBook" element={<CreateBook/>} />
          <Route path="/addAuthor" element={<CreateAuthor/>} />
          <Route path="/authors" element={<Author/>} />
          <Route path="/updateOrDelete" element={<UpdateOrDeleteBook/>} />
          <Route path="/discount" element={<SetDiscount/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/authorsAdmin" element={<Authors/>} />
          <Route path="/publishersAdmin" element={<PublishersAdmin/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/myBasket" element={<MyBasket/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<MyProfile/>} />
          <Route path="/*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
