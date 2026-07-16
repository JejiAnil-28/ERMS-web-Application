import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeList from "../pages/employee/EmployeeList";
import DepartmentList from "../pages/department/DepartmentList";
import Attendance from "../pages/attendance/Attendance";
import Leave from "../pages/leave/Leave";

function AppRoutes() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" />}
                    />

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
                        element={<Attendance />}
                    />

                    <Route
                        path="/leave"
                        element={<Leave />}
                    />

                </Routes>

            </MainLayout>

        </BrowserRouter>

    );

}

export default AppRoutes;