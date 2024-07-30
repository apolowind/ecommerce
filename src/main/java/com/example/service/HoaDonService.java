package com.example.service;

import com.example.entity.HoaDon;

import java.util.List;
import java.util.Optional;

public interface HoaDonService {
    HoaDon save(HoaDon hoaDon);

    Optional<HoaDon> findById(int id);

    void deleteById(int id);

    List<HoaDon> findAll();
}
