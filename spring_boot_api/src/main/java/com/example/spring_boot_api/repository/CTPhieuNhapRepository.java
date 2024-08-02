package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.CTPhieuNhap;
import com.example.spring_boot_api.entity.CTPhieuNhapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTPhieuNhapRepository extends JpaRepository<CTPhieuNhap, CTPhieuNhapId> {
}
