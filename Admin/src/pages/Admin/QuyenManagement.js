import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Spin, Popconfirm, Space, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import QuyenApi from '../../apis/quyenApi';
import { useHistory } from 'react-router-dom';

const { PageHeader } = require('@ant-design/pro-layout');

const QuyenManagement = () => {
    const [quyenList, setQuyenList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchQuyenList();
    }, []);

    const fetchQuyenList = async () => {
        try {
            const response = await QuyenApi.getAll();
            setQuyenList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch quyen list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            await QuyenApi.createQuyen(values);
            notification.success({ message: 'Tạo quyền thành công' });
            setOpenModalCreate(false);
            fetchQuyenList();
        } catch (error) {
            notification.error({ message: 'Tạo quyền thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await QuyenApi.updateQuyen({ ...values, maquyen: currentId });
            notification.success({ message: 'Chỉnh sửa quyền thành công' });
            setOpenModalUpdate(false);
            fetchQuyenList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa quyền thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await QuyenApi.deleteQuyen(id);
            notification.success({ message: 'Xóa quyền thành công' });
            fetchQuyenList();
        } catch (error) {
            notification.error({ message: 'Xóa quyền thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await QuyenApi.getDetailQuyen(id);
            form2.setFieldsValue(response);
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch quyen details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã quyền',
            dataIndex: 'maquyen',
            key: 'maquyen',
        },
        {
            title: 'Tên quyền',
            dataIndex: 'tenquyen',
            key: 'tenquyen',
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.maquyen)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa quyền này?"
                        onConfirm={() => handleDelete(record.maquyen)}
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
        <div className="quyen-management-container">
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
                                            Tạo quyền mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={quyenList}
                    rowKey="maquyen"
                />

                <Modal
                    title="Tạo quyền mới"
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
                        name="createQuyen"
                    >
                        <Form.Item
                            name="tenquyen"
                            label="Tên quyền"
                            rules={[{ required: true, message: 'Vui lòng nhập tên quyền!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa quyền"
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
                        name="updateQuyen"
                    >
                        <Form.Item
                            name="tenquyen"
                            label="Tên quyền"
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
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

export default QuyenManagement;
