package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.BinhLuan;
import com.example.spring_boot_api.repository.BinhLuanRepository;
import com.example.spring_boot_api.service.BinhLuanService;
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
    public List<BinhLuan> findByKhachhangMakh(int makh) {
        return repository.findByKhachhangMakh(makh);
    }

    @Override
    public List<BinhLuan> findBySanphamMasp(int masp) {
        return repository.findBySanphamMasp(masp);
    }
}
