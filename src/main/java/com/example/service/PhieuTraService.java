package com.example.service;

import com.example.entity.PhieuTra;

import java.util.List;
import java.util.Optional;

public interface PhieuTraService {
    PhieuTra save(PhieuTra phieuTra);

    Optional<PhieuTra> findById(int id);

    void deleteById(int id);

    List<PhieuTra> findAll();
}
