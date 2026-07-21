package com.jejianil.erms.repository;

import com.jejianil.erms.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {

    List<Payroll> findByEmployeeId(Long employeeId);

    List<Payroll> findByPayMonthAndPayYear(
            Integer payMonth,
            Integer payYear
    );

    List<Payroll> findByStatusIgnoreCase(String status);

    boolean existsByEmployeeIdAndPayMonthAndPayYear(
            Long employeeId,
            Integer payMonth,
            Integer payYear
    );

}