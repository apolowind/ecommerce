package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    List<NhanVien> findByHoContainingOrTenContaining(String ho, String ten);
}
