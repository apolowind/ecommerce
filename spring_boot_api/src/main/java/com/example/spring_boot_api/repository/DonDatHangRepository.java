package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.DonDatHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DonDatHangRepository extends JpaRepository<DonDatHang, Integer> {
    List<DonDatHang> findByNgaydathang(Date ngaydathang);
}
