import { useEffect, useState } from 'react'
import { Pagination, Radio, Select } from 'antd'
import { FaCarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { FaMotorcycle } from 'react-icons/fa6'
import { BsFilterLeft } from 'react-icons/bs'
import { Input } from 'antd';
import vehicleService from '../Services/vehicleService'
import ListVehicleAdmin from './ListVehicleAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { setListVehicle } from '../Redux/vehicleStore'
const { Search } = Input

const VehicleManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5 );
  const [vehicleType, setVehicleType] = useState('car');
  const [location, setLocation] = useState();
  const [seats, setSeats] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [brand, setBrand] = useState(null);
  const [district, setDistrict] = useState(null);
  const [sortBy, setSortBy] = useState(1);
  const [name, setName] = useState(null)
  const [locationList, setLocationList] = useState()
  const dispatch = useDispatch()
  const listVehicle = useSelector((state) => state.vehicle)

  useEffect(() => {
    const fetchData = async () => {
      const data = await vehicleService.getAllvehicles({ vehicleType: vehicleType, location: location, district: district, brand: brand, transmission: transmission, seats: seats, sortBy: sortBy });
      const listLocation = await vehicleService.getAllvehicles({vehicleType: vehicleType});
      dispatch(setListVehicle(data));
      setLocationList(listLocation);
    }
    fetchData()
  }, [location, district, brand, transmission, seats, sortBy, vehicleType])

  useEffect(() => {
        window.scrollTo(0, 0)
  }, [currentPage])

  const paginatedCars = listVehicle?.list
    ?.filter((car) => car?.name.toLowerCase().includes(name?.toLowerCase() || ''))
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className='bg-[#f2f4f7]'>
      <div className='grid grid-cols-3 gap-x-6 p-10'>
        <div className='col-span-1 lg:sticky lg:top-0 lg:h-[calc(100vh-50px)]'>
          <Radio.Group buttonStyle="solid" className='flex justify-between gap-3'
            defaultValue={vehicleType}
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
          <Search placeholder="Nhập dòng xe" onChange={(e) => setName(e.target.value)} size="large" enterButton allowClear className='mb-4' />
          {vehicleType === 'car' && <Select
            className='w-full'
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
          }
          <Select
            className='w-full'
            placeholder='Chọn loại hộp số'
            allowClear
            value={transmission}
            onChange={setTransmission}
            options={
              vehicleType === 'car'
                ? [
                  { value: 'Số sàn', label: 'Số sàn' },
                  { value: 'Số tự động', label: 'Số tự động' },
                ]
                : [
                  { value: 'Xe ga', label: 'Xe ga' },
                  { value: 'Xe số', label: 'Xe số' },
                ]
            }

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
            placeholder='Tất cả'
            onChange={setLocation}
            allowClear
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
          <div className='flex justify-end mb-[18px]'>
            <Select
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
          <ListVehicleAdmin vehicles={paginatedCars} />
          <Pagination
            align="center"
            current={currentPage}
            pageSize={pageSize}
            total={listVehicle?.list?.length}
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

export default VehicleManager
