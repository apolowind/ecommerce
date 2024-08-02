package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.LoaiSanPham;
import com.example.spring_boot_api.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loaisanpham")
public class LoaiSanPhamController {

    @Autowired
    private LoaiSanPhamService loaiSanPhamService;

    @PostMapping
    public ResponseEntity<LoaiSanPham> createLoaiSanPham(@RequestBody LoaiSanPham loaiSanPham) {
        return ResponseEntity.ok(loaiSanPhamService.save(loaiSanPham));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoaiSanPham> updateLoaiSanPham(@PathVariable int id, @RequestBody LoaiSanPham loaiSanPham) {
        LoaiSanPham updatedLoaiSanPham = loaiSanPhamService.update(id, loaiSanPham);
        if (updatedLoaiSanPham != null) {
            return ResponseEntity.ok(updatedLoaiSanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoaiSanPham(@PathVariable int id) {
        loaiSanPhamService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoaiSanPham> getLoaiSanPhamById(@PathVariable int id) {
        LoaiSanPham loaiSanPham = loaiSanPhamService.findById(id);
        if (loaiSanPham != null) {
            return ResponseEntity.ok(loaiSanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<LoaiSanPham>> getAllLoaiSanPham() {
        return ResponseEntity.ok(loaiSanPhamService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<LoaiSanPham>> searchLoaiSanPhamByName(@RequestParam String name) {
        return ResponseEntity.ok(loaiSanPhamService.searchByName(name));
    }
}
