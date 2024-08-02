package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.Hang;
import com.example.spring_boot_api.repository.HangRepository;
import com.example.spring_boot_api.service.HangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HangServiceImpl implements HangService {

    @Autowired
    private HangRepository hangRepository;

    @Override
    public Hang save(Hang hang) {
        return hangRepository.save(hang);
    }

    @Override
    public Hang update(int id, Hang hang) {
        Optional<Hang> existingHang = hangRepository.findById(id);
        if (existingHang.isPresent()) {
            Hang updatedHang = existingHang.get();
            updatedHang.setTenhang(hang.getTenhang());
            return hangRepository.save(updatedHang);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        hangRepository.deleteById(id);
    }

    @Override
    public Hang findById(int id) {
        return hangRepository.findById(id).orElse(null);
    }

    @Override
    public List<Hang> findAll() {
        return hangRepository.findAll();
    }
}
