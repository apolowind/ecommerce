package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.HoaDon;

import java.util.List;
import java.util.Optional;

public interface HoaDonService {
    HoaDon save(HoaDon hoaDon);

    Optional<HoaDon> findById(int id);

    void deleteById(int id);

    List<HoaDon> findAll();
}
