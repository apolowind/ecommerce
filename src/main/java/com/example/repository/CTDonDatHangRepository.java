package com.example.repository;

import com.example.entity.CTDonDatHang;
import com.example.entity.CTDonDatHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTDonDatHangRepository extends JpaRepository<CTDonDatHang, CTDonDatHangId> {
}
