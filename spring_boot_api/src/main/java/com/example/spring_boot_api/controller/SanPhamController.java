package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.LoaiSanPham;
import com.example.spring_boot_api.entity.SanPham;
import com.example.spring_boot_api.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sanpham")
public class SanPhamController {

    @Autowired
    private SanPhamService sanPhamService;

    @PostMapping
    public ResponseEntity<SanPham> createSanPham(@RequestBody SanPham sanPham) {
        return ResponseEntity.ok(sanPhamService.save(sanPham));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SanPham> updateSanPham(@PathVariable int id, @RequestBody SanPham sanPham) {
        SanPham updatedSanPham = sanPhamService.update(id, sanPham);
        if (updatedSanPham != null) {
            return ResponseEntity.ok(updatedSanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanPham(@PathVariable int id) {
        sanPhamService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable int id) {
        SanPham sanPham = sanPhamService.findById(id);
        if (sanPham != null) {
            return ResponseEntity.ok(sanPham);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<SanPham>> getAllSanPham() {
        return ResponseEntity.ok(sanPhamService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<SanPham>> searchSanPhamByName(@RequestParam String name) {
        return ResponseEntity.ok(sanPhamService.searchByName(name));
    }

    @GetMapping("/loaisanpham/{maloaisp}")
    public ResponseEntity<List<SanPham>> getSanPhamByLoaiSanPham(@PathVariable int maloaisp) {
        LoaiSanPham loaiSanPham = new LoaiSanPham();
        loaiSanPham.setMaloaisp(maloaisp);
        return ResponseEntity.ok(sanPhamService.findByLoaiSanPham(loaiSanPham));
    }
}
