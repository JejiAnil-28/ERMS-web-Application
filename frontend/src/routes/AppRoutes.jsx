import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeList from "../pages/employee/EmployeeList";
import DepartmentList from "../pages/department/DepartmentList";
import AttendanceList from "../pages/attendance/AttendanceList";
import LeaveList from "../pages/leave/LeaveList";

function AppRoutes() {

    return (

        <BrowserRouter>

    <Routes>

        {/* Public Route */}

            <Route
                path="/"
                element={<Login />}
            />

        <Route element={<ProtectedRoute />}>

            <Route element={<MainLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/employees"
                    element={<EmployeeList />}
                />

                <Route
                    path="/departments"
                    element={<DepartmentList />}
                />

                <Route
    path="/attendance"
    element={<AttendanceList />}
/>

                <Route
    path="/leaves"
    element={<LeaveList />}
/>

            </Route>

    </Route>
    </Routes>

</BrowserRouter>

    );

}

export default AppRoutes;