package com.example.service;

import com.example.entity.KhachHang;

import java.util.List;

public interface KhachHangService {
    KhachHang save(KhachHang khachHang);
    KhachHang update(int id, KhachHang khachHang);
    void delete(int id);
    KhachHang findById(int id);
    List<KhachHang> findAll();
}
