package com.example.spring_boot_api.repository;

import com.example.spring_boot_api.entity.Hang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HangRepository extends JpaRepository<Hang, Integer> {
}
