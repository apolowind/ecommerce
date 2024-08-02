package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KhachHangRepository extends JpaRepository<KhachHang, Integer> {
}
