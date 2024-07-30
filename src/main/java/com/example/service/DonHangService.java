package com.example.service;

import com.example.entity.DonHang;

import java.util.List;
import java.util.Optional;

public interface DonHangService {
    DonHang save(DonHang donHang);

    Optional<DonHang> findById(int id);

    void deleteById(int id);

    List<DonHang> findAll();

}
