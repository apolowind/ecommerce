package com.example.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class CTDonDatHangId implements Serializable {
    private int masp;
    private int maddh;

    // Constructor không tham số
    public CTDonDatHangId() {
    }

    // Constructor với tham số
    public CTDonDatHangId(int masp, int maddh) {
        this.masp = masp;
        this.maddh = maddh;
    }

    // hashCode và equals
    @Override
    public int hashCode() {
        return Objects.hash(masp, maddh);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CTDonDatHangId that = (CTDonDatHangId) o;
        return masp == that.masp && maddh == that.maddh;
    }
}
