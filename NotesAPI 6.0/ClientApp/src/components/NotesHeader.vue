<template>
    <div id="noteHeader">
        <ul>
            <li class="noteText form-list-item">
                <v-textarea
                    v-model="note.text"
                    label="Text"
                    id="noteTextInput"
                    rows="1"
                    auto-grow
                    bg-color="inherit"
                    hide-details
                    variant="underlined"
                ></v-textarea>
            </li>
            <li class="form-list-item">
                <v-select
                    v-model="note.catagory"
                    variant="underlined"
                    :items="catagories"
                    :style="{ width: '100%' }"
                    label="Category"
                    hide-details
                >
                </v-select>
            </li>
            <li class="form-list-item">
                <label>Font Color</label>
                <v-radio-group v-model="note.color" inline hide-details>
                    <v-radio v-for="color in fontColors" :value="color" :color="color"
                        ><template v-slot:label>
                            <div
                                :style="{
                                    minWidth: 45 + 'px',
                                    minHeight: 18 + 'px',
                                    backgroundColor: color,
                                    borderRadius: 3 + 'px',
                                }"
                            ></div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </li>
            <li class="form-list-item">
                <label>Note Color</label>
                <v-radio-group v-model="note.bg_color" inline hide-details>
                    <v-radio v-for="color in backgroundColors" :value="color" :color="color"
                        ><template v-slot:label>
                            <div
                                :style="{
                                    minWidth: 45 + 'px',
                                    minHeight: 18 + 'px',
                                    backgroundColor: color,
                                    borderRadius: 3 + 'px',
                                }"
                            ></div>
                        </template>
                    </v-radio>
                </v-radio-group>
            </li>
            <li class="form-list-item">
                <button @click="addNote" id="add">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        class="bi bi-journal-plus"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
                        />
                        <path
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
                        />
                    </svg>
                    Add Note
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                note: {
                    text: "",
                    catagory: "",
                    color: "#000000",
                    bg_color: "#E9FF70",
                },
            };
        },
        methods: {
            addNote() {
                if (this.note.text === "") {
                    alert("Add note text");
                    return;
                }

                const newNote = { userId: this.user.id, ...this.note };
                this.$store.dispatch("addNote", newNote);

                this.note.text = "";
                this.note.catagory = "";
                this.note.color = this.fontColors[0];
                this.note.bg_color = this.backgroundColors[0];
            },
        },
        computed: {
            ...mapGetters({
                user: "getUser",
                catagories: "getCatagories",
                fontColors: "getNoteFontColors",
                backgroundColors: "getNoteBackgroundColors",
            }),
        },
    };
</script>

<style scoped>
    #noteHeader {
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
        min-width: fit-content;
        border-radius: 0.8em;
        margin: 2em 0;
    }

    #noteHeader ul {
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0px;
        padding: 5px 10px;
        align-items: center;
    }

    #noteHeader li {
        display: inline-block;
        margin: 5px;
        margin-bottom: 15px;
        min-height: 40px;
    }

    #noteTextInput {
        width: 100%;
    }
    .form-list-item {
        width: 50%;
        min-width: 200px;
    }

    .form-list-item label {
        color: #a0a0a0;
    }
    #add {
        display: block;
        width: 100%;
        height: 40px;
        cursor: pointer;
        border-radius: 5px;
    }

    #add:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>
