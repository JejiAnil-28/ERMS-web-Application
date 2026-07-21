package com.jejianil.erms.service;

import com.jejianil.erms.dto.request.PayrollRequest;
import com.jejianil.erms.dto.response.PayrollResponse;

import java.util.List;

public interface PayrollService {

    PayrollResponse createPayroll(PayrollRequest request);

    List<PayrollResponse> getAllPayrolls();

    PayrollResponse getPayrollById(Long id);

    PayrollResponse updatePayroll(
            Long id,
            PayrollRequest request
    );

    void deletePayroll(Long id);

    List<PayrollResponse> getPayrollByEmployee(Long employeeId);

    List<PayrollResponse> getPayrollByMonth(
            Integer month,
            Integer year
    );
}