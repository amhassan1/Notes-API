import { createStore } from "vuex";
import { API } from "@/uri";

export default createStore({
    state: {
        notes: [],
        catagories: ["Important", "Urgent", "School", "Family", "Friends", "House"],
        showCatagories: [],
        user: {
            id: 0,
            username: "guest",
            firstName: "",
            lastName: "",
        },
        loggedIn: false,
        noteFontColors: ["#000000", "#FF0000", "#00FF00", "#0000FF", "#663611", "#140585"],
        noteBackgroundColors: ["#E9FF70", "#FFD670", "#FF9770", "#FF70A6", "#70D6FF"],
    },
    getters: {
        getNotes(state) {
            return state.notes;
        },
        getCatagories(state) {
            return state.catagories;
        },
        getShow(state) {
            return state.showCatagories;
        },
        getUser(state) {
            return state.user;
        },
        getStatus(state) {
            return state.loggedIn;
        },
        getNoteFontColors(state) {
            return state.noteFontColors;
        },
        getNoteBackgroundColors(state) {
            return state.noteBackgroundColors;
        },
    },
    mutations: {
        setNotes(state, notes) {
            state.notes = notes;
        },
        addNote(state, note) {
            state.notes.push(note);
        },
        deleteNote(state, id) {
            state.notes = state.notes.filter((note) => id !== note.id);
        },
        updateNote(state, note) {
            state.notes = state.notes.map((n) => (n.id === note.id ? { ...note, text: note.text } : n));
        },
        setShowCatagories(state, catagories) {
            state.showCatagories = catagories;
        },
        setUser(state, user) {
            state.user = user;
            state.loggedIn = state.user.id > 0 ? true : false;
        },
        clearNotes(state) {
            state.notes = [];
        },
    },
    actions: {
        initNotes({ commit }, notes) {
            commit("setNotes", notes);
        },
        async addNote({ commit }, note) {
            let notesJson = localStorage.getItem("notes");
            let notes = notesJson ? JSON.parse(notesJson) : [];
            notes.push(note);
            localStorage.setItem("notes", JSON.stringify(notes));
            commit("setNotes", notes);
        },
        async deleteNote({ commit }, id) {
            const res = await fetch(`${API}/notes/${id}`, {
                method: "DELETE",
            });
            if (res.status == 204) {
                commit("deleteNote", id);
            } else {
                alert("Error deleting note");
            }
        },
        async updateNote({ commit }, note) {
            const res = await fetch(`${API}/notes/${note.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note),
            });

            const data = await fetch(`${API}/notes/${note.id}`);
            commit("updateNote", data);
        },
        addUser({ commit }, user) {
            commit("setUser", user);
        },
    },
    modules: {},
});
