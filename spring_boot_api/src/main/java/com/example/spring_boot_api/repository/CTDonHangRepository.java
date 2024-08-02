package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.CTDonHang;
import com.example.spring_boot_api.entity.CTDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTDonHangRepository extends JpaRepository<CTDonHang, CTDonHangId> {
    // Thêm các phương thức tìm kiếm tùy chỉnh nếu cần
}
