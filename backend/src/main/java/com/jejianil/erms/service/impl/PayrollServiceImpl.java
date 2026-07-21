package com.jejianil.erms.service.impl;

import com.jejianil.erms.dto.request.PayrollRequest;
import com.jejianil.erms.dto.response.PayrollResponse;
import com.jejianil.erms.entity.Employee;
import com.jejianil.erms.entity.Payroll;
import com.jejianil.erms.exception.DuplicateResourceException;
import com.jejianil.erms.exception.ResourceNotFoundException;
import com.jejianil.erms.mapper.PayrollMapper;
import com.jejianil.erms.repository.EmployeeRepository;
import com.jejianil.erms.repository.PayrollRepository;
import com.jejianil.erms.service.PayrollService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PayrollServiceImpl implements PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;

    public PayrollServiceImpl(
            PayrollRepository payrollRepository,
            EmployeeRepository employeeRepository) {

        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
    }

    // Remaining methods...
    private Payroll findPayroll(Long id) {

        return payrollRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Payroll not found with id: " + id
                        ));
    }

    private Employee findEmployee(Long id) {

        return employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id
                        ));
    }

    private BigDecimal defaultValue(BigDecimal value) {

        return value == null
                ? BigDecimal.ZERO
                : value;
    }

    private BigDecimal calculateNetSalary(
            BigDecimal basicSalary,
            BigDecimal allowances,
            BigDecimal bonus,
            BigDecimal deductions) {

        return basicSalary
                .add(defaultValue(allowances))
                .add(defaultValue(bonus))
                .subtract(defaultValue(deductions));
    }

    @Override
    public PayrollResponse createPayroll(PayrollRequest request) {

        if (payrollRepository.existsByEmployeeIdAndPayMonthAndPayYear(
                request.getEmployeeId(),
                request.getPayMonth(),
                request.getPayYear())) {

            throw new DuplicateResourceException(
                    "Payroll already exists for this employee for the selected month."
            );
        }

        Employee employee = findEmployee(request.getEmployeeId());

        Payroll payroll = new Payroll();

        payroll.setEmployee(employee);

        payroll.setBasicSalary(request.getBasicSalary());

        payroll.setAllowances(
                defaultValue(request.getAllowances())
        );

        payroll.setDeductions(
                defaultValue(request.getDeductions())
        );

        payroll.setBonus(
                defaultValue(request.getBonus())
        );

        payroll.setNetSalary(
                calculateNetSalary(
                        request.getBasicSalary(),
                        request.getAllowances(),
                        request.getBonus(),
                        request.getDeductions()
                )
        );

        payroll.setPayMonth(request.getPayMonth());

        payroll.setPayYear(request.getPayYear());

        payroll.setPaymentDate(request.getPaymentDate());

        payroll.setRemarks(request.getRemarks());

        Payroll savedPayroll = payrollRepository.save(payroll);

        return PayrollMapper.toResponse(savedPayroll);
    }

    @Override
    public List<PayrollResponse> getAllPayrolls() {

        return payrollRepository.findAll()
                .stream()
                .map(PayrollMapper::toResponse)
                .toList();
    }

    @Override
    public PayrollResponse getPayrollById(Long id) {

        Payroll payroll = findPayroll(id);

        return PayrollMapper.toResponse(payroll);
    }

    @Override
    public PayrollResponse updatePayroll(
            Long id,
            PayrollRequest request) {

        Payroll payroll = findPayroll(id);

        Employee employee = findEmployee(request.getEmployeeId());

        payroll.setEmployee(employee);

        payroll.setBasicSalary(request.getBasicSalary());

        payroll.setAllowances(
                defaultValue(request.getAllowances())
        );

        payroll.setDeductions(
                defaultValue(request.getDeductions())
        );

        payroll.setBonus(
                defaultValue(request.getBonus())
        );

        payroll.setNetSalary(
                calculateNetSalary(
                        request.getBasicSalary(),
                        request.getAllowances(),
                        request.getBonus(),
                        request.getDeductions()
                )
        );

        payroll.setPayMonth(request.getPayMonth());

        payroll.setPayYear(request.getPayYear());

        payroll.setPaymentDate(request.getPaymentDate());

        payroll.setRemarks(request.getRemarks());

        Payroll updatedPayroll =
                payrollRepository.save(payroll);

        return PayrollMapper.toResponse(updatedPayroll);
    }

    @Override
    public void deletePayroll(Long id) {

        Payroll payroll = findPayroll(id);

        payrollRepository.delete(payroll);
    }

    @Override
    public List<PayrollResponse> getPayrollByEmployee(Long employeeId) {

        return payrollRepository
                .findByEmployeeId(employeeId)
                .stream()
                .map(PayrollMapper::toResponse)
                .toList();
    }

    @Override
    public List<PayrollResponse> getPayrollByMonth(
            Integer month,
            Integer year) {

        return payrollRepository
                .findByPayMonthAndPayYear(month, year)
                .stream()
                .map(PayrollMapper::toResponse)
                .toList();
    }
}