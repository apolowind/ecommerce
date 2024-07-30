package com.example.service;

import com.example.entity.NhaCungCap;

import java.util.List;

public interface NhaCungCapService {
    NhaCungCap save(NhaCungCap nhaCungCap);
    NhaCungCap update(int id, NhaCungCap nhaCungCap);
    void delete(int id);
    NhaCungCap findById(int id);
    List<NhaCungCap> findAll();
    List<NhaCungCap> searchByName(String name);
}