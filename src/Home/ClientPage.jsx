import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch } from 'react-redux'
import userService from '../Services/userService'
import { setUser } from '../Redux/userStore'
import HeaderNavBar from '../Components/HeaderNavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ClientPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const accessToken = userService.getAccessToken();

        if (accessToken) {
            fetchUserProfile(accessToken);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const userData = await userService.getUserInformation(token);
            dispatch(setUser(userData));
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    return (
        <div className='text-[#0A4348] flex flex-col min-h-screen'>
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
