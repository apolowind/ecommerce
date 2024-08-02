package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.DonDatHang;
import com.example.spring_boot_api.repository.DonDatHangRepository;
import com.example.spring_boot_api.service.DonDatHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DonDatHangServiceImpl implements DonDatHangService {

    @Autowired
    private DonDatHangRepository repository;

    @Override
    public DonDatHang save(DonDatHang donDatHang) {
        return repository.save(donDatHang);
    }

    @Override
    public Optional<DonDatHang> findById(int id) {
        return repository.findById(id);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public List<DonDatHang> findAll() {
        return repository.findAll();
    }

    @Override
    public List<DonDatHang> searchByDate(Date ngaydathang) {
        return repository.findByNgaydathang(ngaydathang);
    }
}
