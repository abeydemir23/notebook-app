import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout"


function ProjectShow() {
    const navigate = useNavigate();
    const [id, setId] = useState(useParams().id)
    const [note, setNote] = useState({ id: 0, content: '' })
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

        axiosInstance.get(`/notes/${id}`, config)
            .then(function (response) {
                setNote(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Note</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard"> View All Notes
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Id:</b>
                        <p>{note.id}</p>
                        <b className="text-muted">Content:</b>
                        <p>{note.content}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectShow;