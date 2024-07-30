package com.example.repository;

import com.example.entity.CTPhieuNhap;
import com.example.entity.CTPhieuNhapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTPhieuNhapRepository extends JpaRepository<CTPhieuNhap, CTPhieuNhapId> {
}
