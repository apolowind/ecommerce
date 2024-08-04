import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const Cancel = () => {
  const history = useHistory();

  const handleBackToHome = () => {
    history.push('/');
  };

  return (
    <Result
      status="error"
      title="Thanh toán bị hủy"
      subTitle="Đơn hàng của bạn đã bị hủy. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi."
      extra={[
        <Button type="primary" key="home" onClick={handleBackToHome}>
          Về trang chủ
        </Button>,
      ]}
    />
  );
};

export default Cancel;
