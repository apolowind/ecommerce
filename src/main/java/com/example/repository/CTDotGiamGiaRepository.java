package com.example.repository;

import com.example.entity.CTDotGiamGia;
import com.example.entity.CTDotGiamGiaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CTDotGiamGiaRepository extends JpaRepository<CTDotGiamGia, CTDotGiamGiaId> {
    List<CTDotGiamGia> findBySanphamId(int masp);
    List<CTDotGiamGia> findByDotgiamgiaId(int madgg);
}
