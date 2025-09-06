import NotificationHistory from "./pages/notification-history";
<Route path="/notification-history" element={<NotificationHistory />} />
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";



import Home from "./pages/home";
import FindJob from "./pages/findjob";
import JobDetails from "./pages/jobdetails";
import About from "./pages/about";
import Skills from "./pages/skills";
import Departments from "./pages/departments";
import StudentSkills from "./pages/student-skills";
import JobSkills from "./pages/job-skills";
import Applications from "./pages/applications";
// PaymentModal is a component, not a page, so not routed here
import Contact from "./pages/contact";
import Terms from "./pages/terms";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import StudentDashboard from "./pages/student-dashboard";
import EmployerDashboard from "./pages/employer-dashboard";
import JobListings from "./pages/joblistings";
import StudentProfile from "./pages/student-profile";
import MyApplications from "./pages/my-applications";
import PaymentHistory from "./pages/payment-history";
import EmployerProfile from "./pages/employer-profile";
import PostJob from "./pages/post-job";
import ManageJobs from "./pages/manage-jobs";
import ApplicationsForJob from "./pages/applications-for-job";
import AdminDashboard from "./pages/admin-dashboard";



function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-job" element={<FindJob />} />
            <Route path="/job-details" element={<JobDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/joblistings" element={<JobListings />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/employer-profile" element={<EmployerProfile />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applications-for-job" element={<ApplicationsForJob />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/student-skills" element={<StudentSkills />} />
            <Route path="/job-skills" element={<JobSkills />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;