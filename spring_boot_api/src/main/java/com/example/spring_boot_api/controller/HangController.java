package com.example.spring_boot_api.controller;

import com.example.spring_boot_api.entity.Hang;
import com.example.spring_boot_api.service.HangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hang")
public class HangController {

    @Autowired
    private HangService hangService;

    @PostMapping
    public ResponseEntity<Hang> createHang(@RequestBody Hang hang) {
        return ResponseEntity.ok(hangService.save(hang));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hang> updateHang(@PathVariable int id, @RequestBody Hang hang) {
        Hang updatedHang = hangService.update(id, hang);
        if (updatedHang != null) {
            return ResponseEntity.ok(updatedHang);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHang(@PathVariable int id) {
        hangService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hang> getHangById(@PathVariable int id) {
        Hang hang = hangService.findById(id);
        if (hang != null) {
            return ResponseEntity.ok(hang);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Hang>> getAllHang() {
        return ResponseEntity.ok(hangService.findAll());
    }
}
