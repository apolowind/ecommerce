package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.CTDonHang;
import com.example.spring_boot_api.entity.CTDonHangId;

import java.util.List;
import java.util.Optional;

public interface CTDonHangService {
    CTDonHang save(CTDonHang ctDonHang);

    Optional<CTDonHang> findById(CTDonHangId id);

    void deleteById(CTDonHangId id);

    List<CTDonHang> findAll();

}
