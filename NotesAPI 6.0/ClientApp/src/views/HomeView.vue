<template>
    <div class="home arima">
        <h1>Notes</h1>
        <h2 class="text-align-center">Welcome {{ user.firstName }} {{ user.lastName }}</h2>
        <h3 v-if="loggedIn" class="text-align-center">Create Notes Quickly and Easily</h3>
        <h4 v-if="loggedIn" class="text-align-center">Go to My Notes</h4>
        <h2 v-else class="text-align-center">Sign In to access your Notes</h2>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "HomeView",
        computed: {
            ...mapGetters({ user: "getUser", loggedIn: "getStatus" }),
        },
    };
</script>

<style scoped>
    h1,
    h2,
    h3,
    h4,
    h5 {
        color: #333533;
        /* text-shadow: 2px 1px black; */
    }

    .home {
        margin: 20px 0;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
    }

    .home * {
        padding: 10px 0;
    }

    .text-align-center {
        text-align: center;
    }
</style>
