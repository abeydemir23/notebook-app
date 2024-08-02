import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"


function ProjecCreate() {
    const [content, setContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [])

    // const axiosInstance = axios.create({
    //     baseURL: 'http://localhost:8080',
    // });

    let url = 'http://notebookbe:8080/api';
    const axiosInstance = axios.create({
        baseURL: url,
    });

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Access-Control-Allow-Origin': '*',
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        axiosInstance.post('/notes', {
            content: content
        },config)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Note saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setContent('')
                navigate("/dashboard");
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Note</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard">View All Notes
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(event) => {
                                        setContent(event.target.value)
                                    }}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="content"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjecCreate;