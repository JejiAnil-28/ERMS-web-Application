package com.jejianil.erms.mapper;

import com.jejianil.erms.dto.response.PayrollResponse;
import com.jejianil.erms.entity.Payroll;

public class PayrollMapper {

    private PayrollMapper() {
    }

    public static PayrollResponse toResponse(Payroll payroll) {

        PayrollResponse response = new PayrollResponse();

        response.setId(payroll.getId());

        response.setEmployeeId(
                payroll.getEmployee().getId()
        );

        response.setEmployeeCode(
                payroll.getEmployee().getEmployeeCode()
        );

        response.setEmployeeName(
                payroll.getEmployee().getFirstName()
                        + " "
                        + payroll.getEmployee().getLastName()
        );

        response.setBasicSalary(payroll.getBasicSalary());
        response.setAllowances(payroll.getAllowances());
        response.setDeductions(payroll.getDeductions());
        response.setBonus(payroll.getBonus());
        response.setNetSalary(payroll.getNetSalary());

        response.setPayMonth(payroll.getPayMonth());
        response.setPayYear(payroll.getPayYear());

        response.setPaymentDate(payroll.getPaymentDate());

        response.setStatus(payroll.getStatus());
        response.setRemarks(payroll.getRemarks());

        return response;
    }

}