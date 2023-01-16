<template>
    <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="login__row">
                    <v-col cols="6" >
                        <v-card class="login__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <!-- <v-text-field class="input" label="Ф.И.О" placeholder="Ф.И.О"/>
                                <v-text-field class="input" label="E-mail" placeholder="E-mail"/>
                                <v-text-field class="input" label="Телефон" placeholder="E-mail"/> -->
                                <v-text-field v-model="username" class="input" label="Имя пользователя:" placeholder="Логин"/>
                                <v-text-field v-model="password" class="input" label="Пароль" placeholder="Пароль"/>
                                <v-text-field v-model="repeatPassword" class="input" label="Повторить пароль:" placeholder="Пароль"/>
                                <v-btn type="submit" class="login__button button-register" color="primary" block>
                                    Далее
                                </v-btn>
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
        password: '',
        repeatPassword: ''
    }),
    methods:{
        submitHandler(){
            axios.post('http://87.255.194.27:8001/auth/users/', 
            {
                username: this.username,
                password: this.password
            })
            .then((response) => {
                // localStorage.setItem('id', response.data)
                console.log(response)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login {

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