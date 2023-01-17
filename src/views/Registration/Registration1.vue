<template>
    <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <h2>Этап 1</h2>
                                
                                <v-text-field 
                                v-model="username" 
                                class="input" 
                                label="Имя пользователя:" 
                                placeholder="Логин"
                                :error-messages="usernameErrors"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                                />

                                <v-text-field 
                                v-model="password" 
                                class="input" 
                                label="Пароль" 
                                placeholder="Пароль"
                                :error-messages="passwordErrors"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                />

                                <v-text-field 
                                v-model="repeatPassword" 
                                class="input" 
                                label="Повторить пароль:" 
                                placeholder="Пароль"
                                :error-messages="repeatPasswordErrors"
                                required
                                @input="$v.repeatPassword.$touch()"
                                @blur="$v.repeatPassword.$touch()"
                                />
                                <p class="invalid-feedback" v-if="errors.similiar != ''">{{errors.similiar}}</p>
                                <p class="invalid-feedback" v-if="errors.common != ''">{{errors.common}}</p>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        username: '',
        password: '',
        repeatPassword: '',
        errors: {
            similiar: '',
            common: ''
        }
    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.27:8001/auth/users/', 
                {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    console.log(response)
                    localStorage.setItem('id', response.data.id)
                    this.$router.push('/registration/2')
                })
                .catch((error) => {
                    console.log(error)
                    // if(error.response.data[0]){
                    //     this.errors.similiar = 'Пароль слишком похож на имя пользователя.'
                    // }
                    // if(error.response.data[2]){
                    //     this.errors.common = 'Этот пароль слишком распространен'
                    // }
                    // this.errors = error
                    for(let i in error.response.data.password){
                        if(i == "This password is too common."){
                            this.errors.common = 'Этот пароль слишком распространен'
                        }
                        if(i == "The password is too similar to the username."){
                            this.errors.similiar = 'Пароль слишком похож на имя пользователя.'
                        }
                    }
                })
            }
        }
    },
    computed:{
        usernameErrors () {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        passwordErrors(){
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.password.minLength && errors.push('Данное поле должно содержать не менее 8 символов')
            return errors
        },
        repeatPasswordErrors(){
            const errors = []
            if (!this.$v.repeatPassword.$dirty) return errors
            !this.$v.repeatPassword.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.repeatPassword.sameAsPassword && errors.push('Данное поле должно совпадать с предыдущим')
            return errors
        }
    },
    validations:{
        username: {required},
        password: {required, minLength: minLength(8)},
        repeatPassword: {required, sameAsPassword: sameAs('password')}
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

.invalid-feedback{
    color: rgb(252, 20, 20);
}

</style>