import { Input, Pagination, Table, Modal, Form, message, Select, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import paymentService from '../Services/paymentService';
import { IoIosInformationCircle } from 'react-icons/io';
import moment from 'dayjs';

const PaymentManager = () => {
  const [paymentData, setPaymentData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [search, setSearch] = useState();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [status, setStatus] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchpaymentData = async () => {
      const data = await paymentService.getAllPayment({ status: status });
      setPaymentData(data);
    };
    fetchpaymentData();
  }, [status]);

  const handleEdit = (record) => {
    setSelectedPayment(record);
    form.setFieldsValue({
      ...record,
      address: record?.address || "Nhận xe tại đại lý",
      startDate: moment(record?.startDate),
      endDate: moment(record?.endDate),
    });
    setIsEditModalVisible(true);
  };

  const handleCancel = (record) => {
    setSelectedPayment(record);
    setIsDeleteModalVisible(true);
  };

  const handleUpdatePayment = async () => {
    try {
      const updatedPayment = await form.validateFields();
      await paymentService.updatePayment(selectedPayment._id, updatedPayment);
      messageApi.success({ content: 'Cập nhật thông tin thành công!' });
      setIsEditModalVisible(false);
      const data = await paymentService.getAllPayment();
      setPaymentData(data);
    } catch (error) {
      messageApi.error({ content: 'Cập nhật thông tin thất bại!' });
    }
  };

  const handleConfirmCancel = async () => {
    try {
      await paymentService.updatePayment(selectedPayment._id, { status: "canceled" });
      messageApi.success({ content: 'Hủy đơn hàng thành công!' });
      setIsDeleteModalVisible(false);
      const data = await paymentService.getAllPayment();
      setPaymentData(data);
    } catch (error) {
      messageApi.error({ content: 'Hủy đơn hàng thất bại!' });
    }
  };

  const columns = [
    {
      title: 'Mã vé',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (item) => (
        <p>{new Date(item).toLocaleDateString('vi-VN')} {new Date(item).toLocaleTimeString('vi-VN')}</p>
      )
    },
    {
      title: 'Tên người đặt',
      dataIndex: 'username',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (item) => (
        item === "cash" ? <p className='text-orange-500'>Chưa thanh toán</p> : <p className='text-green-500'>Đã thanh toán</p>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (item) => (
        item === "pending" ?
          <p className='bg-orange-500 px-2 rounded-md text-white text-center text-[12px]'>Chưa hoàn tất</p> : item === "completed" ?
            <p className='bg-green-500 px-2 rounded-md text-white text-center'>Đã hoàn tất</p> : <p className='bg-red-500 px-2 rounded-md text-white text-center'>Đã hủy</p>
      )
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-start items-center gap-5">
          <div onClick={() => handleEdit(record)} className="text-[#2cb8af] text-xl cursor-pointer">
            <IoIosInformationCircle />
          </div>
          {record.status !== "completed" && <div onClick={() => handleCancel(record)} className="text-red-500 text-lg cursor-pointer">
            <MdCancel />
          </div>}
        </div>
      ),
    },
  ];

  const filteredUsers = paymentData?.filter((user) =>
    (user?.username?.toLowerCase().includes(search?.toLowerCase() || '')) ||
    (user?.phoneNumber?.toLowerCase().includes(search?.toLowerCase() || '')) ||
    (user?.email?.toLowerCase().includes(search?.toLowerCase() || '')) ||
    (user?.createdAt && new Date(user.createdAt).toLocaleDateString('vi-VN').toLowerCase().includes(search?.toLowerCase() || '')) ||
    (user?.createdAt && new Date(user.createdAt).toLocaleTimeString('vi-VN').toLowerCase().includes(search?.toLowerCase() || '')) ||
    (user?._id?.toLowerCase().includes(search?.toLowerCase() || ''))
  );

  const paginatedUsers = filteredUsers?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || paymentData;

  return (
    <div>
      {contextHolder}
      <div className='flex justify-between items-center'>
        <Input.Search size="large" className="w-full" onChange={(e) => setSearch(e.target.value)} />
        <Select
          defaultValue={status}
          size='large'
          style={{ width: 200 }}
          onChange={(value) => setStatus(value)}
          options={[
            { value: '', label: 'Tất cả' },
            { value: 'pending', label: 'Chưa hoàn tất' },
            { value: 'completed', label: 'Đã hoàn tất' },
            { value: 'canceled', label: 'Đã hủy' }]}>
        </Select>
      </div>
      <Table columns={columns} dataSource={paginatedUsers} pagination={false} bordered />
      <Pagination
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={filteredUsers?.length}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        }}
        className="my-4"
      />

      {/* Edit Modal */}
      <Modal
        title="Cập nhật thông tin người dùng"
        open={isEditModalVisible}
        onOk={handleUpdatePayment}
        okText="Cập nhật"
        cancelText="Hủy"
        onCancel={() => setIsEditModalVisible(false)}
        centered
      >
        <Form form={form} layout="vertical">
          {
            selectedPayment?.paymentMethod === "bank" ?
              <Form.Item label="Tổng tiền">
                <p className='font-semibold'>{selectedPayment?.totalPrice?.toLocaleString()}đ ( đã thanh toán )</p>
              </Form.Item>
              :
              <Form.Item label="Tổng tiền">
                <p className='font-semibold'>{selectedPayment?.totalPrice?.toLocaleString()}đ - {(selectedPayment?.deposit)?.toLocaleString()}đ ( cọc ) = {(selectedPayment?.totalPrice - selectedPayment?.deposit)?.toLocaleString()}đ</p>
              </Form.Item>
          }
          <Form.Item label="Mã xe">
            <p className='font-semibold'>{selectedPayment?.vehicleId?._id}</p>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item name="startDate" label="Ngày thuê">
            <DatePicker size='large' style={{ width: "100%" }} format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }}/>
          </Form.Item>
          <Form.Item name="endDate" label="Ngày trả">
            <DatePicker size='large' style={{ width: "100%" }} format="YYYY-MM-DD HH:mm" showTime={{ format: 'HH:mm' }}/>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Xác nhận hủy"
        open={isDeleteModalVisible}
        onOk={handleConfirmCancel}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xác nhận"
        okButtonProps={{ danger: true }}
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </div>
  );
};

export default PaymentManager;
