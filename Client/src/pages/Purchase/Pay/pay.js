import {
  LeftSquareOutlined
} from "@ant-design/icons";
import {
  Breadcrumb, Button, Card, Form,
  Input, Modal, Radio,
  Spin, Steps
} from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import sanPhamApi from "../../../apis/sanPhamApi";
import "./pay.css";
import donHangApi from "../../../apis/donHangApi";

const Pay = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderTotal, setOrderTotal] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");
  const [form] = Form.useForm();
  let { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);


  const accountCreate = async (values) => {
    try {
      const local = localStorage.getItem("user");
      const user = JSON.parse(local);

      const orderData = {
        diachi: values.diachi,
        khachhang: { makh: user.makh || 1 },
        ngaydat: values.ngaydat,
        ngaynhan: values.ngaynhan,
        phivanchuyen: 30000,
        sdtnn: values.sdtnn,
        tenn: values.tenn,
        trangthai: 'Pending'
      };

      const response = await donHangApi.createDonHang(orderData);
      console.log("Order created successfully: ", response);

      form.resetFields();
      history.push("/final-pay");
    } catch (error) {
      console.error("Failed to create order: ", error);
    }
  };

 

  const CancelPay = () => {
    form.resetFields();
    history.push("/cart");
  };

  useEffect(() => {
    (async () => {
      try {
        if (paymentId) {
          setShowModal(true);
        }

        await sanPhamApi.getDetailSanPham(id).then((item) => {
          setProductDetail(item);
        });
        const local = localStorage.getItem("user");
        const user = JSON.parse(local);
        console.log(user);

        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().substring(0, 10);
        const deliveryDate = new Date();
        deliveryDate.setDate(currentDate.getDate() + 3);
        const deliveryDateString = deliveryDate.toISOString().substring(0, 10);

        form.setFieldsValue({
          tenn: user.tendangnhap,
          ngaydat: currentDateString,
          ngaynhan: deliveryDateString,
          phivanchuyen: Number(30000).toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })
        });
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log(cart);

        // const transformedData = cart.map(
        //   ({ _id: product, quantity, promotion, price, name }) => ({ product, quantity, promotion, price, name })
        // );
        // let totalPrice = 0;

        // for (let i = 0; i < transformedData.length; i++) {
        //   let product = transformedData[i];
        //   console.log(product);
        //   let price = product.promotion * product.quantity;
        //   totalPrice += price;
        // }

        // setOrderTotal(totalPrice);
        // setProductDetail(transformedData);
        // console.log(transformedData);
        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event detail:" + error);
      }
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div class="py-5">
      <Spin spinning={false}>
        <Card className="container">
          <div className="product_detail">
            <div style={{ marginLeft: 5, marginBottom: 10, marginTop: 10 }}>
              <Breadcrumb>
                <Breadcrumb.Item href="http://localhost:3500/cart">
                  <LeftSquareOutlined style={{ fontSize: "24px" }} />
                  <span> Quay lại giỏ hàng</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <span>Thanh toán</span>
                </Breadcrumb.Item>
              </Breadcrumb>

              <div className="payment_progress">
                <Steps
                  current={1}
                  percent={60}
                  items={[
                    {
                      title: "Chọn sản phẩm",
                    },
                    {
                      title: "Thanh toán",
                    },
                    {
                      title: "Hoàn thành",
                    },
                  ]}
                />
              </div>

              <div className="information_pay">
                <Form
                  form={form}
                  onFinish={accountCreate}
                  name="eventCreate"
                  layout="vertical"
                  initialValues={{
                    residence: ["zhejiang", "hangzhou", "xihu"],
                    prefix: "86",
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="tenn"
                    label="Tên người nhận"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người nhận",
                      },
                    ]}
                  >
                    <Input placeholder="Tên người nhận" />
                  </Form.Item>

                  <Form.Item
                    name="sdtnn"
                    label="Số điện thoại người nhận"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại người nhận" />
                  </Form.Item>

                  <Form.Item
                    name="diachi"
                    label="Địa chỉ"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ",
                      },
                    ]}
                    style={{ marginBottom: 15 }}
                  >
                    <Input placeholder="Địa chỉ" />
                  </Form.Item>

                  <Form.Item
                    name="ngaydat"
                    label="Ngày đặt"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                    
                  >
                    <Input placeholder="Ngày đặt" disabled/>
                  </Form.Item>

                  <Form.Item
                    name="ngaynhan"
                    label="Ngày nhận"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder="Ngày nhận" disabled/>
                  </Form.Item>

                  <Form.Item
                    name="phivanchuyen"
                    label="Phí vận chuyển"
                    hasFeedback
                    style={{ marginBottom: 10 }}
                  >
                    <Input placeholder="Phí vận chuyển" disabled />
                  </Form.Item>

                  <Form.Item
                    name="billing"
                    label="Phương thức thanh toán"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn phương thức thanh toán!",
                      },
                    ]}
                    style={{ marginBottom: 10 }}
                  >
                    <Radio.Group>
                      <Radio value={"cod"}>COD</Radio>
                      <Radio value={"stripe"}>STRIPE</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      style={{
                        background: "#FF8000",
                        color: "#FFFFFF",
                        float: "right",
                        marginTop: 20,
                        marginLeft: 8,
                      }}
                      htmlType="submit"
                    >
                      Hoàn thành
                    </Button>
                    <Button
                      style={{
                        background: "#FF8000",
                        color: "#FFFFFF",
                        float: "right",
                        marginTop: 20,
                      }}
                      onClick={CancelPay}
                    >
                      Trở về
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Pay;
