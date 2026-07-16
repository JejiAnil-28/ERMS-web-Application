package com.jejianil.erms.dto.response;

public class DashboardResponse {

    private long totalEmployees;

    private long activeEmployees;

    private long totalDepartments;

    private long todayAttendance;

    private long pendingLeaves;

    public DashboardResponse() {
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(long activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public long getTodayAttendance() {
        return todayAttendance;
    }

    public void setTodayAttendance(long todayAttendance) {
        this.todayAttendance = todayAttendance;
    }

    public long getPendingLeaves() {
        return pendingLeaves;
    }

    public void setPendingLeaves(long pendingLeaves) {
        this.pendingLeaves = pendingLeaves;
    }
}