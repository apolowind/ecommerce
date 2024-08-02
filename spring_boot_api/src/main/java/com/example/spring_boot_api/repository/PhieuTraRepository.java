package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.PhieuTra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuTraRepository extends JpaRepository<PhieuTra, Integer> {
}
