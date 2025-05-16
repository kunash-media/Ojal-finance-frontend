import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FinanceAdminLayout from "./components/FinanceAdminPanel";
import Dashboard from './components/DashboardAdmin/Dashboard';
import CreateSaving from './components/Saving/CreateSaving';
import PagePlaceholder from './components/PagePlaceholder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FinanceAdminLayout />}>
          {/* Nested routes that will render inside the FinanceAdminLayout */}
          <Route index element={<Dashboard />} />
          <Route path="add-customer" element={<PagePlaceholder title="Add Customer" />} />
          <Route path="create-saving" element={<CreateSaving />} />
          <Route path="create-rd" element={<PagePlaceholder title="Create RD Account" />} />
          <Route path="create-fd" element={<PagePlaceholder title="Create FD Account" />} />
          <Route path="apply-loan" element={<PagePlaceholder title="Apply for Loan" />} />
          <Route path="reports" element={<PagePlaceholder title="Reports" />} />
        </Route>
      </Routes>      
    </Router>
  );
}

export default App;