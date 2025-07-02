import { useContext, useEffect, useState } from 'react'
import ListVehicle from './ListVehicle'
import { SearchContext } from '../Context/SearchContext'
import { Pagination, Radio, Select, Steps } from 'antd'
import { FaCarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { FaMotorcycle } from 'react-icons/fa6'
import { DatePicker } from 'antd';
import { BsFilterLeft } from 'react-icons/bs'
const { RangePicker } = DatePicker;
import moment from 'dayjs'
import { Input } from 'antd';
import vehicleService from '../Services/vehicleService'
import { useNavigate } from 'react-router-dom'
const { Search } = Input

const DetailSearchPage = () => {
  const { search, setSearch } = useContext(SearchContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [vehicleType, setVehicleType] = useState(search?.vehicleType);
  const [location, setLocation] = useState(search?.location);
  const [pickupDate, setPickupDate] = useState(search?.pickupDate);
  const [dropoffDate, setDropoffDate] = useState(search?.dropoffDate);
  const [seats, setSeats] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [brand, setBrand] = useState(null);
  const [district, setDistrict] = useState(null);
  const [sortBy, setSortBy] = useState(1);
  const [name, setName] = useState(null)
  const [listCar, setListCar] = useState()
  const [locationList, setLocationList] = useState()
  const nav = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchData = async () => {
      const data = await vehicleService.getAllvehicles({ vehicleType: vehicleType, startDate: pickupDate, endDate: dropoffDate, location: location, district: district, brand: brand, transmission: transmission, seats: seats, sortBy: sortBy });
      const listLocation = await vehicleService.getAllvehicles({ vehicleType: vehicleType });
      setListCar(data)
      setLocationList(listLocation);
    }
    fetchData()
  }, [location, district, brand, transmission, seats, sortBy, pickupDate, dropoffDate, vehicleType])

  const paginatedCars = listCar
    ?.filter((car) => car?.name.toLowerCase().includes(name?.toLowerCase() || ''))
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className='bg-[#f2f4f7]'>
      <p className='text-center text-3xl pt-4 pb-8'>Cho thuê {search.vehicleType === "car" ? "ô tô" : "xe máy"} tự lái tại {search.location}</p>
      <Steps
        className='m-auto max-w-[600px] mb-6 max-sm:px-[50px]'
        current={0}
        labelPlacement="vertical"
        items={[
          {
            title: 'Chọn xe',
          },
          {
            title: 'Xem giá và thủ tục',
          },
          {
            title: 'Thông tin khách hàng',
          },
          {
            title: 'Hoàn tất',
          }
        ]}
      />
      <div className='grid grid-cols-3 max-lg:grid-cols-1 max-w-[1000px] max-md:max-w-[700px] mx-auto max-lg:mx-[50px] max-lg:gap-x-0 gap-x-6'>
        <div className='col-span-1 lg:sticky lg:top-0 lg:h-screen'>
          <Radio.Group buttonStyle="solid" className='flex justify-between gap-3' defaultValue={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
              setBrand(null)
              setSeats(null)
              setTransmission(null)
            }}
          >
            <Radio.Button
              value="car"
              className='w-full rounded-md py-[6px] h-full text-[18px] !bg-white hover:!bg-white [&.ant-radio-button-wrapper-checked]:!bg-white [&.ant-radio-button-wrapper-checked]:!text-[#2cb8af] hover:text-[#2cb8af] border-[1px] '
            >
              <p className='flex justify-start items-center gap-2'><FaCarAlt /> Ô tô</p>
            </Radio.Button>
            <Radio.Button
              value="motorbike"
              className='w-full mb-4 rounded-md py-[6px] h-full text-[18px] !bg-white hover:!bg-white [&.ant-radio-button-wrapper-checked]:!bg-white [&.ant-radio-button-wrapper-checked]:!text-[#2cb8af] hover:text-[#2cb8af] border-[1px]'
            >
              <p className='flex justify-start items-center gap-2'><FaMotorcycle /> Xe máy</p>
            </Radio.Button>
          </Radio.Group>
          <Search placeholder="Nhập dòng xe" onChange={(e) => setName(e.target.value)} size="large" enterButton allowClear className='max-lg:mb-4' />
          <Select
            className='w-full mt-4'
            placeholder='Chọn loại xe'
            allowClear
            value={seats}
            onChange={setSeats}
            options={[
              { value: '5', label: '4-5 chỗ' },
              { value: '7', label: '7 chỗ' },
            ]}
            size='large'
          />
          <Select
            className='w-full'
            placeholder='Chọn loại hộp số'
            allowClear
            value={transmission}
            onChange={setTransmission}
            options={[
              { value: 'Số sàn', label: 'Số sàn' },
              { value: 'Số tự động', label: 'Số tự động' },
            ]}
            size='large'
          />
          <Select
            className='w-full'
            placeholder='Chọn hãng xe'
            allowClear
            value={brand}
            onChange={setBrand}
            options={[...new Map(locationList?.map((location) => [location?.brand, { value: location?.brand, label: location?.brand }])).values()]}
            size='large'
          />
          <Select
            className='w-full mt-4'
            showSearch
            value={location}
            onChange={(value) => {
              setLocation(value); setDistrict(null); setSearch({ ...search, location: value });
              nav(`/tim-xe/${vehicleType === 'car' ? 'o-to' : 'xe-may'}/${value}`)
            }}
            labelRender={(option) => {
              return <span className='flex items-center gap-2 justify-start'> <FaMapMarkerAlt />{option.label}</span>;
            }}
            options={[...new Map(locationList?.map((location) => [location?.location, { value: location?.location, label: location?.location }])).values()]}
            size='large'
          />
          <Select
            showSearch
            className='w-full'
            placeholder="Quận, huyện"
            value={district}
            allowClear
            onChange={setDistrict}
            labelRender={(option) => {
              return <span className='flex items-center gap-2 justify-start'> <FaMapMarkerAlt />{option.label}</span>;
            }}
            options={[...new Map(locationList
              ?.filter((loc) => loc?.location === location)
              ?.map((loc) => [loc?.district, { value: loc?.district, label: loc?.district }]))
              .values()]}
            size='large'
          />
        </div>
        <div className='col-span-2'>
          <div className='flex justify-between items-start mb-[18px] gap-4 max-md:flex-col max-md:items-end'>
            <RangePicker size='large' format="YYYY-MM-DD HH:mm" className='w-full'
              disabledDate={(current) => current && current <= moment().startOf('day')}
              onChange={(dates) => {
                setPickupDate(dates ? dates[0].toISOString() : null);
                setDropoffDate(dates ? dates[1].toISOString() : null);
                setSearch({ ...search, pickupDate: dates[0].toISOString(), dropoffDate: dates[1].toISOString() });
              }}
              showTime
              defaultValue={[moment(search.pickupDate), moment(search.dropoffDate)]}
            />
            <Select
              className='max-md:w-3/4'
              defaultValue={1}
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 1, label: 'Từ thấp đến cao' },
                { value: -1, label: 'Từ cao đến thấp' },
              ]}
              labelRender={(option) => {
                return <span className='flex justify-center items-center gap-2 max-md:justify-start'> <BsFilterLeft />{option.label}</span>;
              }}
              size='large'
            />
          </div>
          <ListVehicle vehicles={paginatedCars} />
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={listCar?.length}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }}
            className="my-4"
          />
        </div>
      </div>
    </div>
  )
}

export default DetailSearchPage
