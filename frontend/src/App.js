import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import AddCourse from './components/Adminn/AddCourse';
import AllCourses from './components/user/AllCourses';
import DeleteCourse from './components/Adminn/DeleteCourse';
import ViewCourse from './components/user/ViewCourse';
import UpdateCourse from './components/Adminn/UpdateCourse';
import Logout from './components/Logout';
import Admin from './components/Adminn/Admin';
import MyEnrollments from './components/user/MyEnrollments';
import AdminEnrollments from './components/Adminn/AdminEnrollments';
import CourseEnrollmnt from './components/user/Courseenrollmnt';
import Login from './components/Login';
import AdminallCourses from './components/Adminn/Adminallcourse';
import Adminviewone from './components/Adminn/AdminViewOne';
import Coursecontent from './components/user/Coursecontnt';
import AddContent from './components/Adminn/AddContent';
import UpdateContent from './components/Adminn/UpdateContent';
import Home from './components/Home';
import ADashbord from './components/Adminn/ADashbord';

function App() {
  return (
    <div className="animated-bg">
      <Router>
        <div className="App">
          {/* Decorative icons */}
          <div className="icon icon1">📚</div>
          <div className="icon icon2">💡</div>
          {/* ... other icons ... */}

          <Header />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/delete-course/:id" element={<DeleteCourse />} />
            <Route path="/view-course/:id" element={<ViewCourse />} />
            <Route path="/update-course/:id" element={<UpdateCourse />} />
            <Route path="/all-course" element={<AllCourses />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/menroll" element={<MyEnrollments />} />
            <Route path="/aenroll" element={<AdminEnrollments />} />
            <Route path="/cenroll/:id" element={<CourseEnrollmnt />} />
            <Route path="/coursecontent/:id" element={<Coursecontent />} />
            <Route path="/conten/:id" element={<AddContent />} />
            <Route path="/updatecontent/:id" element={<UpdateContent />} />
            <Route path="/adminallcourse" element={<AdminallCourses />} />
            <Route path="/adminviewone/:id" element={<Adminviewone />} />
            <Route path="/ad" element={<ADashbord />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
