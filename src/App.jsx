import { Route, Routes } from "react-router-dom"
import ClientPage from "./Home/ClientPage"
import HomePage from "./Home/HomePage"
import DetailSearchPage from "./Page/DetailSearchPage"
import CheckingPage from "./Page/CheckingPage"
import PaymentDetail from "./Page/PaymentDetail"
import BookingSuccess from "./Page/BookingSuccess"
import Login from "./Auth/Login"
import Register from "./Auth/Register"
import UserProfile from "./Page/UserProfile"
import ChangePassword from "./Auth/ChangePassword"
import BookingList from "./Page/BookingList"
import PaymentInfor from "./Page/PaymentInfor"
import ManagerPage from "./AdminPage/ManagerPage"
import UserManager from "./AdminPage/UserManager"
import VehicleManager from "./AdminPage/VehicleManager"
import PaymentManager from "./AdminPage/PaymentManager"
import PrivateRoute from "./PrivateRoute/PrivateRoute"
import AddCar from "./AdminPage/AddCar"
import AddMotorbike from "./AdminPage/AddMotorbike"
import RevenuePage from "./AdminPage/RevenuePage"
import ForgotPassword from "./Auth/ForgotPassword"

function App() {

  return (
    <Routes>
      <Route path="" element={<ClientPage />}>
        <Route path="" element={<HomePage />} />
        <Route path="/tim-xe/:vehicleType/:location" element={<DetailSearchPage />} />
        <Route path="/tim-xe/:vehicleType/:location/:_id" element={<CheckingPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/thong-tin-khach-hang" element={<PaymentDetail />} />
          <Route path="/hoan-thanh" element={<BookingSuccess />} />
          <Route path="/thong-tin-tai-khoan" element={<UserProfile />} />
          <Route path="/doi-mat-khau" element={<ChangePassword />} />
          <Route path="/danh-sach-chuyen" element={<BookingList />} />
          <Route path="/danh-sach-chuyen/:id" element={<PaymentInfor />} />
        </Route>
      </Route>
      <Route path="/quan-ly" element={<ManagerPage />}>
        <Route path="/quan-ly/nguoi-dung" element={<UserManager />} />
        <Route path="/quan-ly/doanh-so" element={<RevenuePage /> } />
        <Route path="/quan-ly/xe" element={<VehicleManager />} />
        <Route path="/quan-ly/xe/them-xe/o-to" element={<AddCar />} />
        <Route path="/quan-ly/xe/them-xe/xe-may" element={<AddMotorbike />} />
        <Route path="/quan-ly/don-hang" element={<PaymentManager />} />
      </Route>
      <Route path="/dang-nhap" element={<Login />} />
      <Route path="/dang-ky" element={<Register />} />
      <Route path="/quen-mat-khau" element={<ForgotPassword />} />
    </Routes >
  )
}

export default App
