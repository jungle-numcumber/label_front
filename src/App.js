import './App.css';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp.js';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';

const Userpage = lazy(() => import('./components/User/User.js'));
const Library = lazy(() => import('./components/Library/Library.js'));
const PersonalReading = lazy(() => import('./components/PersonalReading/PersonalReading.js'));
const Footer = lazy(() => import('./components/Footer/Footer.js'));

export default function App() {
  const location = useLocation();
  const site = location.pathname;

  return <>{site === '/personalreading' ? <AppColor></AppColor> : <AppNonColor></AppNonColor>}</>;
}

function AppColor(props) {
  const [mode, setMode] = useState(true);

  return (
    <div className="AppColor">
      <Nav mode={mode} setMode={setMode}></Nav>

      <Suspense>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/library/*" element={<Library></Library>}></Route>
          <Route
            path="/personalreading/*"
            element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}
          ></Route>
          <Route path="/userpage/*" element={<Userpage />}></Route>
        </Routes>

        <Footer></Footer>
      </Suspense>
    </div>
  );
}

function AppNonColor(props) {
  const [mode, setMode] = useState(true);

  return (
    <div className="App">
      <Nav mode={mode} setMode={setMode}></Nav>

      <Suspense>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/library/*" element={<Library></Library>}></Route>
          <Route
            path="/personalreading/*"
            element={<PersonalReading mode={mode} setMode={setMode}></PersonalReading>}
          ></Route>
          <Route path="/userpage/*" element={<Userpage />}></Route>
        </Routes>

        <Footer></Footer>
      </Suspense>
    </div>
  );
}
