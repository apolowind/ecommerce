package com.example.spring_boot_api.service.impl;

import com.example.spring_boot_api.entity.Quyen;
import com.example.spring_boot_api.repository.QuyenRepository;
import com.example.spring_boot_api.service.QuyenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuyenServiceImpl implements QuyenService {

    @Autowired
    private QuyenRepository quyenRepository;

    @Override
    public Quyen save(Quyen quyen) {
        return quyenRepository.save(quyen);
    }

    @Override
    public Quyen update(int id, Quyen quyen) {
        Optional<Quyen> existingQuyen = quyenRepository.findById(id);
        if (existingQuyen.isPresent()) {
            Quyen updatedQuyen = existingQuyen.get();
            updatedQuyen.setTenquyen(quyen.getTenquyen());
            updatedQuyen.setMota(quyen.getMota());
            return quyenRepository.save(updatedQuyen);
        } else {
            return null; // or throw an exception
        }
    }

    @Override
    public void delete(int id) {
        quyenRepository.deleteById(id);
    }

    @Override
    public Quyen findById(int id) {
        return quyenRepository.findById(id).orElse(null);
    }

    @Override
    public List<Quyen> findAll() {
        return quyenRepository.findAll();
    }

    @Override
    public List<Quyen> searchByName(String name) {
        return quyenRepository.findByTenquyenContaining(name);
    }
}
