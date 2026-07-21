package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.AttendanceResponse;
import com.jejianil.erms.entity.Attendance;

public class AttendanceMapper {

    private AttendanceMapper() {
    }

    public static AttendanceResponse toResponse(Attendance attendance) {

        AttendanceResponse response = new AttendanceResponse();

        response.setId(attendance.getId());

        response.setEmployeeId(
                attendance.getEmployee().getId()
        );

        response.setEmployeeCode(
                attendance.getEmployee().getEmployeeCode()
        );

        response.setEmployeeName(
                attendance.getEmployee().getFirstName()
                        + " "
                        + attendance.getEmployee().getLastName()
        );

        response.setAttendanceDate(
                attendance.getAttendanceDate()
        );

        response.setCheckInTime(
                attendance.getCheckInTime()
        );

        response.setCheckOutTime(
                attendance.getCheckOutTime()
        );

        response.setStatus(
                attendance.getStatus()
        );

        response.setRemarks(
                attendance.getRemarks()
        );

        return response;

    }

}