<template>
    <div class="main">
        
            <v-card
            class="mx-auto overflow-hidden card"
            >
                <v-app-bar
                color="light-blue darken-1"
                
                prominent
                :height="60"
                >
                <!-- dark -->
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>Fullfilment eTrader</v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn> -->

                <v-spacer></v-spacer>

                <!-- <v-btn icon>
                    <v-icon>mdi-filter</v-icon>
                </v-btn> -->
                <v-toolbar-title>{{username}}</v-toolbar-title>
                <v-btn @click="logout()" small class="mt-3">
                    Выйти
                </v-btn>

                </v-app-bar>

                <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
                >
                <v-list
                    nav
                    dense
                >
                    <v-list-item-group
                    v-model="group"
                    active-class="deep-purple--text text--accent-4"
                    >
                    <router-link to="/main">
                        <v-list-item>
                            <v-list-item-title>Главная</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/invoices">
                        <v-list-item>
                            <v-list-item-title>Накладные</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/goods">
                        <v-list-item>
                            <v-list-item-title>Товары</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    <router-link to="/request/1">
                        <v-list-item>
                            <v-list-item-title>Отправить заявку</v-list-item-title>
                        </v-list-item>
                    </router-link>

                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <router-view/>
            </v-card>
        
        <!-- <div class="main__inner">
            <v-app-bar
                elevation="6"
                outlined
                color="#66FF99"
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
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        username: '',
        drawer: false,
        group: null,
    }),
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
                localStorage.clear()
            })
        },
        getUserName(){
            axios.get('http://87.255.194.27:8001/auth/users/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                // console.log(response.data)
                this.username = response.data.username
            })
        }
    },
    mounted(){
        this.getUserName()
    },
    watch: {
      group () {
        this.drawer = false
      },
    }
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
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

.card{
    height: 100%;
}


</style>