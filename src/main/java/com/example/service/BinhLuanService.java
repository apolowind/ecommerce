package com.example.service;

import com.example.entity.BinhLuan;

import java.util.List;
import java.util.Optional;

public interface BinhLuanService {
    BinhLuan save(BinhLuan binhLuan);

    Optional<BinhLuan> findById(int id);

    void deleteById(int id);

    List<BinhLuan> findAll();

    List<BinhLuan> findByKhachhangId(int makh);

    List<BinhLuan> findBySanphamId(int masp);
}
