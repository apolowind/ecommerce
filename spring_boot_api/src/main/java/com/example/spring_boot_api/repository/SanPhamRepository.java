package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    List<SanPham> findByTensanphamContaining(String tensanpham);
}
