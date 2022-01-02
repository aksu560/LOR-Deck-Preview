<template>
    <div class="navbar is-info">
        <router-link to="/" class="navbar-item">
            Home
        </router-link>
        <router-link to="/About" class="navbar-item">
            About
        </router-link>
    </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {

}
</script>

<style>

</style>