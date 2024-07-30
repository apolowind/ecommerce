package com.example.repository;

import com.example.entity.Hang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HangRepository extends JpaRepository<Hang, Integer> {
}
