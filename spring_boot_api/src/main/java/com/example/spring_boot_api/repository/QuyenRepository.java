package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.Quyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface QuyenRepository extends JpaRepository<Quyen, Integer> {
    List<Quyen> findByTenquyenContaining(String tenquyen);
}
