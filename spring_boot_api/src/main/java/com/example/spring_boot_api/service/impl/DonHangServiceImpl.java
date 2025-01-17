package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.DonHang;
import com.example.spring_boot_api.repository.DonHangRepository;
import com.example.spring_boot_api.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonHangServiceImpl implements DonHangService {

    @Autowired
    private DonHangRepository repository;

    @Override
    public DonHang save(DonHang donHang) {
        return repository.save(donHang);
    }

    @Override
    public Optional<DonHang> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<DonHang> findAll() {
        return repository.findAll();
    }

}
