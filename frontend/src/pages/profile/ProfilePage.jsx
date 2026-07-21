import { useEffect, useState } from "react";

import {
    Box,
    Grid
} from "@mui/material";

import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import ProfileInformation from "../../components/profile/ProfileInformation";
import EditProfileDialog from "../../components/profile/EditProfileDialog";
import ChangePasswordDialog from "../../components/profile/ChangePasswordDialog";

import { getEmployees } from "../../services/employeeService";

function ProfilePage() {

    const [employee, setEmployee] = useState(null);

    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    // TODO: Replace with logged-in employee after JWT integration
    const EMPLOYEE_ID = 2;

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getEmployees();

            //console.log("Employee API Response:", response.data);

            const employees = response.data.data;

            //console.log("Employees:", employees);

            const currentEmployee = employees.find(

                employee => employee.id === EMPLOYEE_ID

            );

            //console.log("Current Employee:", currentEmployee);

            setEmployee(currentEmployee);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load profile"

            );

        }

    };

    // ==========================
    // Edit Profile
    // ==========================

    const handleEditProfile = () => {

        setEditDialogOpen(true);

    };

    // ==========================
    // Change Password
    // ==========================

    const handleChangePassword = () => {

        setPasswordDialogOpen(true);

    };

    // ==========================
    // Save Profile
    // ==========================

    const handleSaveProfile = (data) => {

    setEmployee((prev) => ({
        ...prev,
        ...data
    }));

    toast.success("Profile updated successfully.");

    setEditDialogOpen(false);

};
    // ==========================
    // Save Password
    // ==========================

    const handleSavePassword = () => {

        toast.success("Password updated successfully.");

        setPasswordDialogOpen(false);

    };
    
    return (

        <Box>

            <PageHeader
                title="My Profile"
            />

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >

                    <ProfileCard
                        employee={employee}
                    />

                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 8
                    }}
                >

                    <ProfileInformation
                        employee={employee}
                        onEdit={handleEditProfile}
                        onChangePassword={handleChangePassword}
                    />

                </Grid>

            </Grid>

            <EditProfileDialog
                open={editDialogOpen}
                employee={employee}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleSaveProfile}
            />

            <ChangePasswordDialog
                open={passwordDialogOpen}
                onClose={() => setPasswordDialogOpen(false)}
                onSave={handleSavePassword}
            />

        </Box>

    );

}

export default ProfilePage;