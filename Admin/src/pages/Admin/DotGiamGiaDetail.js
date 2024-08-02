import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Table, Spin, notification, Button, Row, Col, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import dotGiamGiaApi from '../../apis/dotGiamGiaApi';
import ctDotGiamGiaApi from '../../apis/ctDotGiamGiaApi';
import moment from 'moment';

const { Option } = Select;

const DotGiamGiaDetail = () => {
    const { madgg } = useParams();
    const history = useHistory();
    const [dotGiamGia, setDotGiamGia] = useState(null);
    const [ctDotGiamGiaList, setCtDotGiamGiaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchDotGiamGiaDetail();
        fetchCTDotGiamGiaList();
    }, [madgg]);

    const fetchDotGiamGiaDetail = async () => {
        setLoading(true);
        try {
            const response = await dotGiamGiaApi.getDetailDotGiamGia(madgg);
            setDotGiamGia(response);
        } catch (error) {
            notification.error({ message: 'Lấy chi tiết đợt giảm giá thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const fetchCTDotGiamGiaList = async () => {
        setLoading(true);
        try {
            const response = await ctDotGiamGiaApi.getAll();
            setCtDotGiamGiaList(response.filter(item => item.dotgiamgia.madgg === madgg));
        } catch (error) {
            notification.error({ message: 'Lấy chi tiết sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (values) => {
        setLoading(true);
        try {
            await ctDotGiamGiaApi.updateCTDotGiamGia({
                ...values,
                madgg
            });
            notification.success({ message: 'Chỉnh sửa sản phẩm thành công' });
            setOpenModalEdit(false);
            fetchCTDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (values) => {
        setLoading(true);
        try {
            await ctDotGiamGiaApi.createCTDotGiamGia({
                ...values,
                madgg
            });
            notification.success({ message: 'Thêm sản phẩm thành công' });
            setOpenModalAdd(false);
            fetchCTDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Thêm sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (masp) => {
        setLoading(true);
        try {
            await ctDotGiamGiaApi.deleteCTDotGiamGia(masp, madgg);
            notification.success({ message: 'Xóa sản phẩm thành công' });
            fetchCTDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Xóa sản phẩm thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'sanpham.masp',
            key: 'masp',
            render: (text) => text,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'sanpham.ten',
            key: 'tensp',
            render: (text) => text,
        },
        {
            title: 'Giá gốc',
            dataIndex: 'sanpham.giagoc',
            key: 'giagoc',
            render: (text) => text,
        },
        {
            title: 'Giá giảm',
            dataIndex: 'giagiam',
            key: 'giagiam',
            render: (text) => text,
        },
        {
            title: 'Phần trăm giảm',
            dataIndex: 'phantram',
            key: 'phantram',
            render: (text) => `${text}%`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditRecord(record);
                            form.setFieldsValue({
                                masp: record.sanpham.masp,
                                phantram: record.phantram,
                                giagiam: record.giagiam,
                            });
                            setOpenModalEdit(true);
                        }}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa sản phẩm này?"
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
        <div style={{ padding: 24 }}>
            <Spin spinning={loading}>
                <Card
                    title="Chi tiết đợt giảm giá"
                    extra={
                        <Button
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                            href="/dot-giam-gia"
                        >
                            Quay lại
                        </Button>
                    }
                >
                    {dotGiamGia && (
                        <div>
                            <Row>
                                <Col span={12}>
                                    <p><strong>ID:</strong> {dotGiamGia.madgg}</p>
                                    <p><strong>Ngày bắt đầu:</strong> {moment(dotGiamGia.ngaybatdau).format('DD/MM/YYYY')}</p>
                                    <p><strong>Ngày kết thúc:</strong> {moment(dotGiamGia.ngayketthuc).format('DD/MM/YYYY')}</p>
                                    <p><strong>Mô tả:</strong> {dotGiamGia.mota}</p>
                                </Col>
                            </Row>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setOpenModalAdd(true)}
                                style={{ marginBottom: 16 }}
                            >
                                Thêm mới sản phẩm
                            </Button>
                            <Table
                                columns={columns}
                                dataSource={ctDotGiamGiaList}
                                rowKey="sanpham.masp"
                                pagination={false}
                            />
                        </div>
                    )}
                </Card>
            </Spin>

            <Modal
                title="Chỉnh sửa sản phẩm"
                visible={openModalEdit}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            form.resetFields();
                            handleEdit(values);
                        })
                        .catch(info => console.log('Validate Failed:', info));
                }}
                onCancel={() => setOpenModalEdit(false)}
                okText="Hoàn thành"
                cancelText="Hủy"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="editCTDotGiamGia"
                >
                    <Form.Item
                        name="masp"
                        label="Mã sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng chọn mã sản phẩm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="phantram"
                        label="Phần trăm giảm"
                        rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Giá giảm"
                        rules={[{ required: true, message: 'Vui lòng nhập giá giảm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Thêm mới sản phẩm"
                visible={openModalAdd}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            form.resetFields();
                            handleAdd(values);
                        })
                        .catch(info => console.log('Validate Failed:', info));
                }}
                onCancel={() => setOpenModalAdd(false)}
                okText="Thêm"
                cancelText="Hủy"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="addCTDotGiamGia"
                >
                    <Form.Item
                        name="masp"
                        label="Mã sản phẩm"
                        rules={[{ required: true, message: 'Vui lòng chọn mã sản phẩm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phantram"
                        label="Phần trăm giảm"
                        rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Giá giảm"
                        rules={[{ required: true, message: 'Vui lòng nhập giá giảm!' }]}
                        style={{ marginBottom: 10 }}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DotGiamGiaDetail;
