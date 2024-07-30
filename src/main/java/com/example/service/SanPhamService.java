package com.example.service;

import com.example.entity.SanPham;

import java.util.List;

public interface SanPhamService {
    SanPham save(SanPham sanPham);
    SanPham update(int id, SanPham sanPham);
    void delete(int id);
    SanPham findById(int id);
    List<SanPham> findAll();
    List<SanPham> searchByName(String name);
}
