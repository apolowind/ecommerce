package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
    List<NhaCungCap> findByTennccContaining(String tenncc);
}
