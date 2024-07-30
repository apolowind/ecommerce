package com.example.service;

import com.example.entity.PhieuBaoHanh;

import java.util.List;

public interface PhieuBaoHanhService {
    PhieuBaoHanh save(PhieuBaoHanh phieuBaoHanh);
    PhieuBaoHanh update(int id, PhieuBaoHanh phieuBaoHanh);
    void delete(int id);
    PhieuBaoHanh findById(int id);
    List<PhieuBaoHanh> findAll();
}
