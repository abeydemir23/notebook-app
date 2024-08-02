import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
import {API_URL} from "../settings";

function ListNote() {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
        fetchProjectList()
    }, [])

    const axiosInstance = axios.create({
        baseURL: API_URL,
    });
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    };


    const fetchProjectList = () => {
        axiosInstance.get('/notes', config)
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/notes/${id}`, config)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Note deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: error.response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const Logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Notes</h2>
                <div className="card">
                    <div className="card-header">
                        <Link className="btn btn-outline-primary" to="/create">Create New Note </Link>
                        <button onClick={() => Logout()} className="btn btn-outline-danger float-end"> Logout</button>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projectList.map((note, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{note.id}</td>
                                        <td>{note.content}</td>
                                        <td>
                                            <Link
                                                to={`/show/${note.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Show
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${note.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(note.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListNote;