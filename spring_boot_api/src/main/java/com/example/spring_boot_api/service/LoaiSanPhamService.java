package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.LoaiSanPham;

import java.util.List;

public interface LoaiSanPhamService {
    LoaiSanPham save(LoaiSanPham loaiSanPham);
    LoaiSanPham update(int id, LoaiSanPham loaiSanPham);
    void delete(int id);
    LoaiSanPham findById(int id);
    List<LoaiSanPham> findAll();
    List<LoaiSanPham> searchByName(String name);
}
