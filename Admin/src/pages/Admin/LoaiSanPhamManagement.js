import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Spin, Popconfirm, Space, Row, Col, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import loaiSanPhamApi from '../../apis/loaisanphamApi';
import hangApi from '../../apis/hangApi';
import { useHistory } from 'react-router-dom';

const { PageHeader } = require('@ant-design/pro-layout');
const { Option } = Select;

const LoaiSanPhamManagement = () => {
    const [loaiSanPhamList, setLoaiSanPhamList] = useState([]);
    const [hangList, setHangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchLoaiSanPhamList();
        fetchHangList();
    }, []);

    const fetchLoaiSanPhamList = async () => {
        try {
            const response = await loaiSanPhamApi.getAll();
            setLoaiSanPhamList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch loai san pham list:', error);
        }
    };

    const fetchHangList = async () => {
        try {
            const response = await hangApi.getAll();
            setHangList(response);
        } catch (error) {
            console.error('Failed to fetch hang list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                hang: { mahang: values.mahang }
            };
            await loaiSanPhamApi.createLoaisanpham(data);
            notification.success({ message: 'Tạo loại sản phẩm thành công' });
            setOpenModalCreate(false);
            fetchLoaiSanPhamList();
        } catch (error) {
            notification.error({ message: 'Tạo loại sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                hang: { mahang: values.mahang }
            };
            await loaiSanPhamApi.updateLoaisanpham(currentId, data);
            notification.success({ message: 'Chỉnh sửa loại sản phẩm thành công' });
            setOpenModalUpdate(false);
            fetchLoaiSanPhamList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa loại sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await loaiSanPhamApi.deleteLoaisanpham(id);
            notification.success({ message: 'Xóa loại sản phẩm thành công' });
            fetchLoaiSanPhamList();
        } catch (error) {
            notification.error({ message: 'Xóa loại sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await loaiSanPhamApi.getDetailLoaisanpham(id);
            form2.setFieldsValue(response);
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch loai san pham details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã loại sản phẩm',
            dataIndex: 'maloaisp',
            key: 'maloaisp',
        },
        {
            title: 'Tên loại sản phẩm',
            dataIndex: 'tenloaisp',
            key: 'tenloaisp',
        },
        {
            title: 'Tên hàng',
            key: 'tenhang',
            render: (text, record) => (
                <span>
                    {record.hang ? record.hang.tenhang : 'Không có'}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.maloaisp)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa loại sản phẩm này?"
                        onConfirm={() => handleDelete(record.maloaisp)}
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

    const history = useHistory();

    return (
        <div className="loai-san-pham-management-container">
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
                                            Tạo loại sản phẩm mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={loaiSanPhamList}
                    rowKey="maloaisp"
                />

                <Modal
                    title="Tạo loại sản phẩm mới"
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
                    width={600}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        name="createLoaiSanPham"
                    >
                        <Form.Item
                            name="tenloaisp"
                            label="Tên loại sản phẩm"
                            rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mahang"
                            label="Mã hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn mã hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn mã hàng">
                                {hangList.map(hang => (
                                    <Option key={hang.mahang} value={hang.mahang}>
                                        {hang.tenhang}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa loại sản phẩm"
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
                    width={600}
                >
                    <Form
                        form={form2}
                        layout="vertical"
                        name="updateLoaiSanPham"
                    >
                        <Form.Item
                            name="tenloaisp"
                            label="Tên loại sản phẩm"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mahang"
                            label="Mã hàng"
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn mã hàng">
                                {hangList.map(hang => (
                                    <Option key={hang.mahang} value={hang.mahang}>
                                        {hang.tenhang}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default LoaiSanPhamManagement;
