import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fectchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAdNew';
import ModalEditUser from './ModalEditUser';
import _, { debounce, flatMap, get } from 'lodash';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse"
import { toast, Toast } from 'react-toastify';

const TableUsers = (props) => {

    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModelAddNew, setIsShowModelAddNew] = useState(false);
    const [iShowModelEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [isShowModalDelate, setIsShowModalDelate] = useState(false);
    const [dataUserDelate, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");
    const [keyWord, setKeyWord] = useState("");
    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModelAddNew(false);
        setIsShowModalEdit(false);
        setIsShowModalDelate(false);
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
            
            setTotalUser(res.total)

            setListUser(res.data)

            setTotalPages(res.total_pages)

        }
    }



    const handlePageClick = (event) => {

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

    const handleDeleteUser = (user) => {
        setIsShowModalDelate(true);
        setDataUserDelete(user);

    }

    const handleDeleteUserFromModal = (user) => {

        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id);

        setListUser(cloneListUser);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let cloneListUser = _.cloneDeep(listUser);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUser(cloneListUser);
    }
    const handleSearch = debounce((event) => {
        let term = event.target.value;
       
        if (term) {
            let cloneListUser = _.cloneDeep(listUser);
            cloneListUser = cloneListUser.filter(item => item.email.includes(term));
            setListUser(cloneListUser)
        }
        else {
            getUsers(1);
        }
    }, 300)

    const getUserExport = (event, done) => {
        let result = [];
        if(listUser && listUser.length > 0) {
            result.push(['ID', 'Email', 'First name', 'Last name']);
            listUser.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            })
            setDataExport(result);
            done();
        }
    }
    const handleImportCsv = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            let file = event.target.files[0];
            if(file.type !== 'text/csv'){
                toast.error('only accept file.csv')
            }
            Papa.parse(file, {
                // header: true,
                complete: function(result){
                    let rawCSV = result.data;
                    if(rawCSV.length > 0){
                        if(rawCSV[0] && rawCSV[0].length  === 3){
                            if(rawCSV[0][0] !== 'email' || rawCSV[0][1] !== 'firts_name', rawCSV[0][2] !== 'last_name'){
                                toast.error('wrong format csv file')
                            }
                            else{
                                let result = [];
                                

                                rawCSV.map((item, index) => {
                                    if(index > 0 && item.length === 3){
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj);
                                    }
                                })
                                setListUser(result);
                                
                            }
                        }
                        else{
                            toast.error('wrong format csv file')
                        }
                    }
                    else{
                        toast.error('not found data from csv file')
                    }
                }
            })
        }
        

    }
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];
    return (
        <>
            <div className='container-lg my-3 add-new'>
                <span><b>list users</b></span>

                <div>


                    <button className='btn btn-success'
                        onClick={() => setIsShowModelAddNew(true)}
                    >
                        <i className="fa-solid fa-circle-plus">
                        </i> Add new</button>

                    <CSVLink 
                        data={dataExport}
                        filename={"user.csv"}
                        asyncOnClick={true}
                        onClick={getUserExport}
                        className="btn btn-primary mx-2"
                        
                    ><i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>

                    <button className='btn btn-info '>
                        <i className="fa-solid fa-file-import"></i>
                        <label htmlFor='test'> Import </label>
                        <input id='test' hidden type='file' 
                        onChange={(event) => handleImportCsv(event)}
                        />
                    </button>
                </div>

            </div>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    placeholder='search email'
                    //  value={keyWord}
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <Table striped bordered hover className='container-lg  mt-5'>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                ID
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort("desc", "id")}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "id")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                First name
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort("desc", "first_name")}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "first_name")}
                                    ></i>
                                </span>
                            </div>
                        </th>
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
                                        <button className='btn mx-1 bg-danger text-light'
                                            onClick={() => handleDeleteUser(item)}
                                        >Delete</button>
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
            <ModalConfirm
                show={isShowModalDelate}
                handleClose={handleClose}
                dataUserDelate={dataUserDelate}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}
export default TableUsers;