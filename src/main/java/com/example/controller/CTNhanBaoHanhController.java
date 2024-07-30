package com.example.controller;

import com.example.entity.CTNhanBaoHanh;
import com.example.entity.CTNhanBaoHanhId;
import com.example.service.CTNhanBaoHanhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/ctnhanbaohanh")
public class CTNhanBaoHanhController {

    @Autowired
    private CTNhanBaoHanhService ctnhanBaoHanhService;

    @PostMapping
    public ResponseEntity<CTNhanBaoHanh> createCTNhanBaoHanh(@RequestBody CTNhanBaoHanh ctnhanBaoHanh) {
        return ResponseEntity.ok(ctnhanBaoHanhService.save(ctnhanBaoHanh));
    }

    @PutMapping("/{sopbh}/{ngaynhan}")
    public ResponseEntity<CTNhanBaoHanh> updateCTNhanBaoHanh(@PathVariable int sopbh, @PathVariable Date ngaynhan, @RequestBody CTNhanBaoHanh ctnhanBaoHanh) {
        CTNhanBaoHanhId id = new CTNhanBaoHanhId(sopbh, ngaynhan);
        CTNhanBaoHanh updatedCTNhanBaoHanh = ctnhanBaoHanhService.update(id, ctnhanBaoHanh);
        if (updatedCTNhanBaoHanh != null) {
            return ResponseEntity.ok(updatedCTNhanBaoHanh);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sopbh}/{ngaynhan}")
    public ResponseEntity<Void> deleteCTNhanBaoHanh(@PathVariable int sopbh, @PathVariable Date ngaynhan) {
        CTNhanBaoHanhId id = new CTNhanBaoHanhId(sopbh, ngaynhan);
        ctnhanBaoHanhService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{sopbh}/{ngaynhan}")
    public ResponseEntity<CTNhanBaoHanh> getCTNhanBaoHanhById(@PathVariable int sopbh, @PathVariable Date ngaynhan) {
        CTNhanBaoHanhId id = new CTNhanBaoHanhId(sopbh, ngaynhan);
        CTNhanBaoHanh ctnhanBaoHanh = ctnhanBaoHanhService.findById(id);
        if (ctnhanBaoHanh != null) {
            return ResponseEntity.ok(ctnhanBaoHanh);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<CTNhanBaoHanh>> getAllCTNhanBaoHanh() {
        return ResponseEntity.ok(ctnhanBaoHanhService.findAll());
    }
}
