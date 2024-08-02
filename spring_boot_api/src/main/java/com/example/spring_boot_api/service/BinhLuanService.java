package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.BinhLuan;

import java.util.List;
import java.util.Optional;

public interface BinhLuanService {
    BinhLuan save(BinhLuan binhLuan);

    Optional<BinhLuan> findById(int id);

    void deleteById(int id);

    List<BinhLuan> findAll();

    List<BinhLuan> findByKhachhangMakh(int makh);

    List<BinhLuan> findBySanphamMasp(int masp);
}
