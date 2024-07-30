package com.example.service;

import com.example.entity.CTDonDatHang;
import com.example.entity.CTDonDatHangId;

import java.util.List;
import java.util.Optional;

public interface CTDonDatHangService {
    CTDonDatHang save(CTDonDatHang ctDonDatHang);

    Optional<CTDonDatHang> findById(CTDonDatHangId id);

    void deleteById(CTDonDatHangId id);

    List<CTDonDatHang> findAll();

}
