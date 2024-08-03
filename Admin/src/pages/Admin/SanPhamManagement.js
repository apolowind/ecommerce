import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Spin, Popconfirm, Space, Row, Col, Upload, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import sanPhamApi from '../../apis/sanPhamApi';
import LoaisanphamApi from '../../apis/loaisanphamApi';
import { useHistory } from 'react-router-dom';
import uploadFileApi from '../../apis/uploadFileApi';

const { PageHeader } = require('@ant-design/pro-layout');
const { Option } = Select;

const SanPhamManagement = () => {
    const [sanPhamList, setSanPhamList] = useState([]);
    const [loaiSanPhamList, setLoaiSanPhamList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);
    const [hinhanh, setHinhanh] = useState([]);

    useEffect(() => {
        fetchSanPhamList();
        fetchLoaiSanPhamList();
    }, []);

    const fetchSanPhamList = async () => {
        try {
            const response = await sanPhamApi.getAll();
            setSanPhamList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch san pham list:', error);
        }
    };

    const fetchLoaiSanPhamList = async () => {
        try {
            const response = await LoaisanphamApi.getAll();
            setLoaiSanPhamList(response);
        } catch (error) {
            console.error('Failed to fetch loai san pham list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            await sanPhamApi.createSanPham({ ...values, hinhanh: file, loaisanpham: { maloaisp: values.loaisanpham } });
            notification.success({ message: 'Tạo sản phẩm thành công' });
            setOpenModalCreate(false);
            fetchSanPhamList();
        } catch (error) {
            notification.error({ message: 'Tạo sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await sanPhamApi.updateSanPham({ ...values, hinhanh: file || hinhanh, loaisanpham: { maloaisp: values.loaisanpham }, masp: currentId });
            notification.success({ message: 'Chỉnh sửa sản phẩm thành công' });
            setOpenModalUpdate(false);
            fetchSanPhamList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await sanPhamApi.deleteSanPham(id);
            notification.success({ message: 'Xóa sản phẩm thành công' });
            fetchSanPhamList();
        } catch (error) {
            notification.error({ message: 'Xóa sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setLoading(true);

        setCurrentId(id);
        try {
            const response = await sanPhamApi.getDetailSanPham(id);
            setHinhanh(response.hinhanh);
            form2.setFieldsValue({...response, loaisanpham: response.loaisanpham.maloaisp});
            setOpenModalUpdate(true);
            setLoading(false);

        } catch (error) {
            console.error('Failed to fetch san pham details:', error);
        }
    };



    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'masp',
            key: 'masp',
        },
        {
            title: 'Ảnh',
            dataIndex: 'hinhanh',
            key: 'hinhanh',
            render: (image) => <img src={image} style={{ height: 80 }} />,
            width: '15%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tensanpham',
            key: 'tensanpham',
        },
        {
            title: 'Giá hiện tại',
            dataIndex: 'giahientai',
            key: 'giahientai',
        },
        {
            title: 'Số lượng tồn',
            dataIndex: 'soluongton',
            key: 'soluongton',
        },
        {
            title: 'Loại sản phẩm',
            dataIndex: 'loaisanpham',
            key: 'loaisanpham',
            render: (text) => text ? text.tenloaisp : '',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.masp)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
                        onConfirm={() => handleDelete(record.masp)}
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

    const [file, setUploadFile] = useState();


    const handleChangeImage = async (e) => {
        setLoading(true);
        const response = await uploadFileApi.uploadFile(e);
        if (response) {
            setUploadFile(response);
        }
        setLoading(false);
    }

    return (
        <div className="sanpham-management-container">
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
                                            Tạo sản phẩm mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={sanPhamList}
                    rowKey="masp"
                />

                <Modal
                    title="Tạo sản phẩm mới"
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
                    <Spin spinning={loading}>

                        <Form
                            form={form}
                            layout="vertical"
                            name="createSanPham"
                        >
                            <Form.Item
                                name="tensanpham"
                                label="Tên sản phẩm"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="giahientai"
                                label="Giá hiện tại"
                                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="soluongton"
                                label="Số lượng tồn"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn!' }]}
                                style={{ marginBottom: 10 }}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="mota"
                                label="Mô tả"
                                style={{ marginBottom: 10 }}
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}

                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="thongsokythuat"
                                label="Thông số kỹ thuật"
                                style={{ marginBottom: 10 }}
                                rules={[{ required: true, message: 'Vui lòng nhập thông số kỹ thuật!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="loaisanpham"
                                label="Loại sản phẩm"
                                rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
                                style={{ marginBottom: 10 }}
                            >
                                <Select
                                    options={loaiSanPhamList.map(item => ({
                                        label: item.tenloaisp,
                                        value: item.maloaisp,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                name="hinhanh"
                                label="Hình ảnh"
                                style={{ marginBottom: 10 }}
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh!' }]}
                            >
                                <input
                                    type="file"
                                    onChange={handleChangeImage}
                                    id="avatar"
                                    name="file"
                                    accept="image/png, image/jpeg"
                                />
                            </Form.Item>
                        </Form>
                    </Spin>
                </Modal>

                <Modal
                    title="Chỉnh sửa sản phẩm"
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
                        name="updateSanPham"
                    >
                        <Spin spinning={loading}>
                            <Form.Item
                                name="tensanpham"
                                label="Tên sản phẩm"
                                style={{ marginBottom: 10 }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="giahientai"
                                label="Giá hiện tại"
                                style={{ marginBottom: 10 }}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="soluongton"
                                label="Số lượng tồn"
                                style={{ marginBottom: 10 }}
                            >
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item
                                name="mota"
                                label="Mô tả"
                                style={{ marginBottom: 10 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="thongsokythuat"
                                label="Thông số kỹ thuật"
                                style={{ marginBottom: 10 }}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                                name="loaisanpham"
                                label="Loại sản phẩm"
                                style={{ marginBottom: 10 }}
                            >
                                <Select
                                    options={loaiSanPhamList.map(item => ({
                                        label: item.tenloaisp,
                                        value: item.maloaisp,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Hình ảnh"
                                style={{ marginBottom: 10 }}
                            >
                                <input type="file" onChange={handleChangeImage}
                                    id="avatar" name="file"
                                    accept="image/png, image/jpeg" />
                            </Form.Item>
                        </Spin>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default SanPhamManagement;
