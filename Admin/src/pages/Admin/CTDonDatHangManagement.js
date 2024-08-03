import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputNumber, notification, Spin, Popconfirm, Space, Row, Col, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import ctDonHangApi from '../../apis/ctDonHangApi';
import sanPhamApi from '../../apis/sanPhamApi';

const { PageHeader } = require('@ant-design/pro-layout');

const CTDonDatHangManagement = () => {
    const { id } = useParams();
    const [ctDonDatHangList, setCtDonDatHangList] = useState([]);
    const [sanPhamList, setSanPhamList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentProductId, setCurrentProductId] = useState(null);

    useEffect(() => {
        fetchCtDonDatHangList();
        fetchSanPhamList();
    }, [id]);

    const fetchCtDonDatHangList = async () => {
        try {
            const response = await ctDonHangApi.getAll();
            setCtDonDatHangList(response.filter(item => item.dondathang.maddh === id));
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch ct don dat hang list:', error);
        }
    };

    const fetchSanPhamList = async () => {
        try {
            const response = await sanPhamApi.getAll();
            setSanPhamList(response);
        } catch (error) {
            console.error('Failed to fetch san pham list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                dondathang: { maddh: id },
                sanpham: { masp: values.masp },
            };

            await ctDonHangApi.createCTDonHang(data);
            notification.success({ message: 'Tạo chi tiết đơn đặt hàng thành công' });
            setOpenModalCreate(false);
            fetchCtDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Tạo chi tiết đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                dondathang: { maddh: id },
                sanpham: { masp: values.masp },
            };

            await ctDonHangApi.updateCTDonHang(data);
            notification.success({ message: 'Chỉnh sửa chi tiết đơn đặt hàng thành công' });
            setOpenModalUpdate(false);
            fetchCtDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa chi tiết đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (masp) => {
        setLoading(true);
        try {
            await ctDonHangApi.deleteCTDonHang(masp, id);
            notification.success({ message: 'Xóa chi tiết đơn đặt hàng thành công' });
            fetchCtDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Xóa chi tiết đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (masp) => {
        setCurrentProductId(masp);
        try {
            const response = await ctDonHangApi.getDetailCTDonHang(masp, id);
            form2.setFieldsValue(response);
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch ct don dat hang details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'sanpham',
            key: 'sanpham',
            render: (text) => text ? text.masp : '',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'dongia',
            key: 'dongia',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.sanpham.masp)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa chi tiết đơn đặt hàng này?"
                        onConfirm={() => handleDelete(record.sanpham.masp)}
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
        <div className="ctdondathang-management-container">
            <Spin spinning={loading}>
                <div style={{ marginTop: 20 }}>
                    <PageHeader
                        subTitle={`Chi tiết đơn đặt hàng ${id}`}
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
                                            Tạo chi tiết đơn đặt hàng mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={ctDonDatHangList}
                    rowKey="id"
                />

                <Modal
                    title="Tạo chi tiết đơn đặt hàng mới"
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
                        name="createCTDonDatHang"
                    >
                        <Form.Item
                            name="masp"
                            label="Mã sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng chọn mã sản phẩm!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={sanPhamList.map(item => ({
                                    label: item.masp,
                                    value: item.masp,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="soluong"
                            label="Số lượng"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item
                            name="dongia"
                            label="Đơn giá"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn giá!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa chi tiết đơn đặt hàng"
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
                        name="updateCTDonDatHang"
                    >
                        <Form.Item
                            name="masp"
                            label="Mã sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng chọn mã sản phẩm!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={sanPhamList.map(item => ({
                                    label: item.masp,
                                    value: item.masp,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="soluong"
                            label="Số lượng"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item
                            name="dongia"
                            label="Đơn giá"
                            rules={[{ required: true, message: 'Vui lòng nhập đơn giá!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default CTDonDatHangManagement;
