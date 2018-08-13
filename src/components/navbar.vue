<template>
    <div>
        <div v-if="user">
            <div class="row at-row flex-middle menu">
                <div class="col-md-5"><h3>Smart Notes</h3></div>
                <div class="col-md-14"></div>
                <div class="col-md-5 flex-end">
                    <at-dropdown>
                    <span><img :src="user.photoURL"/></span>
                    <at-dropdown-menu slot="menu">
                        <at-dropdown-item><span @click.prevent="">Settings</span></at-dropdown-item>
                        <at-dropdown-item><span @click.prevent="logOutFromGoogle">Logout</span></at-dropdown-item>
                    </at-dropdown-menu>
                    </at-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase';

    export default {
        name: 'Navbar',
        data() {
            return {
                user: null
            }
        },
        methods: {
            logOutFromGoogle() {
                firebase.auth().signOut().then(() => {
                    this.$router.push({ name: 'Login'})
                })
            }
        },
        created() {
            firebase.auth().onAuthStateChanged((user) => {
                if(user) {
                    this.user = user
                } else {
                    this.user = null
                }
            })
        }
    }
</script>

<style scoped>
.menu {
    margin-bottom: 40px;
}
img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
img {
    max-width: 100%;
}
</style>