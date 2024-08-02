package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.DotGiamGia;

import java.util.List;

public interface DotGiamGiaService {
    DotGiamGia save(DotGiamGia dotGiamGia);
    DotGiamGia update(int id, DotGiamGia dotGiamGia);
    void delete(int id);
    DotGiamGia findById(int id);
    List<DotGiamGia> findAll();
}
