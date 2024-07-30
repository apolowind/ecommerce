package com.example.controller;

import com.example.entity.HoaDon;
import com.example.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hoadon")
public class HoaDonController {

    @Autowired
    private HoaDonService service;

    @PostMapping
    public ResponseEntity<HoaDon> create(@RequestBody HoaDon hoaDon) {
        HoaDon created = service.save(hoaDon);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<HoaDon> update(@RequestBody HoaDon hoaDon) {
        int id = hoaDon.getSohoadon();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        HoaDon updated = service.save(hoaDon);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoaDon> getById(@PathVariable int id) {
        Optional<HoaDon> hoaDon = service.findById(id);
        return hoaDon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<HoaDon>> getAll() {
        List<HoaDon> hoaDons = service.findAll();
        return ResponseEntity.ok(hoaDons);
    }
}
