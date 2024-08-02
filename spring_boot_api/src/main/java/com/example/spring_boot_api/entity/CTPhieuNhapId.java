package com.example.spring_boot_api.entity;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class CTPhieuNhapId implements Serializable {
    private int masp;
    private int mapn;

    // Default constructor
    public CTPhieuNhapId() {
    }

    // Constructor with parameters
    public CTPhieuNhapId(int masp, int mapn) {
        this.masp = masp;
        this.mapn = mapn;
    }

    // hashCode and equals methods
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTPhieuNhapId that = (CTPhieuNhapId) o;
        return masp == that.masp && mapn == that.mapn;
    }

    @Override
    public int hashCode() {
        return Objects.hash(masp, mapn);
    }
}
