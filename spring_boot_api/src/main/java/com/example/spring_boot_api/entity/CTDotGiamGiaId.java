package com.example.spring_boot_api.entity;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class CTDotGiamGiaId implements Serializable {
    private int masp;
    private int madgg;

    // Constructor không tham số
    public CTDotGiamGiaId() {
    }

    // Constructor có tham số
    public CTDotGiamGiaId(int masp, int madgg) {
        this.masp = masp;
        this.madgg = madgg;
    }

    // Overriding hashCode và equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTDotGiamGiaId that = (CTDotGiamGiaId) o;
        return masp == that.masp && madgg == that.madgg;
    }

    @Override
    public int hashCode() {
        return Objects.hash(masp, madgg);
    }
}
