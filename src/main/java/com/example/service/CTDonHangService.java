package com.example.service;

import com.example.entity.CTDonHang;
import com.example.entity.CTDonHangId;

import java.util.List;
import java.util.Optional;

public interface CTDonHangService {
    CTDonHang save(CTDonHang ctDonHang);

    Optional<CTDonHang> findById(CTDonHangId id);

    void deleteById(CTDonHangId id);

    List<CTDonHang> findAll();

}
