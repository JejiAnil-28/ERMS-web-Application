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

    // Attendance Status
    const [checkedIn, setCheckedIn] = useState(false);
    const [checkedOut, setCheckedOut] = useState(false);

    // Button Loading
    const [checkInLoading, setCheckInLoading] = useState(false);
    const [checkOutLoading, setCheckOutLoading] = useState(false);

    // Dialog States
    const [checkInOpen, setCheckInOpen] = useState(false);
    const [checkOutOpen, setCheckOutOpen] = useState(false);

    // TODO: Replace with logged-in employee after JWT integration
    const EMPLOYEE_ID = 2;

    useEffect(() => {

        loadAttendance();

    }, []);

    const loadAttendance = async () => {

        try {

            setLoading(true);

            const response = await getTodayAttendance();

            const attendanceData = response.data.data;

            setAttendance(attendanceData);

            // Temporary
            // Later compare using logged-in employee id from JWT
            const todayRecord = attendanceData.find(

                item => item.employeeId === EMPLOYEE_ID

                // OR

                // item.employeeCode === "EMP001"

            );

            if (todayRecord) {

                setCheckedIn(!!todayRecord.checkInTime);

                setCheckedOut(!!todayRecord.checkOutTime);

            } else {

                setCheckedIn(false);

                setCheckedOut(false);

            }

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
    // Check In Dialog
    // ==========================

    const openCheckInDialog = () => {

        setCheckInOpen(true);

    };

    const closeCheckInDialog = () => {

        setCheckInOpen(false);

    };

    // ==========================
    // Check Out Dialog
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

            setCheckInLoading(true);

            await checkIn(attendanceRequest);

            toast.success("Checked In Successfully");

            closeCheckInDialog();

            await loadAttendance();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Check In Failed"

            );

        } finally {

            setCheckInLoading(false);

        }

    };

    // ==========================
    // Check Out
    // ==========================

    const handleCheckOut = async () => {

        try {

            setCheckOutLoading(true);

            await checkOut(EMPLOYEE_ID);

            toast.success("Checked Out Successfully");

            closeCheckOutDialog();

            await loadAttendance();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Check Out Failed"

            );

        } finally {

            setCheckOutLoading(false);

        }

    };

    // ==========================
    // Search Filter
    // ==========================

    const filteredAttendance = useMemo(() => {

        const keyword = search.toLowerCase();

        return attendance.filter(employee =>

            employee.employeeCode?.toLowerCase().includes(keyword) ||

            employee.employeeName?.toLowerCase().includes(keyword)

        );

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
                checkedIn={checkedIn}
                checkedOut={checkedOut}
                checkInLoading={checkInLoading}
                checkOutLoading={checkOutLoading}
            />

            {/* Check In */}

            <AttendanceDialog
                open={checkInOpen}
                onClose={closeCheckInDialog}
                onSubmit={handleCheckIn}
                type="CHECK_IN"
            />

            {/* Check Out */}

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