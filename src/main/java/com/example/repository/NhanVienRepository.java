package com.example.repository;

import com.example.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NhanVienRepository extends JpaRepository<NhanVien, Integer> {
    List<NhanVien> findByHoContainingOrTenContaining(String ho, String ten);
}
