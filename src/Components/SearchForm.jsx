import { useContext, useEffect, useState } from 'react';
import bgHomeImg from '../assets/bgHome.jpg';
import { Button, DatePicker, Form, Radio, Row, Select, Col } from 'antd';
import { FaCarAlt, FaMotorcycle, FaMapMarkerAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';
import vehicleService from '../Services/vehicleService';

const SearchForm = () => {
    const [pickupDate, setPickupDate] = useState(null);
    const { form } = Form.useForm();
    const navigate = useNavigate();
    const { setSearch, search } = useContext(SearchContext);
    const [listLocation, setListLocation] = useState([]);

    const onFinish = (values) => {
        const formattedValues = {
            ...values,
            pickupDate: values.pickupDate?.format('YYYY-MM-DD HH:mm'),
            dropoffDate: values.dropoffDate?.format('YYYY-MM-DD HH:mm'),
        };
        setSearch(formattedValues);
        const url = `/tim-xe/${formattedValues.vehicleType === 'car' ? 'o-to' : 'xe-may'}/${search.location}`;
        navigate(url);
    };

    dayjs.extend(customParseFormat);

    const disabledPickupDate = (current) => {
        return current && current < dayjs().endOf('day');
    };

    const disabledDropoffDate = (current) => {
        return current && (current < dayjs().endOf('day') || (pickupDate && current < pickupDate.endOf('day')));
    };

    const tomorrowMorning = dayjs().add(1, 'day').set('hour', 7).set('minute', 0).set('second', 0);
    const tomorrowEvening = tomorrowMorning.add(12, 'hour'); // 19h hôm sau

    useEffect(() => {
        const fetchLocaion = async () => {
            const data = await vehicleService.getAllvehicles();
            const listLocation = data.map((item) => item.location);
            const uniqueLocations = [...new Set(listLocation)];
            setListLocation(uniqueLocations);
        }
        fetchLocaion();
    }, [])

    return (
        <div className='relative h-[85vh]'>
            <img src={bgHomeImg} className='w-full h-full object-cover absolute z-1'></img>
            <div className='flex lg:justify-end justify-center h-full'>
                <div className='lg:w-1/2 flex justify-center items-center h-full'>
                    <div className='lg:w-3/4 mx-5 bg-white border-white border-2 rounded-md z-10'>
                        <p className='text-center text-2xl my-5'>Bạn cần thuê xe?</p>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            layout='vertical'
                            className='px-5 '
                            initialValues={{
                                vehicleType: "car",
                                location: "Hà Nội",
                                pickupDate: tomorrowMorning,
                                dropoffDate: tomorrowEvening,
                            }}
                        >
                            <Form.Item name="vehicleType">
                                <Radio.Group buttonStyle="solid" className='flex justify-between gap-3'>
                                    <Radio.Button
                                        value="car"
                                        className='w-full rounded-md py-2 h-full text-[18px] !bg-white hover:!bg-white [&.ant-radio-button-wrapper-checked]:!bg-white [&.ant-radio-button-wrapper-checked]:!text-[#2cb8af] hover:text-[#2cb8af] border-[1px] '
                                    >
                                        <p className='flex justify-start items-center gap-2'><FaCarAlt /> Ô tô</p>
                                    </Radio.Button>
                                    <Radio.Button
                                        value="motorbike"
                                        className='w-full rounded-md py-2 h-full text-[18px] !bg-white hover:!bg-white [&.ant-radio-button-wrapper-checked]:!bg-white [&.ant-radio-button-wrapper-checked]:!text-[#2cb8af] hover:text-[#2cb8af] border-[1px]'
                                    >
                                        <p className='flex justify-start items-center gap-2'><FaMotorcycle /> Xe máy</p>
                                    </Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="location">
                                <Select
                                    size='large'
                                    showSearch
                                    labelRender={(option) => {
                                        return <span className='flex items-center gap-2 justify-start'> <FaMapMarkerAlt />{option.label}</span>;
                                    }}
                                >
                                    {listLocation.map((location) => (
                                        <Select.Option key={location} value={location}>
                                            <div>{location}</div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label={<p className='text-gray-500'>Ngày nhận xe</p>}
                                        name="pickupDate"
                                    >
                                        <DatePicker
                                            className='w-full'
                                            format="YYYY-MM-DD HH:mm"
                                            size='large'
                                            disabledDate={disabledPickupDate}
                                            showTime={{ initialValues: dayjs('07:00:00', 'HH:mm:ss') }}
                                            onChange={(value) => setPickupDate(value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label={<p className='text-gray-500'>Ngày trả xe</p>}
                                        name="dropoffDate"
                                    >
                                        <DatePicker
                                            className='w-full'
                                            format="YYYY-MM-DD HH:mm"
                                            size='large'
                                            disabledDate={disabledDropoffDate}
                                            showTime={{ initialValues: dayjs('19:00:00', 'HH:mm:ss') }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button htmlType="submit" size='large' type='primary' className="w-full text-[16px] py-4">
                                    Tìm xe giá tốt
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
