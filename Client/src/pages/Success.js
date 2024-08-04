import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Success = () => {
  const history = useHistory();

  const handleBackToHome = () => {
    history.push('/');
  };

  return (
    <Result
      status="success"
      title="Thanh toán thành công!"
      subTitle="Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xử lý thành công."
      extra={[
        <Button type="primary" key="home" onClick={handleBackToHome}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};

export default Success;
