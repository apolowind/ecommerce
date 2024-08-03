import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, notification, Spin, Popconfirm, Space, Row, Col, Select, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import donHangApi from '../../apis/donHangApi';
import nhanVienApi from '../../apis/nhanVienApi';
import dayjs from 'dayjs';

const { PageHeader } = require('@ant-design/pro-layout');

const DonHangManagement = () => {
    const [donHangList, setDonHangList] = useState([]);
    const [nhanVienList, setNhanVienList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentOrderId, setCurrentOrderId] = useState(null);

    useEffect(() => {
        fetchDonHangList();
        fetchNhanVienList();
    }, []);

    const fetchDonHangList = async () => {
        try {
            const response = await donHangApi.getAll();
            setDonHangList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch don hang list:', error);
        }
    };

    const fetchNhanVienList = async () => {
        try {
            const response = await nhanVienApi.getAll();
            setNhanVienList(response);
        } catch (error) {
            console.error('Failed to fetch nhan vien list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                khachhang: { makh: values.makh },
                nhanvienDuyet: { manv: values.nhanvienDuyet },
                nhanvienGiao: { manv: values.nhanvienGiao }
            };

            await donHangApi.createDonHang(data);
            notification.success({ message: 'Tạo đơn hàng thành công' });
            setOpenModalCreate(false);
            fetchDonHangList();
        } catch (error) {
            notification.error({ message: 'Tạo đơn hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                khachhang: { makh: values.makh },
                madh: currentOrderId,
                nhanvienDuyet: { manv: values.nhanvienDuyet },
                nhanvienGiao: { manv: values.nhanvienGiao }
            };

            await donHangApi.updateDonHang(data);
            notification.success({ message: 'Chỉnh sửa đơn hàng thành công' });
            setOpenModalUpdate(false);
            fetchDonHangList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa đơn hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (madh) => {
        setLoading(true);
        try {
            await donHangApi.deleteDonHang(madh);
            notification.success({ message: 'Xóa đơn hàng thành công' });
            fetchDonHangList();
        } catch (error) {
            notification.error({ message: 'Xóa đơn hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (madh) => {
        setCurrentOrderId(madh);
        try {
            const response = await donHangApi.getDetailDonHang(madh);
            form2.setFieldsValue({
                ...response,
                ngaydat: dayjs(response.ngaydat),
                ngaynhan: dayjs(response.ngaynhan),
                makh: response.khachhang.makh,
                nhanvienDuyet:  response.nhanvienDuyet.manv ,
                nhanvienGiao:  response.nhanvienGiao.manv 
            });
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch don hang details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'madh',
            key: 'madh',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
            render: (text) => (text ? new Date(text).toLocaleDateString() : ''),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangthai',
            key: 'trangthai',
            render: (trangthai) => (
                <span>
                    {trangthai === 'Rejected' ? (
                        <Tag style={{ width: 150, textAlign: 'center' }} color="red">
                            Đã hủy
                        </Tag>
                    ) : trangthai === 'Approved' ? (
                        <Tag style={{ width: 150, textAlign: 'center' }} color="geekblue">
                            Vận chuyển
                        </Tag>
                    ) : trangthai === 'Final' ? (
                        <Tag color="green" style={{ width: 150, textAlign: 'center' }}>
                            Đã giao - Đã thanh toán
                        </Tag>
                    ) : (
                        <Tag color="blue" style={{ width: 150, textAlign: 'center' }}>
                            Đợi xác nhận
                        </Tag>
                    )}
                </span>
            ),
        },
        {
            title: 'Phí vận chuyển',
            dataIndex: 'phivanchuyen',
            key: 'phivanchuyen',
        },
        {
            title: 'Số điện thoại nhận',
            dataIndex: 'sdtnn',
            key: 'sdtnn',
        },
        {
            title: 'Ngày nhận',
            dataIndex: 'ngaynhan',
            key: 'ngaynhan',
            render: (text) => (text ? new Date(text).toLocaleDateString() : ''),
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'tenn',
            key: 'tenn',
        },
        {
            title: 'Nhân viên duyệt',
            dataIndex: 'nhanvienDuyet',
            key: 'nhanvienDuyet',
            render: (text) => (text.ten),
        },
        {
            title: 'Nhân viên giao',
            dataIndex: 'nhanvienGiao',
            key: 'nhanvienGiao',
            render: (text) => (text.ten),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.madh)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đơn hàng này?"
                        onConfirm={() => handleDelete(record.madh)}
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
        <div className="donhang-management-container">
            <Spin spinning={loading}>
                <div style={{ marginTop: 20 }}>
                    <PageHeader
                        title="Quản lý đơn hàng"
                        subTitle="Danh sách đơn hàng"
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
                                            Tạo đơn hàng mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table columns={columns} dataSource={donHangList} rowKey="madh" />

                <Modal
                    title="Tạo đơn hàng mới"
                    visible={openModalCreate}
                    onOk={() => {
                        form.validateFields()
                            .then((values) => {
                                form.resetFields();
                                handleCreate(values);
                            })
                            .catch((info) => console.log('Validate Failed:', info));
                    }}
                    onCancel={() => setOpenModalCreate(false)}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={800}
                >
                    <Form form={form} layout="vertical" name="createDonHang">
                        <Form.Item
                            name="ngaydat"
                            label="Ngày đặt"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="trangthai"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select>
                                <Select.Option value="Pending">Đợi xác nhận</Select.Option>
                                <Select.Option value="Approved">Vận chuyển</Select.Option>
                                <Select.Option value="Final">Đã giao - Đã thanh toán</Select.Option>
                                <Select.Option value="Rejected">Đã hủy</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phivanchuyen"
                            label="Phí vận chuyển"
                            rules={[{ required: true, message: 'Vui lòng nhập phí vận chuyển!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="sdtnn"
                            label="Số điện thoại nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="ngaynhan"
                            label="Ngày nhận"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="diachi"
                            label="Địa chỉ"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="tenn"
                            label="Tên người nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="makh"
                            label="Mã khách hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn mã khách hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="nhanvienDuyet"
                            label="Nhân viên duyệt"
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhanVienList.map((item) => ({
                                    label: item.ten,
                                    value: item.manv,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="nhanvienGiao"
                            label="Nhân viên giao"
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhanVienList.map((item) => ({
                                    label: item.ten,
                                    value: item.manv,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa đơn hàng"
                    visible={openModalUpdate}
                    onOk={() => {
                        form2.validateFields()
                            .then((values) => {
                                form2.resetFields();
                                handleUpdate(values);
                            })
                            .catch((info) => console.log('Validate Failed:', info));
                    }}
                    onCancel={() => setOpenModalUpdate(false)}
                    okText="Hoàn thành"
                    cancelText="Hủy"
                    width={800}
                >
                    <Form form={form2} layout="vertical" name="updateDonHang">
                        <Form.Item
                            name="ngaydat"
                            label="Ngày đặt"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" disabled />
                        </Form.Item>
                        <Form.Item
                            name="trangthai"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select>
                                <Select.Option value="Pending">Đợi xác nhận</Select.Option>
                                <Select.Option value="Approved">Vận chuyển</Select.Option>
                                <Select.Option value="Final">Đã giao - Đã thanh toán</Select.Option>
                                <Select.Option value="Rejected">Đã hủy</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="phivanchuyen"
                            label="Phí vận chuyển"
                            rules={[{ required: true, message: 'Vui lòng nhập phí vận chuyển!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="sdtnn"
                            label="Số điện thoại nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="ngaynhan"
                            label="Ngày nhận"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" disabled />
                        </Form.Item>
                        <Form.Item
                            name="diachi"
                            label="Địa chỉ"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="tenn"
                            label="Tên người nhận"
                            rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="makh"
                            label="Mã khách hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn mã khách hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            name="nhanvienDuyet"
                            label="Nhân viên duyệt"
                            style={{ marginBottom: 10 }}
                            rules={[{ required: true, message: 'Vui lòng chọn nhân viên duyệt!' }]}

                        >
                            <Select
                                options={nhanVienList.map((item) => ({
                                    label: item.ten,
                                    value: item.manv,
                                }))}

                            />
                        </Form.Item>
                        <Form.Item
                            name="nhanvienGiao"
                            label="Nhân viên giao"
                            style={{ marginBottom: 10 }}
                            rules={[{ required: true, message: 'Vui lòng chọn nhân viên giao!' }]}

                        >
                            <Select
                                options={nhanVienList.map((item) => ({
                                    label: item.ten,
                                    value: item.manv,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default DonHangManagement;
