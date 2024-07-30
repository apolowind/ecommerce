package com.example.repository;

import com.example.entity.CTDonHang;
import com.example.entity.CTDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTDonHangRepository extends JpaRepository<CTDonHang, CTDonHangId> {
    // Thêm các phương thức tìm kiếm tùy chỉnh nếu cần
}
