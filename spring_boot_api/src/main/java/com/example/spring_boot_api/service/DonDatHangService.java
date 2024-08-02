package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.DonDatHang;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DonDatHangService {
    DonDatHang save(DonDatHang donDatHang);

    Optional<DonDatHang> findById(int id);

    void deleteById(int id);

    List<DonDatHang> findAll();

    List<DonDatHang> searchByDate(Date ngaydathang);

}
