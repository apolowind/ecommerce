package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.CTDonDatHang;
import com.example.spring_boot_api.entity.CTDonDatHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CTDonDatHangRepository extends JpaRepository<CTDonDatHang, CTDonDatHangId> {
}
