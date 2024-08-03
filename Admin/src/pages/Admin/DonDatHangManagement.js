import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, DatePicker, Select, notification, Spin, Popconfirm, Space, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import donDatHangApi from '../../apis/donDatHangApi';
import nhaCungCapApi from '../../apis/nhaCungCapApi';
import nhanVienApi from '../../apis/nhanVienApi';
import moment from 'moment';
import dayjs from 'dayjs';

const { PageHeader } = require('@ant-design/pro-layout');

const DonDatHangManagement = () => {
    const [donDatHangList, setDonDatHangList] = useState([]);
    const [nhaCungCapList, setNhaCungCapList] = useState([]);
    const [nhanVienList, setNhanVienList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentId, setCurrentId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        fetchDonDatHangList();
        fetchNhaCungCapList();
        fetchNhanVienList();
    }, []);

    const fetchDonDatHangList = async () => {
        try {
            const response = await donDatHangApi.getAll();
            setDonDatHangList(response);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch don dat hang list:', error);
        }
    };

    const fetchNhaCungCapList = async () => {
        try {
            const response = await nhaCungCapApi.getAll();
            setNhaCungCapList(response);
        } catch (error) {
            console.error('Failed to fetch nha cung cap list:', error);
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
                nhacungcap: { mancc: values.mancc },
                nhanvien: { manv: values.manv }
            };

            await donDatHangApi.createDonDatHang(data);
            notification.success({ message: 'Tạo đơn đặt hàng thành công' });
            setOpenModalCreate(false);
            fetchDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Tạo đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const data = {
                ...values,
                nhacungcap: { mancc: values.mancc },
                nhanvien: { manv: values.manv }
            };

            await donDatHangApi.updateDonDatHang({ ...data, maddh: currentId });
            notification.success({ message: 'Chỉnh sửa đơn đặt hàng thành công' });
            setOpenModalUpdate(false);
            fetchDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Chỉnh sửa đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await donDatHangApi.deleteDonDatHang(id);
            notification.success({ message: 'Xóa đơn đặt hàng thành công' });
            fetchDonDatHangList();
        } catch (error) {
            notification.error({ message: 'Xóa đơn đặt hàng thất bại' });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        setCurrentId(id);
        try {
            const response = await donDatHangApi.getDetailDonDatHang(id);
            form2.setFieldsValue({
                ...response,
                ngaydathang: dayjs(response.ngaydathang),
                manv: response?.nhanvien?.manv,
                mancc: response?.nhacungcap?.mancc,
            });
            setOpenModalUpdate(true);
        } catch (error) {
            console.error('Failed to fetch don dat hang details:', error);
        }
    };

    const handleView = (id) => {
        history.push(`/ctdondathang/${id}`);
    };

    const columns = [
        {
            title: 'Mã đơn đặt hàng',
            dataIndex: 'maddh',
            key: 'maddh',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'ngaydathang',
            key: 'ngaydathang',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Nhà cung cấp',
            dataIndex: 'nhacungcap',
            key: 'nhacungcap',
            render: (text) => text ? text.tenncc : '',
        },
        {
            title: 'Nhân viên',
            dataIndex: 'nhanvien',
            key: 'nhanvien',
            render: (text) => text ? `${text.ho} ${text.ten}` : '',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => handleView(record.maddh)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record.maddh)}
                        style={{ width: 150, borderRadius: 15, height: 30, marginBottom: 10 }}
                    >
                        Chỉnh sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa đơn đặt hàng này?"
                        onConfirm={() => handleDelete(record.maddh)}
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
        <div className="dondathang-management-container">
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
                                            Tạo đơn đặt hàng mới
                                        </Button>
                                    </Space>
                                </Row>
                            </Col>
                        </Row>
                    </PageHeader>
                </div>
                <Table
                    columns={columns}
                    dataSource={donDatHangList}
                    rowKey="id"
                />

                <Modal
                    title="Tạo đơn đặt hàng mới"
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
                        name="createDonDatHang"
                    >
                        <Form.Item
                            name="ngaydathang"
                            label="Ngày đặt hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="mancc"
                            label="Nhà cung cấp"
                            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhaCungCapList.map(item => ({
                                    label: item.tenncc,
                                    value: item.mancc,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhanVienList.map(item => ({
                                    label: `${item.ho} ${item.ten}`,
                                    value: item.manv,
                                }))}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Chỉnh sửa đơn đặt hàng"
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
                        name="updateDonDatHang"
                    >
                        <Form.Item
                            name="ngaydathang"
                            label="Ngày đặt hàng"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <DatePicker format="DD-MM-YYYY" />
                        </Form.Item>
                        <Form.Item
                            name="mancc"
                            label="Nhà cung cấp"
                            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhaCungCapList.map(item => ({
                                    label: item.tenncc,
                                    value: item.mancc,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            name="manv"
                            label="Nhân viên"
                            rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}
                            style={{ marginBottom: 10 }}
                        >
                            <Select
                                options={nhanVienList.map(item => ({
                                    label: `${item.ho} ${item.ten}`,
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

export default DonDatHangManagement;
