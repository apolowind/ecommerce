import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Spin, Popconfirm, Space, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import nhaCungCapApi from '../../apis/nhaCungCapApi';
import { useHistory } from 'react-router-dom';

const { PageHeader } = require('@ant-design/pro-layout');

const NhaCungCapManagement = () => {
    const [nhaCungCapList, setNhaCungCapList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchNhaCungCapList();
    }, []);

    const fetchNhaCungCapList = async () => {
        try {
            const response = await nhaCungCapApi.getAll();
            setNhaCungCapList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch nha cung cap list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            await nhaCungCapApi.createNhaCungCap(values);
            notification.success({ message: 'Tạo nhà cung cấp thành công' });
            setOpenModalCreate(false);
            fetchNhaCungCapList();
        } catch (error) {
            notification.error({ message: 'Tạo nhà cung cấp thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await nhaCungCapApi.updateNhaCungCap({ ...values, mancc: currentId });
            notification.success({ message: 'Chỉnh sửa nhà cung cấp thành công' });
            setOpenModalUpdate(false);
            fetchNhaCungCapList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa nhà cung cấp thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await nhaCungCapApi.deleteNhaCungCap(id);
            notification.success({ message: 'Xóa nhà cung cấp thành công' });
            fetchNhaCungCapList();
        } catch (error) {
            notification.error({ message: 'Xóa nhà cung cấp thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await nhaCungCapApi.getDetailNhaCungCap(id);
            form2.setFieldsValue(response);
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch nha cung cap details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'mancc',
            key: 'mancc',
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'tenncc',
            key: 'tenncc',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi',
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
            title: 'Mã số thuế',
            dataIndex: 'mst',
            key: 'mst',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.mancc)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhà cung cấp này?"
                        onConfirm={() => handleDelete(record.mancc)}
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
        <div className="nha-cung-cap-management-container">
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
                                            Tạo nhà cung cấp mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={nhaCungCapList}
                    rowKey="mancc"
                />

                <Modal
                    title="Tạo nhà cung cấp mới"
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
                        name="createNhaCungCap"
                    >
                        <Form.Item
                            name="tenncc"
                            label="Tên nhà cung cấp"
                            rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mst"
                            label="Mã số thuế"
                            rules={[{ required: true, message: 'Vui lòng nhập mã số thuế!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa nhà cung cấp"
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
                        name="updateNhaCungCap"
                    >
                        <Form.Item
                            name="tenncc"
                            label="Tên nhà cung cấp"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="diachi"
                            label="Địa chỉ"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
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
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mst"
                            label="Mã số thuế"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </Spin>
        </div>
    );
};

export default NhaCungCapManagement;
