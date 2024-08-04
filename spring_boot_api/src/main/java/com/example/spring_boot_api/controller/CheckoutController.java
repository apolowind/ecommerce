package com.example.spring_boot_api.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Value("${stripe.publishableKey}")
    private String publishableKey;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody OrderRequest orderRequest) {
        try {
            long totalAmount = orderRequest.getTongdonhang();


            System.out.println("giá trị đơn hàng " + (totalAmount / 23000));

            // Tạo line item cho thanh toán
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("usd")
                                    .setUnitAmount((totalAmount))
                                    .setProductData(
                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName(orderRequest.getTenn())
                                                    .build())
                                    .build())
                    .setQuantity(1L) // Giả sử chỉ có 1 sản phẩm
                    .build();

            SessionCreateParams params = SessionCreateParams.builder()
                    .addLineItem(lineItem)
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl("http://localhost:3500/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl("http://localhost:3500/cancel")
                    .build();

            Session session = Session.create(params);

            // Lưu thông tin đơn hàng vào database
            // Ở đây bạn cần implement logic lưu trữ đơn hàng với thông tin từ orderRequest

            return ResponseEntity.ok(Map.of("id", session.getId(), "url", session.getUrl()));
        } catch (StripeException e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    static class OrderRequest {
        private String diachi;
        private KhachHang khachhang;
        private String ngaydat;
        private String ngaynhan;
        private long phivanchuyen;
        private String sdtnn;
        private String tenn;
        private String trangthai;
        private long tongdonhang;

        // Constructor
        public OrderRequest() {}

        public OrderRequest(String diachi, KhachHang khachhang, String ngaydat, String ngaynhan, long phivanchuyen, String sdtnn, String tenn, String trangthai, long tongdonhang) {
            this.diachi = diachi;
            this.khachhang = khachhang;
            this.ngaydat = ngaydat;
            this.ngaynhan = ngaynhan;
            this.phivanchuyen = phivanchuyen;
            this.sdtnn = sdtnn;
            this.tenn = tenn;
            this.trangthai = trangthai;
            this.tongdonhang = tongdonhang;
        }

        // Getters and setters
        public String getDiachi() {
            return diachi;
        }

        public void setDiachi(String diachi) {
            this.diachi = diachi;
        }

        public KhachHang getKhachhang() {
            return khachhang;
        }

        public void setKhachhang(KhachHang khachhang) {
            this.khachhang = khachhang;
        }

        public String getNgaydat() {
            return ngaydat;
        }

        public void setNgaydat(String ngaydat) {
            this.ngaydat = ngaydat;
        }

        public String getNgaynhan() {
            return ngaynhan;
        }

        public void setNgaynhan(String ngaynhan) {
            this.ngaynhan = ngaynhan;
        }

        public long getPhivanchuyen() {
            return phivanchuyen;
        }

        public void setPhivanchuyen(long phivanchuyen) {
            this.phivanchuyen = phivanchuyen;
        }

        public String getSdtnn() {
            return sdtnn;
        }

        public void setSdtnn(String sdtnn) {
            this.sdtnn = sdtnn;
        }

        public String getTenn() {
            return tenn;
        }

        public void setTenn(String tenn) {
            this.tenn = tenn;
        }

        public String getTrangthai() {
            return trangthai;
        }

        public void setTrangthai(String trangthai) {
            this.trangthai = trangthai;
        }

        public long getTongdonhang() {
            return tongdonhang;
        }

        public void setTongdonhang(long tongdonhang) {
            this.tongdonhang = tongdonhang;
        }
    }

    static class KhachHang {
        private int makh;

        // Constructor
        public KhachHang() {}

        public KhachHang(int makh) {
            this.makh = makh;
        }

        // Getters and setters
        public int getMakh() {
            return makh;
        }

        public void setMakh(int makh) {
            this.makh = makh;
        }
    }
}
