import { Checkbox, Input, Steps, DatePicker, Button, Form, Modal } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';
import { TbManualGearboxFilled } from 'react-icons/tb';
import { GiJerrycan } from 'react-icons/gi';
import { MdAirlineSeatLegroomNormal, MdMap } from 'react-icons/md';
import { BsFuelPumpFill } from 'react-icons/bs';
import { AiFillTool } from 'react-icons/ai';
import { SiTicktick } from 'react-icons/si';
import { PiMoneyBold } from 'react-icons/pi';
const { RangePicker } = DatePicker;
import moment from 'dayjs'
import userService from '../Services/userService';

const CheckingPage = () => {
  const { vehicleType, location } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const { search } = useContext(SearchContext);
  const [rentalDays, setRentalDays] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedVehicle(JSON.parse(localStorage.getItem("checkingVehicle")))
  }, [])

  useEffect(() => {
    if (search.pickupDate && search.dropoffDate && selectedVehicle) {
      const rentalDays = moment(search.dropoffDate).diff(moment(search.pickupDate), 'days');
      const finalRentalDays = rentalDays < 1 ? 1 : rentalDays;
      setRentalDays(finalRentalDays);
      const pricePerDay = parseFloat(selectedVehicle?.price);
      const calculatedTotalPrice = finalRentalDays * pricePerDay;
      setTotalPrice(calculatedTotalPrice);
      setDeposit(calculatedTotalPrice * 0.3);
    }
  }, [search.pickupDate, search.dropoffDate, selectedVehicle]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };


  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/dang-nhap'); 
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const { form } = Form.useForm();

  const onFinish = (values) => {
    const user = userService.getAccessToken()
    if (user) {
      localStorage.setItem("checkingBill", JSON.stringify({ address: values.address, totalPrice: totalPrice, deposit: deposit, rentalDays }))
      navigate('/thong-tin-khach-hang')
    }
    else {
      setIsModalVisible(true);
    }
  }

  const onChange = (e) => {
    switch (e) {
      case 0:
        navigate(`/tim-xe/${vehicleType}/${location}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className='bg-[#f2f4f7]'>
      <Steps
        className="m-auto max-w-[600px] py-6 max-sm:px-[50px]"
        current="1"
        onChange={onChange}
        labelPlacement="vertical"
        items={[
          { title: 'Chọn xe' },
          { title: 'Xem giá và thủ tục' },
          { title: 'Thông tin khách hàng' },
          { title: 'Hoàn tất' }
        ]}
      />
      <div className='grid grid-cols-3 max-lg:grid-cols-1 max-w-[1250px] max-md:max-w-[700px] mx-auto max-lg:mx-[50px] max-lg:gap-x-0 gap-x-6 px-4 pb-10'>
        <div className='col-span-2 rounded-md bg-white pb-4'>
          <div className='flex justify-center gap-5'>
            <img src={selectedVehicle?.img} className='w-[350px] h-[300px] flex-1 p-4 rounded-md' />
            <div className='p-4 flex-1'>
              <p className='text-2xl font-bold mb-5 text-[#127d81]'>{selectedVehicle?.name}</p>
              <div className='text-[16px] grid grid-cols-2 gap-x-3'>
                <div>
                  <p className='flex items-center gap-2'><BsFuelPumpFill />{selectedVehicle?.fuel}</p>
                  <p className='flex items-center gap-2 my-1'><TbManualGearboxFilled />{selectedVehicle?.transmission}</p>
                  <p className='flex items-center gap-2'><GiJerrycan />{selectedVehicle?.fuelEfficiency}</p>
                </div>
                <div>
                  <p className='flex items-center gap-2 mb-1'><MdAirlineSeatLegroomNormal />{selectedVehicle?.seats} chỗ</p>
                  <p className='flex items-center gap-2'><AiFillTool />Sản xuất {selectedVehicle?.year}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='px-4 mt-10'>
            <p className='text-xl font-semibold mb-2'>Địa chỉ</p>
            <p>{selectedVehicle?.district}, {selectedVehicle?.location}</p>
            <p className='text-xl font-semibold mt-8'>Tính năng</p>
            <div className='flex flex-wrap justify-between gap-x-6 mt-2'>
              <p className='flex items-center gap-2'><SiTicktick />Điều hoà (A/C)</p>
              <p className='flex items-center gap-2'><SiTicktick />Định vị (GPS)</p>
              <p className='flex items-center gap-2'><SiTicktick />Bluetooth</p>
              <p className='flex items-center gap-2'><SiTicktick />Khe cắm USB</p>
            </div>
            <p className='text-xl font-semibold mt-8'>Thủ tục</p>
            <p className='mt-2 font-semibold'>Giấy tờ chỉ cần xác minh (chủ xe không giữ lại)</p>
            <ul className='list-disc px-8'>
              <li>CMND</li>
              <li>Bằng lái</li>
            </ul>
            <p className='mt-2 font-semibold'>Giấy tờ thế chấp (chủ xe giữ lại)</p>
            <ul className='list-disc px-8'>
              <li>Sổ hộ khẩu</li>
            </ul>
            <p className='mt-2 font-semibold'>Tài sản thế chấp (chủ xe giữ lại)
            </p>
            <ul className='list-disc px-8'>
              <li>15-20 triệu hoặc xe máy + đăng kí xe giá trị tương đương</li>
            </ul>
            <p className='mt-8 text-xl font-semibold'>CHẤP NHẬN THANH TOÁN</p>
            <p className='mt-2 flex items-center gap-2'><PiMoneyBold className='text-[26px]' />Trả sau</p>
            <p className='text-xl font-semibold mt-8'>Giới hạn quãng đường</p>
            <ul className='list-disc px-8'>
              <li>Tối đa 300 km/ngày</li>
              <li>Phụ trội 3.000 đ/km</li>
            </ul>
          </div>
        </div>

        <div className='col-span-1'>
          <Form
            form={form}
            onFinish={onFinish}
          >
            <div className='rounded-md bg-white p-4'>
              <p className='text-xl font-semibold'>Giao xe</p>
              <hr className='my-4'></hr>
              <Checkbox onChange={handleCheckboxChange} className='text-[18px]'>Giao xe tại nhà</Checkbox>
              {isChecked && (
                <div className='mt-4'>
                  <Form.Item
                    name="address"
                    label="Địa chỉ nhận xe"
                    layout='vertical'
                  >
                    <Input />
                  </Form.Item>
                </div>
              )}
            </div>
            <div className='rounded-md bg-white p-4 mt-6'>
              <p className='text-xl font-semibold'>Thời gian thuê</p>
              <hr className='my-4'></hr>
              <RangePicker format="YYYY-MM-DD HH:mm" size='large' disabled className='w-full' showTime defaultValue={[moment(search.pickupDate), moment(search.dropoffDate)]} />
            </div>
            <div className='rounded-md bg-white p-4 mt-6 text-[18px]'>
              <p className='text-xl font-semibold'>Chi tiết giá</p>
              <hr className='my-4'></hr>
              <p className='flex justify-between'><span>Đơn giá:</span><span>{selectedVehicle?.price.toLocaleString()}đ</span></p>
              <p className='flex justify-between'><span>Thời gian thuê:</span><span>x {rentalDays} ngày</span></p>
              <hr className='my-4'></hr>
              <div className='flex justify-between'>
                <p className='text-lg'>Tổng</p>
                <p className='text-lg'>{totalPrice.toLocaleString()} đ</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-lg'>Đặt cọc</p>
                <p className='text-lg'>{deposit.toLocaleString()} đ</p>
              </div>
            </div>
            <div className='rounded-md bg-white p-4 mt-6'>
              <Button type='primary' className='w-full mb-2' htmlType="submit" size='large'>Đặt xe</Button>
              <Button className='w-full' size='large' onClick={() => navigate(`/tim-xe/${vehicleType}/${location}`)}>Quay lại</Button>
            </div>
          </Form>
        </div>
      </div >
      <div className='bg-[#f2f4f7]'>
        {/* Modal yêu cầu đăng nhập */}
        <Modal
          title="Yêu cầu đăng nhập"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Đăng nhập"
          cancelText="Hủy"
        >
          <p>Bạn cần đăng nhập để tiếp tục đặt xe.</p>
        </Modal>
      </div>
    </div >
  );
};

export default CheckingPage;
