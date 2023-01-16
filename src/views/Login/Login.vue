<template>
    <div class="form">
        <div class="form__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form class="form">
                                <h2>Вход</h2>
                                <v-text-field class="input" label="Введите имя пользователя:" placeholder="Алмат"/>
                                <v-text-field class="input" label="Введите пароль:"/>
                                <v-btn class="form__button" block>
                                    Войти
                                </v-btn>
                                <p class="form__text">Или</p>
                                <v-btn class="form__button" block>
                                    Зарегистрироваться
                                </v-btn>
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

export default {
    
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