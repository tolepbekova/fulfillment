<template>
    <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="login__row">
                    <v-col cols="6" >
                        <v-card class="login__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <v-text-field class="input" label="Ф.И.О" placeholder="Ф.И.О"/>
                                <v-text-field class="input" label="E-mail" placeholder="E-mail"/>
                                <v-text-field class="input" label="Телефон" placeholder="E-mail"/>
                                <v-text-field class="input" label="Имя пользователя:" placeholder="Логин"/>
                                <v-text-field class="input" label="Пароль" placeholder="Пароль"/>
                                <v-text-field class="input" label="Повторить пароль:" placeholder="Пароль"/>
                                <v-btn class="login__button button-register" color="primary" block>
                                    Зарегистрироваться
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
        
    }),
    methods:{

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