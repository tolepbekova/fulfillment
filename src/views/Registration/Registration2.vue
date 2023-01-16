<template>
    <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <h2>Этап 2</h2>
                                <v-text-field v-model="first_name" class="input" label="Фамилия" placeholder="Фамилия"/>
                                <v-text-field v-model="last_name" class="input" label="Имя" placeholder="Имя"/>
                                <v-text-field v-model="email" class="input" label="E-mail" placeholder="E-mail"/>
                                <v-text-field v-model="phone" class="input" label="Телефон" placeholder="E-mail"/>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Далее
                                </v-btn>
                                {{errors}}
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
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    }),
    methods: {
        submitHandler(){
            axios.patch('http://87.255.194.27:8001/users/' + localStorage.getItem('id') + '/update/', 
            {
                first_name: this.first_name,
                last_name: this.last_name,
                phone: this.phone,
                email: this.email
            },
            )
            .then((response) => {
                // localStorage.setItem('id', response.data)
                console.log(response.data)
                
                this.$router.push('/registration/3')
            })
            .catch((error) => {
                console.log(error)
                
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