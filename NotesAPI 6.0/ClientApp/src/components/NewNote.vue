<template>
    <div class="note">
        <button class="btn" @click="addNote">
            <v-icon size="large">mdi-plus</v-icon><v-tooltip activator="parent">New Note</v-tooltip>
        </button>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        methods: {
            addNote() {
                const newNote = {
                    text: "¯\\_(ツ)_/¯",
                    catagory: this.catagory.length > 0 ? this.catagory[0] : "",
                    color: "#000000",
                    bg_color: "#E9FF70",
                    userId: this.user.id,
                };
                this.$store.dispatch("addNote", newNote);
            },
        },
        computed: {
            ...mapGetters({ user: "getUser", catagory: "getShow" }),
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        min-width: 35ch;
        min-height: 250px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        padding: 20px;
        margin: 10px;
    }

    .btn {
        width: 60px;
        height: 60px;
        display: inline-block;
        border-radius: 50%;
        border: none;
    }

    .btn:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }
</style>
