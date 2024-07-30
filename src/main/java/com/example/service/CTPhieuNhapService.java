package com.example.service;

import com.example.entity.CTPhieuNhap;
import com.example.entity.CTPhieuNhapId;

import java.util.List;
import java.util.Optional;

public interface CTPhieuNhapService {
    CTPhieuNhap save(CTPhieuNhap ctPhieuNhap);

    Optional<CTPhieuNhap> findById(CTPhieuNhapId id);

    void deleteById(CTPhieuNhapId id);

    List<CTPhieuNhap> findAll();

}
