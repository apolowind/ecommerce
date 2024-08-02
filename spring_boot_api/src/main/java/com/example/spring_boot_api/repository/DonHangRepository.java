package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    // Thêm các phương thức tìm kiếm tùy chỉnh nếu cần
}
