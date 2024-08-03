import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, message, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import "./register.css";
import userApi from '../../apis/userApi';
import khachHangApi from '../../apis/khachHangApi';

const { Search } = Input;

const RegisterCustomer = () => {
    const [loading, setLoading] = useState(false);
    let history = useHistory();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Đăng ký tài khoản
            const response = await userApi.register({
                maquyen: 4,
                matkhau: values.matkhau,
                tendangnhap: values.tendangnhap,
                trangthai: true
            });

            // Thêm thông tin khách hàng
            const khachHangData = {
                cmnd: values.cmnd,
                diachi: values.diachi,
                email: values.email,
                ho: values.ho,
                ngaysinh: values.ngaysinh.format('YYYY-MM-DD'),
                sodienthoai: values.sodienthoai,
                taikhoan: {
                    tendangnhap: values.tendangnhap,
                },
                ten: values.ten
            };

            await khachHangApi.createKhachHang(khachHangData);

            message.success('Đăng ký thành công!');
            console.log(response);
            history.push("/login");
        } catch (error) {
            message.error('Đăng ký thất bại!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="imageBackground">
                <div id="wrapper">
                    <Card id="dialog" bordered={false} >
                        <Form
                            style={{ width: 400, marginBottom: 8 }}
                            name="normal_login"
                            className="loginform"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <Form.Item style={{ marginBottom: 3 }}>
                                <Divider style={{ marginBottom: 5, fontSize: 19 }} orientation="center">Mobile Store</Divider>
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 16 }}>
                                <p className="text">Đăng Kí Tài Khoản Khách Hàng</p>
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="tendangnhap"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên đăng nhập!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="Tên đăng nhập" />
                            </Form.Item >

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="matkhau"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="siteformitemicon" />}
                                    type="password"
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="ho"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="Họ" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="ten"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="Tên" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    }
                                ]}
                            >
                                <Input prefix={<MailOutlined className="siteformitemicon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="sodienthoai"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input prefix={<PhoneOutlined className="siteformitemicon" />} placeholder="Số điện thoại" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="cmnd"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập CMND!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="CMND" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="diachi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="siteformitemicon" />} placeholder="Địa chỉ" />
                            </Form.Item>

                            <Form.Item
                                style={{ marginBottom: 20 }}
                                name="ngaysinh"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày sinh!',
                                    },
                                ]}
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD"
                                    placeholder="Ngày sinh"
                                />
                            </Form.Item>

                            <Form.Item style={{ marginBottom: 18 }}>
                                <Button className="loginformbutton" type="primary" htmlType="submit" loading={loading}>
                                    Đăng Kí
                                </Button>
                            </Form.Item>
                            <div className="link-login">
                                Đã có tài khoản? <Link className="link" to="/login">Đăng nhập</Link>
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RegisterCustomer;
