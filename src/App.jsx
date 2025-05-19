import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FinanceAdminLayout from "./components/FinanceAdminPanel";
import Dashboard from './components/DashboardAdmin/Dashboard';
import CreateSaving from './components/Saving/CreateSaving';
import PagePlaceholder from './components/PagePlaceholder';
import AddCustomerForm from "./components/Add-customer/AddCustomerForm";
import LoginForm from "./components/Login-SignUp/LoginPage";
import SignUp from "./components/Login-SignUp/signup";
import DailyCollection from "./components/Daily-collection/DailyCollection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinanceAdminLayout />}>

          {/*----Nested routes that will render inside the FinanceAdminLayout ----*/}
            <Route index element={<Dashboard />} />
            <Route path="add-customer" element={<AddCustomerForm/>} />
            <Route path="create-saving" element={<CreateSaving />} />
            <Route path="create-rd" element={<PagePlaceholder title="Create RD Account" />} />
            <Route path="create-fd" element={<PagePlaceholder title="Create FD Account" />} />
            <Route path="apply-loan" element={<PagePlaceholder title="Apply for Loan" />} />
            <Route path="reports" element={<PagePlaceholder title="Reports" />} />
            <Route path = "daily-collection" element={<DailyCollection/>}/>
        </Route>

         <Route path = "/login" element={<LoginForm/>}/>
         <Route path = "/signup" element={<SignUp/>}/>
         
      </Routes>      
    </Router>
  );
}

export default App;