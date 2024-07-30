package com.example.service.impl;

import com.example.entity.BinhLuan;
import com.example.repository.BinhLuanRepository;
import com.example.service.BinhLuanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BinhLuanServiceImpl implements BinhLuanService {

    @Autowired
    private BinhLuanRepository repository;

    @Override
    public BinhLuan save(BinhLuan binhLuan) {
        return repository.save(binhLuan);
    }

    @Override
    public Optional<BinhLuan> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<BinhLuan> findAll() {
        return repository.findAll();
    }

    @Override
    public List<BinhLuan> findByKhachhangId(int makh) {
        return repository.findByKhachhangId(makh);
    }

    @Override
    public List<BinhLuan> findBySanphamId(int masp) {
        return repository.findBySanphamId(masp);
    }
}
