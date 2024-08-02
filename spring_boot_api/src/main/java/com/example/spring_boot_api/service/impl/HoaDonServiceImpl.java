package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.HoaDon;
import com.example.spring_boot_api.repository.HoaDonRepository;
import com.example.spring_boot_api.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepository repository;

    @Override
    public HoaDon save(HoaDon hoaDon) {
        return repository.save(hoaDon);
    }

    @Override
    public Optional<HoaDon> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<HoaDon> findAll() {
        return repository.findAll();
    }
}
