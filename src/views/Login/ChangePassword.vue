<template>
    <div class="form">
            <v-container>
                <v-row class="d-flex justify-center align-center">
                    <v-col class="d-flex align-center" cols="2">
                        <div class="logo">
                            <img src="../../assets/logo/fullfilment-logo.svg" alt="logo">
                        </div>
                    </v-col>
                    <v-col cols="6">
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Смена пароля</h2>
                                <v-text-field 
                                    v-model="username" 
                                    class="input" 
                                    label="Введите имя пользователя:" 
                                    placeholder="Алмат"
                                    :error-messages="usernameErrors"
                                    required
                                    @input="$v.username.$touch()"
                                    @blur="$v.username.$touch()"
                                />

                                <v-text-field 
                                    v-model="password" 
                                    class="input" 
                                    label="Введите пароль:"
                                    :error-messages="passwordErrors"
                                    required
                                    @input="$v.password.$touch()"
                                    @blur="$v.password.$touch()"
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                    @click:append="showPassword = !showPassword"
                                />
                                <p class="invalid-feedback" v-if="error">{{error}}</p>
                                <v-btn color="#66FF99" type="submit" class="form__button" block>
                                    Войти
                                </v-btn>
                                <p class="form__text">Или</p>
                                <router-link to="/registration/1">
                                    <v-btn color="#0099FF" class="form__button mb-5" block>
                                        Зарегистрироваться
                                    </v-btn>
                                </router-link>
                                <router-link to="/login/change">
                                    <a class="form__link" href="">Забыли пароль?</a>
                                </router-link>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<style lang="scss" scoped>
.form {
    height: 100%;
		&__inner {
            height: 100%;
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
            &:last-child{
                margin-bottom: 10px;
            }
        }

        &__link{
            text-align: center;
            width: 100%;
            margin: 20px 0 0 0;
        }

        
}
.form {
}
.input {
}
.invalid-feedback{
    color: rgb(252, 20, 20);
}

.logo{
    width: 150px;
    height: 150px;
    img{
        max-width: 100%;
        border-radius: 50%;
    }
}

.container{
    height: 100%;
}

.row{
    height: 100%;
}

</style>