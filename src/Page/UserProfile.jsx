import { Button, Col, Form, Input, message, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import userService from '../Services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar, setUser } from '../Redux/userStore'

const UserProfile = () => {
    const [form] = Form.useForm()
    const [isChanged, setIsChanged] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const [imagePreview, setImagePreview] = useState(user?.avatar);

    if (!user) {
        return <Spin size="large" className='w-full h-[60vh]' />;
    }

    const onValuesChange = (changedValues) => {
        setIsChanged(
            changedValues.username !== user?.username ||
            changedValues.email !== user?.email ||
            changedValues.phoneNumber !== user?.phoneNumber ||
            changedValues.avatar !== user?.avatar
        );
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file));
            setIsChanged(true);
        }
    };

    const handleFileSelectClick = () => {
        document.getElementById('file-input').click();
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            if (selectedImage) {
                let formData = new FormData();
                formData.append('avatar', selectedImage);
                const newAvatar = await userService.updateAvatar(formData)
                dispatch(setAvatar(newAvatar.user))
            }
            if (values.username !== user?.username || values.email !== user?.email || values.phoneNumber !== user?.phoneNumber) {
                const updatedUser = await userService.updateUserInfor(values);
                dispatch(setUser(updatedUser))
            }
            setIsChanged(false)
            setLoading(false);
            messageApi.open({
                type: 'success',
                content: 'Cập nhật thông tin thành công',
            });
        }
        catch (error) {
            messageApi.error({
                content: 'Cập nhật thông tin không thành công',
            });
        }
    }

    return (
        <div className='bg-[#f2f4f7] flex justify-center items-center'>
            {contextHolder}
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    username: user?.username,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber
                }}
                onValuesChange={onValuesChange}
                className='bg-white p-5 rounded-md my-10 shadow-md'
                onFinish={onFinish}
            >
                <Row gutter={[150, 0]}>
                    <Col span={8}>
                        <div className='w-[200px] h-[200px]' onClick={handleFileSelectClick}>
                            {
                                !loading ? (
                                    <img src={imagePreview || user?.avatar} className='w-full h-full rounded-md cursor-pointer'></img>
                                ) : <Spin size="large" className='w-full h-[200px] flex justify-center items-center rounded-md bg-[#f2f4f7]' />
                            }
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="file-input"
                                accept="image/*"
                                onChange={(e) => {
                                    handleFileChange(e);
                                    onValuesChange(e);
                                }}
                                name='avatar'
                            />
                        </div>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            name="username"
                            label={<p className='text-[18px]'>Họ và tên</p>}
                        >
                            <Input size='large' />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<p className='text-[18px]'>Email</p>}
                        >
                            <Input size='large' disabled />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label={<p className='text-[18px]'>Số điện thoại</p>}
                        >
                            <Input size='large' />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' type='primary' disabled={!isChanged} className='w-full' size='large' loading={loading}>Lưu</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default UserProfile
