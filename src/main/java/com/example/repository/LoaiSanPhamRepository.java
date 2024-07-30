package com.example.repository;

import com.example.entity.LoaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoaiSanPhamRepository extends JpaRepository<LoaiSanPham, Integer> {
    List<LoaiSanPham> findByTenloaispContaining(String tenloaisp);
}
