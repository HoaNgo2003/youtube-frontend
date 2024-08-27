
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/admin/Pages/Login';
import Register from './components/admin/Pages/Register';
import HomePage from './components/admin/Pages/HomePage';
import VideoList from './components/admin/Pages/VideoList';
import AddVideoForm from './components/admin/Pages/AddVideoForm';
import EditVideoForm from './components/admin/Pages/EditVideoForm';
import Views from './components/admin/Pages/Views';
import HomeContent from './components/admin/Pages/HomeContent';
import PrivateRoute from './components/admin/Pages/PrivateRoute';
import PublicRoute from './components/admin/Pages/PublicRoute';
import LayoutDefault from './components/admin/Pages/LayoutDefault';
import 'react-toastify/dist/ReactToastify.css'
import UploadVideoForm from './components/admin/Pages/UploadVideoForm';
import Video from './components/client/Pages/VideoList';
import Home from './components/client/Pages/Home';
import VideoDetail from './components/client/Pages/VideoDetail';
function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutDefault/>}>
        <Route element={<Home/>}>
            <Route path='/home' element={<Video/>}/>
          </Route>
        <Route path='/video/view/:id' element={<VideoDetail/>}/>
        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
        </Route>
        <Route element={<HomePage />}>
          <Route element={<PrivateRoute />}>
            <Route index path='/' element={<HomeContent />} />
            <Route path='/admin/videolist' element={<VideoList />} />
            <Route path='/admin/add' element={<AddVideoForm />} />
            <Route path='/admin/upload/:id' element={<UploadVideoForm/>} />
            <Route path='/admin/edit/:id' element={<EditVideoForm />} />
            <Route path='/admin/statics' element={<Views />} />
          </Route>
        </Route>
        </Route>
        

        
      </Routes>
    </>
  );
}

export default App;
