package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.CTDotGiamGia;
import com.example.spring_boot_api.entity.CTDotGiamGiaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CTDotGiamGiaRepository extends JpaRepository<CTDotGiamGia, CTDotGiamGiaId> {
    List<CTDotGiamGia> findBySanphamMasp(int masp);
    List<CTDotGiamGia> findByDotgiamgiaMadgg(int madgg);
}
