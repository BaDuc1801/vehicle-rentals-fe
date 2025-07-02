import DetailVehicle from './DetailVehicle'

const ListVehicle = ({vehicles}) => {
  
  return (
    <div className='flex flex-col gap-6 pb-4'>
      {vehicles?.map((items) => (
        <DetailVehicle items={items} />))
      }
    </div>
  )
}

export default ListVehicle

