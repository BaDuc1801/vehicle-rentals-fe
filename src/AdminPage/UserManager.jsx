import { Input, Pagination, Table, Modal, Form, message, Select } from 'antd';
import { useEffect, useState } from 'react';
import userService from '../Services/userService';
import { AiFillTool } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const UserManager = () => {
    const [userData, setUserData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [search, setSearch] = useState();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await userService.getAllUser();
            setUserData(data);
            setIsLoading(false);
        };
        fetchUserData();
    }, []);

    const handleEdit = (record) => {
        setSelectedUser(record);
        form.setFieldsValue(record);
        setIsEditModalVisible(true);
    };

    const handleDelete = (record) => {
        setSelectedUser(record);
        setIsDeleteModalVisible(true);
    };

    const handleUpdateUser = async () => {
        try {
            const updatedUser = await form.validateFields();
            await userService.updateUserByAmin(selectedUser._id, updatedUser);
            messageApi.success({ content: 'Cập nhật thông tin thành công!' });
            setIsEditModalVisible(false);
            const data = await userService.getAllUser();
            setUserData(data);
        } catch (error) {
            messageApi.error({ content: 'Cập nhật thông tin thất bại!' });
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await userService.deleteUser(selectedUser._id);
            messageApi.success({ content: 'Xóa người dùng thành công!' });
            setIsDeleteModalVisible(false);
            const data = await userService.getAllUser();
            setUserData(data);
        } catch (error) {
            messageApi.error({ content: 'Xóa người dùng thất bại!' });
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => (
                <img src={record?.avatar} alt="Avatar" className="w-[50px] h-[50px] rounded-full" />
            ),
        },
        {
            title: 'Tên',
            dataIndex: 'username',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div className="flex justify-start items-center gap-5">
                    <div onClick={() => handleEdit(record)} className="text-[#2cb8af] text-xl cursor-pointer">
                        <AiFillTool />
                    </div>
                    <div onClick={() => handleDelete(record)} className="text-red-500 text-lg cursor-pointer">
                        <FaTrash />
                    </div>
                </div>
            ),
        },
    ];

    const filteredUsers = userData?.filter((user) =>
        (user?.username?.toLowerCase().includes(search?.toLowerCase().trim() || '')) ||
        (user?.phoneNumber?.toLowerCase().includes(search?.toLowerCase().trim() || '')) ||
        (user?.email?.toLowerCase().includes(search?.toLowerCase().trim() || '')) ||
        (user?._id?.toLowerCase().includes(search?.toLowerCase().trim() || ''))
    );

    const paginatedUsers = filteredUsers?.slice((currentPage - 1) * pageSize, currentPage * pageSize) || userData;

    return (
        <div>
            {contextHolder}
            <Input.Search size="large" className="w-full" onChange={(e) => setSearch(e.target.value)} />
            <Table columns={columns} dataSource={paginatedUsers} pagination={false} bordered isLoading={isLoading}/>
            <Pagination
                align="center"
                current={currentPage}
                pageSize={pageSize}
                total={filteredUsers?.length}
                onChange={(page, pageSize) => {
                    setCurrentPage(page);
                    setPageSize(pageSize);
                }}
                className="my-4"
            />

            <Modal
                title="Cập nhật thông tin người dùng"
                open={isEditModalVisible}
                onOk={handleUpdateUser}
                okText="Cập nhật"
                cancelText="Hủy"
                onCancel={() => setIsEditModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="username" label="Tên">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Số điện thoại">
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Chức vụ">
                        <Select
                            options={[
                                { value: 'Admin', label: 'Admin' },
                                { value: 'Customer', label: 'Customer' },
                                { value: 'Operator', label: 'Operator' },
                            ]} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Xác nhận xóa"
                open={isDeleteModalVisible}
                onOk={handleConfirmDelete}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Xóa"
                okButtonProps={{ danger: true }}
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
            </Modal>
        </div>
    );
};

export default UserManager;
