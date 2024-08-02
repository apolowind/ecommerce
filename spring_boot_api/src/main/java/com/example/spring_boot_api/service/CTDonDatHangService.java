package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.CTDonDatHang;
import com.example.spring_boot_api.entity.CTDonDatHangId;

import java.util.List;
import java.util.Optional;

public interface CTDonDatHangService {
    CTDonDatHang save(CTDonDatHang ctDonDatHang);

    Optional<CTDonDatHang> findById(CTDonDatHangId id);

    void deleteById(CTDonDatHangId id);

    List<CTDonDatHang> findAll();

}
