<template>
    <div class="filter">
        <div class="filterSelect">
            <v-select
                label="Filter By"
                multiple
                :items="catagories"
                v-model="show"
                chips
                variant="outlined"
                hide-details
                @update:model-value="showCatagories"
            >
            </v-select>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: [],
            };
        },
        computed: {
            catagories() {
                return this.$store.getters.getCatagories;
            },
        },
        methods: {
            showCatagories() {
                this.$store.commit("setShowCatagories", this.show);
            },
        },
    };
</script>

<style scoped>
    .filter {
        display: flex;
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgb(0 0 0 / 3%);
        border-radius: 0.8em;
        margin: 2em 0;
        justify-content: space-evenly;
    }

    .filterSelect {
        width: 70%;
        margin: 1em;
    }
</style>
