package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.Quyen;

import java.util.List;

public interface QuyenService {
    Quyen save(Quyen quyen);
    Quyen update(int id, Quyen quyen);
    void delete(int id);
    Quyen findById(int id);
    List<Quyen> findAll();
    List<Quyen> searchByName(String name);
}
