import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, notification, Spin, Popconfirm, Space, Row, Col, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import nhanVienApi from '../../apis/nhanVienApi';
import taiKhoanApi from '../../apis/taiKhoanApi';
import moment from 'moment';

const { PageHeader } = require('@ant-design/pro-layout');

const NhanVienManagement = () => {
    const [nhanVienList, setNhanVienList] = useState([]);
    const [taiKhoanList, setTaiKhoanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchNhanVienList();
        fetchTaiKhoanList();
    }, []);

    const fetchNhanVienList = async () => {
        try {
            const response = await nhanVienApi.getAll();
            setNhanVienList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch nhan vien list:', error);
        }
    };

    const fetchTaiKhoanList = async () => {
        try {
            const response = await taiKhoanApi.getAll();
            setTaiKhoanList(response);
        } catch (error) {
            console.error('Failed to fetch tai khoan list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                taikhoan: { tendangnhap: values.taikhoan }
            };
            await nhanVienApi.createNhanVien(data);
            notification.success({ message: 'Tạo nhân viên thành công' });
            setOpenModalCreate(false);
            fetchNhanVienList();
        } catch (error) {
            notification.error({ message: 'Tạo nhân viên thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                taikhoan: { tendangnhap: values.taikhoan }
            };
            await nhanVienApi.updateNhanVien(currentId, data);
            notification.success({ message: 'Chỉnh sửa nhân viên thành công' });
            setOpenModalUpdate(false);
            fetchNhanVienList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa nhân viên thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await nhanVienApi.deleteNhanVien(id);
            notification.success({ message: 'Xóa nhân viên thành công' });
            fetchNhanVienList();
        } catch (error) {
            notification.error({ message: 'Xóa nhân viên thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await nhanVienApi.getDetailNhanVien(id);
            form2.setFieldsValue({
                ...response,
                ngaysinh: moment(response.ngaysinh),
                taikhoan: response.tendangnhap
            });
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch nhan vien details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã nhân viên',
            dataIndex: 'manv',
            key: 'manv',
        },
        {
            title: 'Tên',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Họ',
            dataIndex: 'ho',
            key: 'ho',
        },
        {
            title: 'CMND',
            dataIndex: 'cmnd',
            key: 'cmnd',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            key: 'ngaysinh',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sodienthoai',
            key: 'sodienthoai',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taikhoan',
            key: 'taikhoan',
            render: (text) => text ? text.tendangnhap : '',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.manv)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhân viên này?"
                        onConfirm={() => handleDelete(record.manv)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            style={{ width: 150, borderRadius: 15, height: 30 }}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div className="nhanvien-management-container">
            <Spin spinning={loading}>
                <div style={{ marginTop: 20 }}>
                    <PageHeader
                        subTitle=""
                        style={{ fontSize: 14 }}
                    >
                        <Row>
                            <Col span="18"></Col>
                            <Col span="6">
                                <Row justify="end">
                                    <Space>
                                        <Button
                                            key="1"
                                            icon={<PlusOutlined />}
                                            onClick={() => setOpenModalCreate(true)}
                                        >
                                            Tạo nhân viên mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={nhanVienList}
                    rowKey="manv"
                />

                <Modal
                    title="Tạo nhân viên mới"
                    visible={openModalCreate}
                    onOk={() => {
                        form.validateFields()
                            .then(values => {
                                form.resetFields();
                                handleCreate(values);
                            })
                            .catch(info => console.log('Validate Failed:', info));
                    }}
                    onCancel={() => setOpenModalCreate(false)}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={800}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="createNhanVien"
                    >
                        <Form.Item
                            name="ten"
                            label="Tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ho"
                            label="Họ"
                            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="cmnd"
                            label="CMND"
                            rules={[{ required: true, message: 'Vui lòng nhập CMND!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="sodienthoai"
                            label="Số điện thoại"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item
                            name="taikhoan"
                            label="Tài khoản"
                            rules={[{ required: true, message: 'Vui lòng chọn tài khoản!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={taiKhoanList.map(item => ({
                                    label: item.tendangnhap,
                                    value: item.tendangnhap,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa nhân viên"
                    visible={openModalUpdate}
                    onOk={() => {
                        form2.validateFields()
                            .then(values => {
                                form2.resetFields();
                                handleUpdate(values);
                            })
                            .catch(info => console.log('Validate Failed:', info));
                    }}
                    onCancel={() => setOpenModalUpdate(false)}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={800}
                >
                    <Form
                        form={form2}
                        layout="vertical"
                        name="updateNhanVien"
                    >
                        <Form.Item
                            name="ten"
                            label="Tên"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ho"
                            label="Họ"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="cmnd"
                            label="CMND"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ngaysinh"
                            label="Ngày sinh"
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="sodienthoai"
                            label="Số điện thoại"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            style={{ marginBottom: 10 }}
                        >
                            <Input type="email" />
                        </Form.Item>
                        <Form.Item
                            name="taikhoan"
                            label="Tài khoản"
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={taiKhoanList.map(item => ({
                                    label: item.tendangnhap,
                                    value: item.tendangnhap,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default NhanVienManagement;
