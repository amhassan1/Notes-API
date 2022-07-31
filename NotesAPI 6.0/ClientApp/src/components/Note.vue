<template>
    <div class="note" ref="noteDiv" :style="{ backgroundColor: note.bg_color }">
        <div class="btns">
            <div>
                <button class="button delBtn" @click="delNote">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-journal-x"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"
                        />
                        <path
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
                        />
                        <path
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
                        />
                    </svg>
                    <v-tooltip activator="parent" location="start">Delete</v-tooltip>
                </button>
                <button class="button undoBtn" @click="undoNote">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-90deg-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
                        />
                    </svg>
                    <v-tooltip activator="parent">Undo</v-tooltip>
                </button>
                <button class="button saveBtn" @click="updateNote" v-show="edited">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-journal-text"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
                        />
                        <path
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
                        />
                        <path
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
                        />
                    </svg>
                    <v-tooltip activator="parent">Update</v-tooltip>
                </button>
            </div>

            <v-menu v-model="menu" :close-on-content-click="false">
                <template v-slot:activator="{ props }">
                    <button class="button" v-bind="props">...</button>
                </template>
                <v-card title="Edit" max-width="300">
                    <v-card-content>
                        <v-select
                            :items="catagories"
                            variant="plain"
                            label="category"
                            v-model="note.catagory"
                            hide-details
                        ></v-select>

                        <v-divider></v-divider>

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

                        <v-divider></v-divider>

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
                    </v-card-content>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="
                                undoNote();
                                menu = false;
                            "
                            >Cancel</v-btn
                        >

                        <v-btn
                            color="primary"
                            @click="
                                updateNote();
                                menu = false;
                            "
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-menu>
        </div>
        <v-textarea
            class="edu"
            v-model="note.text"
            :style="{ color: note.color }"
            auto-grow
            variant="plain"
            bg-color="inherit"
            hide-details
        ></v-textarea>
        <p class="catagory arima">{{ note.catagory }}</p>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        props: {
            note: Object,
        },
        data() {
            return {
                menu: false,
                initText: "",
                initCategory: "",
                initColor: "",
                initBackgroundColor: "",
            };
        },
        methods: {
            delNote() {
                const id = this.note.id;
                if (confirm("Are you sure you want to delete note?")) {
                    this.$store.dispatch("deleteNote", id);
                }
            },
            updateNote() {
                if (confirm("Are you sure you want to update note?")) {
                    const updtNote = {
                        userId: this.user.id,
                        text: this.note.text,
                        color: this.note.color,
                        catagory: this.note.catagory,
                        bg_color: this.note.bg_color,
                        id: this.note.id,
                    };

                    this.initText = this.note.text;
                    this.initCategory = this.note.catagory;
                    this.initColor = this.note.color;
                    this.initBackgroundColor = this.note.bg_color;

                    if (updtNote.text === "") {
                        this.$store.dispatch("deleteNote", updtNote.id);
                    } else {
                        this.$store.dispatch("updateNote", updtNote);
                        this.adjustWidth();
                    }
                } else {
                    this.note.text = this.initText;
                }
            },
            undoNote() {
                this.note.text = this.initText;
                this.note.catagory = this.initCategory;
                this.note.color = this.initColor;
                this.note.bg_color = this.initBackgroundColor;
            },
            adjustWidth() {
                const noteDiv = this.$refs.noteDiv;
                let longestLineLength = this.lengthOfLongestLine(this.note.text);
                let wantedWidth = longestLineLength > 60 ? 60 : longestLineLength;
                noteDiv.style.width = longestLineLength > 35 ? wantedWidth + "ch" : "35ch";
            },
            lengthOfLongestLine(paragraph) {
                let longestLineLength = 0;
                let currentLineLength = 0;
                for (let i = 0; i < paragraph.length; i++) {
                    if (paragraph[i] !== "\n") {
                        currentLineLength++;
                    } else {
                        currentLineLength = 0;
                    }
                    if (currentLineLength > longestLineLength) {
                        longestLineLength = currentLineLength;
                    }
                }
                return longestLineLength;
            },
        },
        computed: {
            ...mapGetters({
                user: "getUser",
                catagories: "getCatagories",
                fontColors: "getNoteFontColors",
                backgroundColors: "getNoteBackgroundColors",
            }),
            edited() {
                return this.note.text !== this.initText;
            },
        },
        mounted() {
            this.adjustWidth();
        },
        created() {
            this.initText = this.note.text;
            this.initCategory = this.note.catagory;
            this.initColor = this.note.color;
            this.initBackgroundColor = this.note.bg_color;
        },
    };
</script>

<style scoped>
    .note {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        min-width: 35ch;
        min-height: 100px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
        padding: 20px;
        margin: 10px;
        transition: background-color 200ms ease;
    }
    .catagory {
        font-size: x-small;
        margin: 0px;
        text-align: right;
    }

    .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
    }

    .button {
        height: 30px;
        width: 30px;
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        margin: 0 2px;
    }

    .delBtn {
        color: red;
    }

    .undoBtn {
        color: black;
    }

    .saveBtn {
        color: blue;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.06);
    }
</style>
