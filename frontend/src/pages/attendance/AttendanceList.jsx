import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import AttendanceToolbar from "../../components/attendance/AttendanceToolbar";
import AttendanceStatistics from "../../components/attendance/AttendanceStatistics";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceDialog from "../../components/attendance/AttendanceDialog";

import {
    getTodayAttendance,
    checkIn,
    checkOut
} from "../../services/attendanceService";

function AttendanceList() {

    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    // ==========================
    // Dialog States
    // ==========================

    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);

    // TODO: Replace with logged-in employee ID after auth integration
    const EMPLOYEE_ID = 2;

    useEffect(() => {
        loadAttendance();
    }, []);

    const loadAttendance = async () => {

        try {

            setLoading(true);

            const response = await getTodayAttendance();

            setAttendance(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load attendance"
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================
    // Check-In Dialog Handlers
    // ==========================

    const openCheckInDialog = () => {

        setCheckInOpen(true);

    };

    const closeCheckInDialog = () => {

        setCheckInOpen(false);

    };

    // ==========================
    // Check-Out Dialog Handlers
    // ==========================

    const openCheckOutDialog = () => {

        setCheckOutOpen(true);

    };

    const closeCheckOutDialog = () => {

        setCheckOutOpen(false);

    };

    // ==========================
    // Check In
    // ==========================

    const handleCheckIn = async (attendanceRequest) => {

        try {

            await checkIn(attendanceRequest);

            toast.success("Checked In Successfully");

            closeCheckInDialog();

            await loadAttendance();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Check In Failed"
            );

        }

    };

    // ==========================
    // Check Out
    // ==========================

    const handleCheckOut = async () => {

        try {

            await checkOut(EMPLOYEE_ID);

            toast.success("Checked Out Successfully");

            closeCheckOutDialog();

            await loadAttendance();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Check Out Failed"
            );

        }

    };

    // ==========================
    // Search Filter
    // ==========================

    const filteredAttendance = useMemo(() => {

        return attendance.filter((employee) => {

            const keyword = search.toLowerCase();

            return (

                employee.employeeCode
                    ?.toLowerCase()
                    .includes(keyword)

                ||

                employee.employeeName
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    }, [attendance, search]);

    return (

        <Box>

            <PageHeader title="Attendance" />

            <AttendanceStatistics
                attendance={attendance}
            />

            <AttendanceToolbar
                search={search}
                setSearch={setSearch}
                onRefresh={loadAttendance}
                onOpenCheckIn={openCheckInDialog}
                onOpenCheckOut={openCheckOutDialog}
            />

            {/* Check-In Dialog */}
            <AttendanceDialog
                open={checkInOpen}
                onClose={closeCheckInDialog}
                onSubmit={handleCheckIn}
                type="CHECK_IN"
            />

            {/* Check-Out Dialog */}
            <AttendanceDialog
                open={checkOutOpen}
                onClose={closeCheckOutDialog}
                onSubmit={handleCheckOut}
                type="CHECK_OUT"
            />

            <AttendanceTable
                attendance={filteredAttendance}
                loading={loading}
            />

        </Box>

    );

}

export default AttendanceList;