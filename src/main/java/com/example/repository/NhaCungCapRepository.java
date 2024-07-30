package com.example.repository;

import com.example.entity.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Integer> {
    List<NhaCungCap> findByTennccContaining(String tenncc);
}
