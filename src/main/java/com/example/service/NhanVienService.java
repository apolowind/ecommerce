package com.example.service;

import com.example.entity.NhanVien;

import java.util.List;

public interface NhanVienService {
    NhanVien save(NhanVien nhanVien);
    NhanVien update(int id, NhanVien nhanVien);
    void delete(int id);
    NhanVien findById(int id);
    List<NhanVien> findAll();
    List<NhanVien> searchByName(String name);
}
