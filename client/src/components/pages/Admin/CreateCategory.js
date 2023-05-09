import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from 'axios';
import toast from "react-hot-toast";
import { Button, Modal } from 'react-bootstrap';
import { CategoryForm } from '../../Form/CategoryForm';



const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    //2) handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error("somthing went wrong in input form");
        }
    };

    //1) get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //3) update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setShow(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //4) delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Manage Category</h1>
                    <div className="p-3 w-50">
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setName} />
                    </div>
                    <div className="w-75">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((categorie) => (
                                    <>
                                        <tr>
                                            <td key={categorie._id}>{categorie.name}</td>
                                            <td>
                                                <Button variant="info ms-2" onClick={() => { setShow(true); setUpdatedName(categorie.name); setSelected(categorie); }}>edit</Button>
                                                <Button variant="danger ms-2" onClick={() => { handleDelete(categorie._id) }}>delete</Button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title> Edit Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory