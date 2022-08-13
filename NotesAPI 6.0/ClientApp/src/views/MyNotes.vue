<template>
    <div class="myNotes">
        <div class="controls">
            <note-sort></note-sort>
            <notes-header></notes-header>
        </div>
        <notes-page></notes-page>
    </div>
</template>

<script>
    import NotesHeader from "@/components/NotesHeader";
    import NotesPage from "@/components/NotesPage";
    import NoteSort from "@/components/NoteSort";
    import { API } from "@/uri";
    import { mapGetters } from "vuex";

    export default {
        components: {
            NotesHeader,
            NotesPage,
            NoteSort,
        },
        computed: {
            ...mapGetters({ getUser: "getUser", loggedIn: "getStatus" }),
        },
        async created() {
            const user = await this.getUser;
            //const res = await fetch(`${API}/notes?username=${user.username}`);
            const res = localStorage.getItem("notes");
            const data = res ? JSON.parse(res) : [];
            this.$store.dispatch("initNotes", data);
        },
    };
</script>

<style scoped>
    .myNotes {
        display: grid;
        grid-template-columns: 250px 1fr;
        column-gap: 40px;
    }

    .log {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px;
        font-weight: bold;
    }
</style>
