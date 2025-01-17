package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.PhieuTra;
import com.example.spring_boot_api.repository.PhieuTraRepository;
import com.example.spring_boot_api.service.PhieuTraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhieuTraServiceImpl implements PhieuTraService {

    @Autowired
    private PhieuTraRepository repository;

    @Override
    public PhieuTra save(PhieuTra phieuTra) {
        return repository.save(phieuTra);
    }

    @Override
    public Optional<PhieuTra> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<PhieuTra> findAll() {
        return repository.findAll();
    }
}
