import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"

function ProjectEdit() {
    const [id, setId] = useState(useParams().id)
    const [content, setContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

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

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }

        axiosInstance.get(`/notes/${id}`,config)
            .then(function (response) {
                let note = response.data
                setId(note.id);
                setContent(note.content);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axiosInstance.put(`/notes/${id}`, {
            content: content
        }, config)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Note updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate('/dashboard')
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
                <h2 className="text-center mt-5 mb-3">Edit Note</h2>
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
                                <label htmlFor="description">Content</label>
                                <textarea
                                    value={content}
                                    onChange={(event) => { setContent(event.target.value) }}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="content"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-success mt-3">
                                Update Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEdit;