import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fectchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAdNew';
import ModalEditUser from './ModalEditUser';
import _ from'lodash';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModelAddNew, setIsShowModelAddNew] = useState(false);
    const [iShowModelEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})




    const handleClose = () => {
        setIsShowModelAddNew(false);
        setIsShowModalEdit(false);
    }
    const handleUpDate = (user) => {
        setListUser([user, ...listUser])
    }

    useEffect(() => {
        getUsers();
    }, [])



    const getUsers = async (page) => {
        let res = await fectchAllUser(page);

        //check data đầu tiên là data của axios cái thứ 2 là data của api
        if (res && res.data) {
            console.log(res)
            setTotalUser(res.total)

            setListUser(res.data)

            setTotalPages(res.total_pages)

        }
    }



    const handlePageClick = (event) => {
        console.log('check event', event)
        getUsers(+ event.selected + 1);
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);

    }
    const handleEditUserFromModal = (user) => {
        let index = listUser.findIndex(item => item.id === user.id)
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser[index].first_name = user.first_name;
    
        setListUser(cloneListUser);
        
    }



    return (
        <>
            <div className='container-lg my-3 add-new'>
                <span><b>list users</b></span>
                <button className='btn btn-success' onClick={() => setIsShowModelAddNew(true)}>Add new</button>
            </div>

            <Table striped bordered hover className='container-lg  mt-5'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUser && listUser.length > 0 &&

                        listUser.map((item, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>@{item.last_name}</td>
                                    <td>
                                        <button 
                                        className='btn mx-1 bg-warning'
                                        onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn mx-1 bg-danger text-light'>Delete</button>
                                    </td>
                                </tr>

                            )
                        })
                    }



                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />

            <ModalAddNew
                show={isShowModelAddNew}
                handleClose={handleClose}
                handleUpDate={handleUpDate}
            />
            <ModalEditUser
                show={iShowModelEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditUserFromModal={handleEditUserFromModal}
            />
        </>
    )
}
export default TableUsers;