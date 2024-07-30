package com.example.service;

import com.example.entity.PhieuNhap;

import java.util.List;
import java.util.Optional;

public interface PhieuNhapService {
    PhieuNhap save(PhieuNhap phieuNhap);

    Optional<PhieuNhap> findById(int id);

    void deleteById(int id);

    List<PhieuNhap> findAll();
}
