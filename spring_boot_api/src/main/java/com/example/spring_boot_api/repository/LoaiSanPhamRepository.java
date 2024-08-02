package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.LoaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoaiSanPhamRepository extends JpaRepository<LoaiSanPham, Integer> {
    List<LoaiSanPham> findByTenloaispContaining(String tenloaisp);
}
