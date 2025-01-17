package com.example.spring_boot_api.service;

import com.example.spring_boot_api.entity.Hang;

import java.util.List;

public interface HangService {
    Hang save(Hang hang);
    Hang update(int id, Hang hang);
    void delete(int id);
    Hang findById(int id);
    List<Hang> findAll();
}
