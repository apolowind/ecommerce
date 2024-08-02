import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, notification, Spin, Popconfirm, Row, Col, Space, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import dotGiamGiaApi from '../../apis/dotGiamGiaApi';
import nhanVienApi from '../../apis/nhanVienApi';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const { PageHeader } = require('@ant-design/pro-layout');
const { Option } = Select;

const DotGiamGiaList = () => {
    const [dotGiamGiaList, setDotGiamGiaList] = useState([]);
    const [nhanVienList, setNhanVienList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchDotGiamGiaList();
        fetchNhanVienList();
    }, []);

    const fetchDotGiamGiaList = async () => {
        try {
            const response = await dotGiamGiaApi.getAll();
            setDotGiamGiaList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch discount list:', error);
        }
    };

    const fetchNhanVienList = async () => {
        try {
            const response = await nhanVienApi.getAll();
            setNhanVienList(response);
        } catch (error) {
            console.error('Failed to fetch employee list:', error);
        }
    };

    const handleCreate = async (values) => {
        setLoading(true);
        try {
            // Chuyển đổi manv thành đối tượng nhanvien
            const data = {
                ...values,
                nhanvien: { manv: values.manv }
            };
            await dotGiamGiaApi.createDotGiamGia(data);
            notification.success({ message: 'Tạo đợt giảm giá thành công' });
            setOpenModalCreate(false);
            fetchDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Tạo đợt giảm giá thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            // Chuyển đổi manv thành đối tượng nhanvien
            const data = {
                ...values,
                nhanvien: { manv: values.manv }
            };
            await dotGiamGiaApi.updateDotGiamGia(currentId, data);
            notification.success({ message: 'Chỉnh sửa đợt giảm giá thành công' });
            setOpenModalUpdate(false);
            fetchDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa đợt giảm giá thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await dotGiamGiaApi.deleteDotGiamGia(id);
            notification.success({ message: 'Xóa đợt giảm giá thành công' });
            fetchDotGiamGiaList();
        } catch (error) {
            notification.error({ message: 'Xóa đợt giảm giá thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await dotGiamGiaApi.getDetailDotGiamGia(id);
            const { ngaybatdau, ngayketthuc, mota, nhanvien } = response;
            form2.setFieldsValue({
                ngaybatdau: moment(ngaybatdau),
                ngayketthuc: moment(ngayketthuc),
                mota,
                manv: nhanvien.manv
            });
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch discount details:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'madgg',
            key: 'madgg',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'ngaybatdau',
            key: 'ngaybatdau',
            render: date => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'ngayketthuc',
            key: 'ngayketthuc',
            render: date => moment(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'mota',
            key: 'mota',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'nhanvien',
            key: 'nhanvien',
            render: (text) => {
                const nhanVien = nhanVienList.find(nv => nv.manv == text?.manv);
                return nhanVien ? nhanVien.ten : 'Không xác định';
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record.madgg)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.madgg)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đợt giảm giá này?"
                        onConfirm={() => handleDelete(record.madgg)}
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

    const handleView = (madgg) => {
        history.push(`/dot-giam-gia/${madgg}`);
    };

    return (
        <div className="dot-giam-gia-container">
            <Spin spinning={loading}>
                <div style={{ marginTop: 20 }}>
                    <div id="my__event_container__list">
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
                                                Tạo đợt giảm giá
                                            </Button>
                                        </Space>
                                    </Row>
                                </Col>
                            </Row>
                        </PageHeader>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={dotGiamGiaList}
                    rowKey="madgg"
                />

                <Modal
                    title="Tạo đợt giảm giá mới"
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
                        name="createDotGiamGia"
                    >
                        <Form.Item
                            name="ngaybatdau"
                            label="Ngày bắt đầu"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="ngayketthuc"
                            label="Ngày kết thúc"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn nhân viên">
                                {nhanVienList.map(nv => (
                                    <Option key={nv.manv} value={nv.manv}>
                                        {nv.ten}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa đợt giảm giá"
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
                        name="updateDotGiamGia"
                    >
                        <Form.Item
                            name="ngaybatdau"
                            label="Ngày bắt đầu"
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="ngayketthuc"
                            label="Ngày kết thúc"
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="mota"
                            label="Mô tả"
                            style={{ marginBottom: 10 }}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            style={{ marginBottom: 10 }}
                        >
                            <Select placeholder="Chọn nhân viên">
                                {nhanVienList.map(nv => (
                                    <Option key={nv.manv} value={nv.manv}>
                                        {nv.ten}
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

export default DotGiamGiaList;
