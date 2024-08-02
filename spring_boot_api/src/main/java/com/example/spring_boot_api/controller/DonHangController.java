package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.DonHang;
import com.example.spring_boot_api.service.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/donhang")
public class DonHangController {

    @Autowired
    private DonHangService service;

    @PostMapping
    public ResponseEntity<DonHang> create(@RequestBody DonHang donHang) {
        DonHang created = service.save(donHang);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<DonHang> update(@RequestBody DonHang donHang) {
        Optional<DonHang> existing = service.findById(donHang.getMadh());
        if (!existing.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        DonHang updated = service.save(donHang);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable int id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonHang> getById(@PathVariable int id) {
        Optional<DonHang> donHang = service.findById(id);
        return donHang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DonHang>> getAll() {
        List<DonHang> donHangs = service.findAll();
        return ResponseEntity.ok(donHangs);
    }

}
