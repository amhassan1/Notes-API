<template>
    <div class="myNotes" v-if="loggedIn">
        <div class="controls">
            <div class="sticky">
                <note-sort></note-sort>
                <notes-header></notes-header>
            </div>
        </div>
        <notes-page></notes-page>
    </div>
    <div class="log" v-else>Please Log In to See Your Notes</div>
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
            const res = await fetch(`${API}/notes?username=${user.username}`);
            const data = await res.json();
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

    .sticky {
        position: sticky;
        top: 30px;
    }
</style>
