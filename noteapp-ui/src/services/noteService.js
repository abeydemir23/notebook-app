import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes/';

const getNotes = async () => {
    return await axios.get(API_URL);
};

const getNote = async (id) => {
    return await axios.get(API_URL + id);
};

const createNote = async (note) => {
    return await axios.post(API_URL, note);
};

const updateNote = async (id, note) => {
    return await axios.put(API_URL + id, note);
};

const deleteNote = async (id) => {
    return await axios.delete(API_URL + id);
};

const noteService = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
};

export default noteService;