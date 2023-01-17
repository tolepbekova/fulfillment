<template>
    <div class="main">
        <div class="main__inner">
            <v-app-bar
                elevation="6"
                outlined
            >
                <v-toolbar-title>Fulfillment</v-toolbar-title>
                <div class="main__menu">
                    <router-link to="/main">
                        <v-btn >
                            Главная
                        </v-btn>
                    </router-link>
                    <router-link to="/invoices">
                        <v-btn class="main__nav-btn">
                            Накладные
                        </v-btn>
                    </router-link>
                    <router-link to="/goods">
                        <v-btn class="main__nav-btn">
                            Товары
                        </v-btn>
                    </router-link>
                </div>
                <v-spacer></v-spacer>
                <div class="main__user-header">
                    <p>Алмат</p>
                    <v-btn @click="logout()" class="main__nav-btn">
                        Выйти
                    </v-btn>
                </div>
            </v-app-bar>
            <div class="main__content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        logout(){
            axios.post('http://87.255.194.27:8001/auth/token/logout/',
            {

            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.main {

		&__inner {
		}

        &__menu{
            margin-left: 20px;
        }

		&__nav-btn {
            margin-left: 10px;
		}

		&__content {
            
		}
        &__user-header{
            display: flex;
            align-items: center;
            p{
                margin: 0;
            }
        }
}

</style>