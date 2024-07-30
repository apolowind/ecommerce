package com.example.repository;

import com.example.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SanPhamRepository extends JpaRepository<SanPham, Integer> {
    List<SanPham> findByTensanphamContaining(String tensanpham);
}
