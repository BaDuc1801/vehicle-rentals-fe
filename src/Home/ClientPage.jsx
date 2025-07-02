import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import HeaderNavBar from '../Components/HeaderNavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ClientPage = () => {
    return (
        <div className='text-[#0A4348] flex flex-col min-h-screen max-w-[1700px] m-auto'>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <HeaderNavBar />
            <div className='flex-1 h-[calc(100vh-286px)] bg-[#f2f4f7]'>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default ClientPage
