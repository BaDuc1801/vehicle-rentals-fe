import DetailVehicleAdmin from './DetailVehicleAdmin'

const ListVehicleAdmin = ({vehicles}) => {
  
  return (
    <div className='flex flex-col gap-6 pb-4'>
      {vehicles?.map((items) => (
        <DetailVehicleAdmin items={items} />))
      }
    </div>
  )
}

export default ListVehicleAdmin

