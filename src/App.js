import Home from './pages/Home';
// import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Register, Contact, Error, ProtectedRoute } from './pages';
// import Wrapper from './component/Wrapper';
// import './assets/dist/style.css';
import {
  AddJob,
  AllJob,
  Profile,
  ShareLayout,
  Stats,
} from './pages/dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <ShareLayout />
          </ProtectedRoute>
        }>
          <Route
            // @ts-ignore
            index path="/" element={<Stats />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="all-jobs" element={<AllJob />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path='/register' element={<Register />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>
        <Route path='/error' element={<Error />} ></Route>
        <Route path='/home' element={<Home />} ></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
