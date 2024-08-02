package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.PhieuBaoHanh;

import java.util.List;

public interface PhieuBaoHanhService {
    PhieuBaoHanh save(PhieuBaoHanh phieuBaoHanh);
    PhieuBaoHanh update(int id, PhieuBaoHanh phieuBaoHanh);
    void delete(int id);
    PhieuBaoHanh findById(int id);
    List<PhieuBaoHanh> findAll();
}
