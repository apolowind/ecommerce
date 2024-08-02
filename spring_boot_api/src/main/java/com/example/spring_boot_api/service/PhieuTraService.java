package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.PhieuTra;

import java.util.List;
import java.util.Optional;

public interface PhieuTraService {
    PhieuTra save(PhieuTra phieuTra);

    Optional<PhieuTra> findById(int id);

    void deleteById(int id);

    List<PhieuTra> findAll();
}
