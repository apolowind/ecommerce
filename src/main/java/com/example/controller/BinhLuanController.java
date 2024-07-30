package com.example.controller;

import com.example.entity.BinhLuan;
import com.example.service.BinhLuanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/binhluan")
public class BinhLuanController {

    @Autowired
    private BinhLuanService service;

    @PostMapping
    public ResponseEntity<BinhLuan> create(@RequestBody BinhLuan binhLuan) {
        BinhLuan created = service.save(binhLuan);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<BinhLuan> update(@RequestBody BinhLuan binhLuan) {
        if (!service.findById(binhLuan.getMabl()).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        BinhLuan updated = service.save(binhLuan);
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
    public ResponseEntity<BinhLuan> getById(@PathVariable int id) {
        Optional<BinhLuan> binhLuan = service.findById(id);
        return binhLuan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<BinhLuan>> getAll() {
        List<BinhLuan> binhLuans = service.findAll();
        return ResponseEntity.ok(binhLuans);
    }

    @GetMapping("/khachhang/{makh}")
    public ResponseEntity<List<BinhLuan>> getByKhachhang(@PathVariable int makh) {
        List<BinhLuan> binhLuans = service.findByKhachhangId(makh);
        return ResponseEntity.ok(binhLuans);
    }

    @GetMapping("/sanpham/{masp}")
    public ResponseEntity<List<BinhLuan>> getBySanpham(@PathVariable int masp) {
        List<BinhLuan> binhLuans = service.findBySanphamId(masp);
        return ResponseEntity.ok(binhLuans);
    }
}
