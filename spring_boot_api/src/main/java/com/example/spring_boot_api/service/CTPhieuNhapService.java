package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.CTPhieuNhap;
import com.example.spring_boot_api.entity.CTPhieuNhapId;

import java.util.List;
import java.util.Optional;

public interface CTPhieuNhapService {
    CTPhieuNhap save(CTPhieuNhap ctPhieuNhap);

    Optional<CTPhieuNhap> findById(CTPhieuNhapId id);

    void deleteById(CTPhieuNhapId id);

    List<CTPhieuNhap> findAll();

}
