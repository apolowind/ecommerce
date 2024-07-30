package com.example.controller;

import com.example.entity.DonDatHang;
import com.example.service.DonDatHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/dondathang")
public class DonDatHangController {

    @Autowired
    private DonDatHangService service;

    @PostMapping
    public ResponseEntity<DonDatHang> create(@RequestBody DonDatHang donDatHang) {
        DonDatHang created = service.save(donDatHang);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<DonDatHang> update(@RequestBody DonDatHang donDatHang) {
        int id = donDatHang.getMaddh();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        DonDatHang updated = service.save(donDatHang);
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
    public ResponseEntity<DonDatHang> getById(@PathVariable int id) {
        Optional<DonDatHang> donDatHang = service.findById(id);
        return donDatHang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<DonDatHang>> getAll() {
        List<DonDatHang> donDatHangs = service.findAll();
        return ResponseEntity.ok(donDatHangs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<DonDatHang>> searchByDate(@RequestParam("ngaydathang") Date ngaydathang) {
        List<DonDatHang> donDatHangs = service.searchByDate(ngaydathang);
        return ResponseEntity.ok(donDatHangs);
    }
}
