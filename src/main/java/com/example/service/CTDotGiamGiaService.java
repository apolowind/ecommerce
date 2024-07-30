package com.example.service;

import com.example.entity.CTDotGiamGia;
import com.example.entity.CTDotGiamGiaId;

import java.util.List;
import java.util.Optional;

public interface CTDotGiamGiaService {
    CTDotGiamGia save(CTDotGiamGia ctDotGiamGia);

    Optional<CTDotGiamGia> findById(CTDotGiamGiaId id);

    void deleteById(CTDotGiamGiaId id);

    List<CTDotGiamGia> findAll();

    List<CTDotGiamGia> searchBySanpham(int masp);

    List<CTDotGiamGia> searchByDotgiamgia(int madgg);
}
