<template>
    <div class="form">
        <div class="form__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Вход</h2>
                                <v-text-field v-model="username" class="input" label="Введите имя пользователя:" placeholder="Алмат"/>
                                <v-text-field v-model="password" class="input" label="Введите пароль:"/>
                                <v-btn type="submit" class="form__button" block>
                                        Войти
                                </v-btn>
                                <p class="form__text">Или</p>
                                <router-link to="/registration/1">
                                    <v-btn class="form__button" block>
                                        Зарегистрироваться
                                    </v-btn>
                                </router-link>
                                <router-link  to=""><a class="form__link" href="">Забыли пароль?</a></router-link>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        username: '',
        password: ''
    }),
    methods:{
        submitHandler(){
            axios.post('http://87.255.194.27:8001/auth/token/login/', 
            {
                username: this.username,
                password: this.password
            }).then((response) => {
                console.log(response.data)
                this.$router.push('/main')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.form {

		&__inner {
		}

        &__card{
            padding: 20px;
        }

        &__row{
            display: flex;
            justify-content: center;
            margin: 100px 0 0 0;
        }

        &__text{
            text-align: center;
            margin: 10px 0 0 0;
        }

        &__button{
            margin: 10px 0 0 0;
        }

        &__link{
            text-align: center;
            width: 100%;
        }
}
.form {
}
.input {
}

</style>