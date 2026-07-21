import { useEffect, useState } from "react";

import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { toast } from "react-toastify";

import PageHeader from "../../components/common/PageHeader";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveDialog from "../../components/leave/LeaveDialog";

import {
    getLeaves,
    applyLeave,
    approveLeave,
    rejectLeave,
    getPendingLeaves
} from "../../services/leaveService";

function LeaveList() {

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    // Apply Leave Dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    // Confirm Dialog
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [actionType, setActionType] = useState("");
    const [actionLoading, setActionLoading] = useState(false);

    // Temporary
    // Later we'll get this from logged-in user's role
    const isAdmin = true;

    // Temporary
    // Later we'll get this from JWT
    const approverId = 2;

    useEffect(() => {

        loadLeaves();

    }, []);

    async function loadLeaves() {

        try {

            setLoading(true);

            const response = isAdmin
                ? await getPendingLeaves()
                : await getLeaves();

            setLeaves(response.data.data);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load leave requests"
            );

        } finally {

            setLoading(false);

        }

    }

    // ==========================
    // Approve Leave
    // ==========================

    function handleApprove(leave) {

        setSelectedLeave(leave);

        setActionType("APPROVE");

        setConfirmOpen(true);

    }

    // ==========================
    // Reject Leave
    // ==========================

    function handleReject(leave) {

        setSelectedLeave(leave);

        setActionType("REJECT");

        setConfirmOpen(true);

    }

    // ==========================
    // Confirm Approve / Reject
    // ==========================

    async function handleConfirmAction() {

        try {

            setActionLoading(true);

            if (actionType === "APPROVE") {

                await approveLeave(
                    selectedLeave.id,
                    approverId
                );

                toast.success("Leave approved successfully");

            } else {

                await rejectLeave(
                    selectedLeave.id,
                    approverId
                );

                toast.success("Leave rejected successfully");

            }

            setConfirmOpen(false);

            setSelectedLeave(null);

            await loadLeaves();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Operation failed"
            );

        } finally {

            setActionLoading(false);

        }

    }

    // ==========================
    // Apply Leave Dialog
    // ==========================

    function openDialog() {

        setDialogOpen(true);

    }

    function closeDialog() {

        setDialogOpen(false);

    }

    // ==========================
    // Apply Leave
    // ==========================

    async function handleApplyLeave(data) {

        try {

            setSubmitLoading(true);

            await applyLeave(data);

            toast.success("Leave applied successfully");

            closeDialog();

            await loadLeaves();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to apply leave"
            );

        } finally {

            setSubmitLoading(false);

        }

    }

    return (

        <Box>

            <PageHeader
                title="Leave Management"
                buttonText="Apply Leave"
                buttonIcon={<AddIcon />}
                onButtonClick={openDialog}
            />

            <LeaveTable
                leaves={leaves}
                loading={loading}
                isAdmin={isAdmin}
                onApprove={handleApprove}
                onReject={handleReject}
            />

            <LeaveDialog
                open={dialogOpen}
                onClose={closeDialog}
                onSubmit={handleApplyLeave}
                loading={submitLoading}
            />

            <ConfirmDialog
                open={confirmOpen}
                title={
                    actionType === "APPROVE"
                        ? "Approve Leave"
                        : "Reject Leave"
                }
                message={
                    actionType === "APPROVE"
                        ? "Are you sure you want to approve this leave request?"
                        : "Are you sure you want to reject this leave request?"
                }
                confirmText={
                    actionType === "APPROVE"
                        ? "Approve"
                        : "Reject"
                }
                confirmColor={
                    actionType === "APPROVE"
                        ? "success"
                        : "error"
                }
                loading={actionLoading}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleConfirmAction}
            />

        </Box>

    );

}

export default LeaveList;