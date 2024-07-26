import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { putUpdateUser } from "../services/UserService";
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");


    const handleEditUser = async () => {
       
            const res = await putUpdateUser(dataUserEdit.id, name, job);
            if(res && res.updatedAt){
                handleEditUserFromModal({
                    first_name: name,
                    id: dataUserEdit.id
                })
            }
            handleClose();
            toast.success("update user")
            console.log("Update Response:", res);
            
    };
    useEffect(() => {
        if (show && dataUserEdit) {
            setName(dataUserEdit.first_name || "");
            setJob(dataUserEdit.job || "");
        }
    }, [show, dataUserEdit]);



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Job</label>
                        <input type="text" className="form-control"
                            value={job}
                            onChange={(event) => setJob(event.target.value)} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalEditUser;