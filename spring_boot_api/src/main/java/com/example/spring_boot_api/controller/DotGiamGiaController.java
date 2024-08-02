package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.DotGiamGia;
import com.example.spring_boot_api.service.DotGiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dotgiamgia")
public class DotGiamGiaController {

    @Autowired
    private DotGiamGiaService dotGiamGiaService;

    @PostMapping
    public ResponseEntity<DotGiamGia> createDotGiamGia(@RequestBody DotGiamGia dotGiamGia) {
        return ResponseEntity.ok(dotGiamGiaService.save(dotGiamGia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DotGiamGia> updateDotGiamGia(@PathVariable int id, @RequestBody DotGiamGia dotGiamGia) {
        DotGiamGia updatedDotGiamGia = dotGiamGiaService.update(id, dotGiamGia);
        if (updatedDotGiamGia != null) {
            return ResponseEntity.ok(updatedDotGiamGia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDotGiamGia(@PathVariable int id) {
        dotGiamGiaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DotGiamGia> getDotGiamGiaById(@PathVariable int id) {
        DotGiamGia dotGiamGia = dotGiamGiaService.findById(id);
        if (dotGiamGia != null) {
            return ResponseEntity.ok(dotGiamGia);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DotGiamGia>> getAllDotGiamGia() {
        return ResponseEntity.ok(dotGiamGiaService.findAll());
    }
}
