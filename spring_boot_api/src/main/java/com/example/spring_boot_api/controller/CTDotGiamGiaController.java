package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.CTDotGiamGia;
import com.example.spring_boot_api.entity.CTDotGiamGiaId;
import com.example.spring_boot_api.service.CTDotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ct-dot-giam-gia")
public class CTDotGiamGiaController {

    @Autowired
    private CTDotGiamGiaService service;

    @PostMapping
    public ResponseEntity<CTDotGiamGia> create(@RequestBody CTDotGiamGia ctDotGiamGia) {
        CTDotGiamGia created = service.save(ctDotGiamGia);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<CTDotGiamGia> update(@RequestBody CTDotGiamGia ctDotGiamGia) {
        CTDotGiamGiaId id = ctDotGiamGia.getId();
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        CTDotGiamGia updated = service.save(ctDotGiamGia);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{masp}/{madgg}")
    public ResponseEntity<Void> deleteById(@PathVariable int masp, @PathVariable int madgg) {
        CTDotGiamGiaId id = new CTDotGiamGiaId(masp, madgg);
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CTDotGiamGia>> getAll() {
        List<CTDotGiamGia> ctDotGiamGias = service.findAll();
        return ResponseEntity.ok(ctDotGiamGias);
    }

    @GetMapping("/search/sanpham/{masp}")
    public ResponseEntity<List<CTDotGiamGia>> searchBySanpham(@PathVariable int masp) {
        List<CTDotGiamGia> ctDotGiamGias = service.searchBySanpham(masp);
        return ResponseEntity.ok(ctDotGiamGias);
    }

    @GetMapping("/search/dotgiamgia/{madgg}")
    public ResponseEntity<List<CTDotGiamGia>> searchByDotgiamgia(@PathVariable int madgg) {
        List<CTDotGiamGia> ctDotGiamGias = service.searchByDotgiamgia(madgg);
        return ResponseEntity.ok(ctDotGiamGias);
    }
}
