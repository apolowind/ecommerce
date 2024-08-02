package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.KhachHang;

import java.util.List;

public interface KhachHangService {
    KhachHang save(KhachHang khachHang);
    KhachHang update(int id, KhachHang khachHang);
    void delete(int id);
    KhachHang findById(int id);
    List<KhachHang> findAll();
}
