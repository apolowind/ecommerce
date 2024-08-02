import { CopyOutlined, HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { BackTop, Breadcrumb, Button, Card, Col, Form, Input, message, Modal, notification, Row, Select, Space, Spin, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosClient from '../../apis/axiosClient';
import QuyenApi from '../../apis/quyenApi';
import userApi from "../../apis/userApi";
import "./accountManagement.css";

const { Option } = Select;

const AccountManagement = () => {

    const [user, setUser] = useState([]);
    const [quyen, setQuyen] = useState([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [form] = Form.useForm();

    const history = useHistory();

    const titleCase = (str) => {
        var splitStr = str?.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'index',
            render: (value, item, index) => (
                (page - 1) * 10 + (index + 1)
            ),
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'tendangnhap',
            key: 'tendangnhap',
            render: (text, record) => (
                <Space size="middle">
                    {
                        text == null || text == undefined ? "" :
                            <p style={{ margin: 0 }}>{titleCase(text)}</p>
                    }

                </Space>
            ),
        },
        {
            title: 'Quyền',
            dataIndex: 'quyen',
            key: 'quyen',
            width: '12%',
            render: (text, record) => (
                <Space size="middle">
                    {
                        <Tag color="blue" key={text} style={{ width: 120, textAlign: "center" }} icon={<CopyOutlined />}>
                            {text?.tenquyen}
                        </Tag>
                    }
                </Space>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'quyen',
            key: 'quyen',
            render: (text, record) => (
                <Space size="middle">
                    <div> {text.mota}</div>
                </Space>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangthai',
            key: 'trangthai',
            render: (text, record) => (
                <Space size="middle">
                    {

                        text ?
                            <Tag color="green" key={text} style={{ width: 80, textAlign: "center" }}>
                                Hoạt động
                            </Tag> : text == "newer" ? <Tag color="blue" key={text} style={{ width: 80, textAlign: "center" }}>
                                Newer
                            </Tag>

                                : <Tag color="default" key={text} style={{ width: 80, textAlign: "center" }}>
                                    Chặn
                                </Tag>
                    }

                </Space>
            ),
        },
    ];

    const handleListUser = async () => {
        try {
            const response = await userApi.listUserByAdmin({ page: 1, limit: 1000 });
            console.log(response);
            setUser(response);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }

    const handleListQuyen = async () => {
        try {
            const response = await QuyenApi.getAll();
            console.log(response);
            setQuyen(response);
            setLoading(false);
        } catch (error) {
            console.log('Failed to fetch event list:' + error);
        }
    }



    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const accountCreate = async (values) => {
        try {
            const formatData = {
                "tendangnhap": values.tendangnhap,
                "maquyen": values.maquyen,
                "matkhau": values.matkhau,
                "trangthai": true
            }
            await axiosClient.post("/tai-khoan/register", formatData)
                .then(response => {
                    console.log(response)
                    if (response == "User with this phone number already exists") {
                        return message.error('Số điện thoại không được trùng');
                    }

                    if (response == "User with this email already exists") {
                        return message.error('Email không được trùng');
                    }

                    if (response == "User already exists") {
                        return message.error('Tài khoản đã tổn tại');
                    } else
                        if (response.message == "Validation failed: Email has already been taken") {
                            message.error('Email has already been taken');
                        } else
                            if (response.message == "Validation failed: Phone has already been taken") {
                                message.error('Validation failed: Phone has already been taken');
                            } else
                                if (response == undefined) {
                                    notification["error"]({
                                        message: `Thông báo`,
                                        description:
                                            'Tạo tài khoản thất bại',

                                    });
                                }
                                else {
                                    notification["success"]({
                                        message: `Thông báo`,
                                        description:
                                            'Tạo tài khoản thành công',
                                    });
                                    form.resetFields();
                                    handleList();
                                    history.push("/account-management");
                                }
                }
                );

            setIsModalVisible(false);

        } catch (error) {
            throw error;
        }
        setTimeout(function () {
            setLoading(false);
        }, 1000);
    }

    const CancelCreateRecruitment = () => {
        setIsModalVisible(false);
        form.resetFields();
        history.push("/account-management");
    }

    const handleList = () => {
        (async () => {
            try {
                handleListUser();
                handleListQuyen();
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch user list:' + error);
            }
        })();
    }

    useEffect(() => {
        handleList();
        window.scrollTo(0, 0);

    }, [])
    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <UserOutlined />
                            <span>Quản lý tài khoản</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div id="account">
                    <div id="account_container">
                        <PageHeader
                            subTitle=""
                            style={{ fontSize: 14, paddingTop: 20, paddingBottom: 20 }}
                        >
                            <Row>
                                <Col span="12">

                                </Col>
                                <Col span="12">
                                    <Row justify="end">
                                        <Button style={{ marginLeft: 10 }} icon={<PlusOutlined />} size="middle" onClick={showModal}>{"Tạo tài khoản"}</Button>
                                    </Row>
                                </Col>
                            </Row>

                        </PageHeader>
                    </div>
                </div>
                <div style={{ marginTop: 20, marginRight: 5 }}>
                    <div id="account">
                        <div id="account_container">
                            <Card title="Quản lý tài khoản" bordered={false} >
                                <Table columns={columns} dataSource={user} pagination={{ position: ['bottomCenter'] }}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Thêm tài khoản"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={accountCreate}
                        name="accountCreate"
                        layout="vertical"
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >

                        <Form.Item
                            name="tendangnhap"
                            label="Tên đăng nhập"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên đăng nhập!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="matkhau"
                            label="Mật khẩu"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập password!',
                                },
                                { max: 20, message: 'Mật khẩu tối đa 20 ký tự' },
                                { min: 6, message: 'Mật khẩu ít nhất 5 ký tự' },
                            ]
                            }
                            style={{ marginBottom: 10 }}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            name="maquyen"
                            label="Phân quyền"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phân quyền!',
                                },
                            ]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn phân quyền">
                                {quyen.map(role => (
                                    <Option key={role.maquyen} value={role.maquyen}>
                                        {role.tenquyen}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20, marginLeft: 8 }} htmlType="submit">
                                Hoàn thành
                            </Button>
                            <Button style={{ background: "#FF8000", color: '#FFFFFF', float: 'right', marginTop: 20 }} onClick={CancelCreateRecruitment}>
                                Hủy
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <BackTop style={{ textAlign: 'right' }} />
            </Spin>
        </div>
    )
}

export default AccountManagement;