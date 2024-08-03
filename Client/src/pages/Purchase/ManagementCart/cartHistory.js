import {
    Breadcrumb, Button, Card, Divider,
    Modal,
    Spin, Table, Tag,
    notification
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosClient from "../../../apis/axiosClient";
import "./cartHistory.css";
import khachHangApi from "../../../apis/khachHangApi";
import donHangApi from "../../../apis/donHangApi";

const CartHistory = () => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
    const history = useHistory();


    const handleCancelOrder = (order) => {
        console.log(order);
        Modal.confirm({
            title: 'Xác nhận hủy đơn hàng',
            content: 'Bạn có chắc muốn hủy đơn hàng này?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            onOk() {
                handleUpdateOrder(order._id);
            },
        });
    };


    const handleUpdateOrder = async (id) => {
        setLoading(true);
        try {
            const categoryList = {
                "description": "Khách hàng hủy đơn hàng!",
                "status": "rejected"
            }
            await axiosClient.put("/order/" + id, categoryList).then(response => {
                if (response === undefined) {
                    notification["error"]({
                        message: `Thông báo`,
                        description:
                            'Cập nhật thất bại',
                    });
                }
                else {
                    notification["success"]({
                        message: `Thông báo`,
                        description:
                            'Cập nhật thành công',
                    });
                }
            })

            handleList();
            setLoading(false);

        } catch (error) {
            throw error;
        }
    }

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "madh",
            key: "madh",
        },
        {
            title: "Tên người nhận",
            dataIndex: "tenn",
            key: "tenn",
        },
        {
            title: "Số điện thoại",
            dataIndex: "sdtnn",
            key: "sdtnn",
        },
        {
            title: "Địa chỉ",
            dataIndex: "diachi",
            key: "diachi",
        },
        {
            title: "Trạng thái",
            dataIndex: "trangthai",
            key: "trangthai",
            render: (trangthai) => (
                <span>
                    {trangthai === "Rejected" ? (
                        <Tag style={{ width: 150, textAlign: "center" }} color="red">
                            Đã hủy
                        </Tag>
                    ) : trangthai === "Approved" ? (
                        <Tag
                            style={{ width: 150, textAlign: "center" }}
                            color="geekblue"
                        >
                            Vận chuyển
                        </Tag>
                    ) : trangthai === "Final" ? (
                        <Tag color="green" style={{ width: 150, textAlign: "center" }}>
                            Đã giao - Đã thanh toán
                        </Tag>
                    ) : (
                        <Tag color="blue" style={{ width: 150, textAlign: "center" }}>
                            Đợi xác nhận
                        </Tag>
                    )}
                </span>
            ),
        },
        {
            title: "Ngày đặt",
            dataIndex: "ngaydat",
            key: "ngaydat",
            render: (ngaydat) => (
                <span>{moment(ngaydat).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Ngày nhận",
            dataIndex: "ngaynhan",
            key: "ngaynhan",
            render: (ngaynhan) => (
                <span>{moment(ngaynhan).format("DD/MM/YYYY")}</span>
            ),
        },
        {
            title: "Phí vận chuyển",
            dataIndex: "phivanchuyen",
            key: "phivanchuyen",
            render: (phivanchuyen) => (
                <span>{phivanchuyen.toLocaleString("vi", { style: "currency", currency: "VND" })}</span>
            ),
        },
    ];
    

    const handleList = () => {
        (async () => {
            try {
                const local = localStorage.getItem("customer");
                const user = JSON.parse(local);
    
                if (user && user.makh) {
                    await donHangApi.getAll().then((item) => {
                        // Lọc danh sách đơn hàng dựa trên makh
                        const filteredOrders = item.filter(order => order.khachhang.makh === user.makh);
                        console.log(filteredOrders);
                        setOrderList(filteredOrders);
                    });
                } else {
                    console.error("Customer information not found in localStorage");
                }
                
                setLoading(false);
            } catch (error) {
                console.log("Failed to fetch order list:" + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);
    }, []);

    // Thêm vào component của bạn
    const handleProductClick = (id) => {
        history.push("/product-detail/" + id);
    };

    return (
        <div>
            <Spin spinning={false}>
                <Card className="container_details">
                    <div className="product_detail">
                        <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="http://localhost:3500/home">
                                    <span>Trang chủ</span>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="">
                                    <span>Quản lý đơn hàng </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <hr></hr>
                        <div className="container" style={{ marginBottom: 30 }}>

                            <br></br>
                            <Card>
                                <Table
                                    columns={columns}
                                    dataSource={orderList}
                                    rowKey="_id"
                                    pagination={{ position: ["bottomCenter"] }}
                                />
                            </Card>
                        </div>
                    </div>
                </Card>
            </Spin>
        </div>
    );
};

export default CartHistory;
