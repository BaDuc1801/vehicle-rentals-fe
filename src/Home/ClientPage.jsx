import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import HeaderNavBar from '../Components/HeaderNavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import userService from '../Services/userService';
import { resetUser } from '../Redux/userStore';

const ClientPage = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await userService.getUserInformation();
            } catch (err) {
                if (err.response?.status === 403) {
                    dispatch(resetUser());
                    // nav("/dang-nhap");
                }
            }
        };

        verifyUser();
    }, []);
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
