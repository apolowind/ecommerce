import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, notification, Spin, Popconfirm, Space, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import hangApi from '../../apis/hangApi';
import { useHistory } from 'react-router-dom';

const { PageHeader } = require('@ant-design/pro-layout');

const HangManagement = () => {
    const [hangList, setHangList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchHangList();
    }, []);

    const fetchHangList = async () => {
        try {
            const response = await hangApi.getAll();
            setHangList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch hang list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            await hangApi.createHang(values);
            notification.success({ message: 'Tạo hàng thành công' });
            setOpenModalCreate(false);
            fetchHangList();
        } catch (error) {
            notification.error({ message: 'Tạo hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            await hangApi.updateHang(currentId, values);
            notification.success({ message: 'Chỉnh sửa hàng thành công' });
            setOpenModalUpdate(false);
            fetchHangList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await hangApi.deleteHang(id);
            notification.success({ message: 'Xóa hàng thành công' });
            fetchHangList();
        } catch (error) {
            notification.error({ message: 'Xóa hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await hangApi.getDetailHang(id);
            form2.setFieldsValue(response);
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch hang details:', error);
        }
    };

    const columns = [
        {
            title: 'Mã hàng',
            dataIndex: 'mahang',
            key: 'mahang',
        },
        {
            title: 'Tên hàng',
            dataIndex: 'tenhang',
            key: 'tenhang',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.mahang)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa hàng này?"
                        onConfirm={() => handleDelete(record.mahang)}
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
        <div className="hang-management-container">
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
                                            Tạo hàng mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={hangList}
                    rowKey="mahang"
                />

                <Modal
                    title="Tạo hàng mới"
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
                        name="createHang"
                    >
                        <Form.Item
                            name="tenhang"
                            label="Tên hàng"
                            rules={[{ required: true, message: 'Vui lòng nhập tên hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa hàng"
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
                        name="updateHang"
                    >
                        <Form.Item
                            name="tenhang"
                            label="Tên hàng"
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

export default HangManagement;
