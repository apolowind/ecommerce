package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.LoaiSanPham;
import com.example.spring_boot_api.entity.SanPham;

import java.util.List;

public interface SanPhamService {
    SanPham save(SanPham sanPham);
    SanPham update(int id, SanPham sanPham);
    void delete(int id);
    SanPham findById(int id);
    List<SanPham> findAll();
    List<SanPham> searchByName(String name);
    List<SanPham> findByLoaiSanPham(LoaiSanPham loaisanpham);

}
