package com.example.service;

import com.example.entity.DonDatHang;

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
