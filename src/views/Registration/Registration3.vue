<template>
    <div class="registration">
        <div class="retistration__inner">
            <v-container>
                <v-row class="form__row">
                    <v-col cols="6" >
                        <v-card class="form__card">
                            <v-form @submit.prevent="submitHandler()" class="form">
                                <h2>Регистрация</h2>
                                <h2>Этап 3</h2>
                                <v-select
                                v-model="typeId"
                                :items="typeList"
                                item-text="title"
                                item-value="id"
                                label="Тип организации"
                                ></v-select>
                                <v-text-field class="input" v-model="name" label="Имя организации" placeholder="Имя организации"/>
                                <v-text-field class="input" v-model="BIN" label="BIN" placeholder="BIN"/>
                                <v-text-field class="input" v-model="address" label="Адрес" placeholder="Адрес"/>
                                <v-select
                                v-model="bankId"
                                
                                :items="bankList"
                                item-text="name"
                                item-value="id"
                                label="Выберите банк"
                                >
                                    
                                </v-select>
                                {{bankId}}
                                <v-text-field class="input" v-model="IBAN" label="IBAN" placeholder="IBAN"/>
                                <v-text-field class="input" v-model="phone" label="Телефон" placeholder="+77001616757"/>
                                <v-text-field class="input" v-model="director_name" label="Имя директора" placeholder="Имя директора"/>
                                <v-text-field class="input" v-model="director_phone" label="Телефон директора" placeholder="+77001616757"/>
                                <v-text-field class="input" v-model="fulfillment" label="Fulfillment" placeholder="Fulfillment"/>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
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
        typeList: [],
        bankList: [],
        bankId: '',
        typeId: '',
        name: '',
        BIN: '',
        address: '',
        IBAN: '',
        phone: '',
        director_name: '',
        director_phone: '',
        fulfillment: ''
    }),
    methods:{
        getOrgType(){
            axios.get('http://87.255.194.27:8001/api/org_types/')
            .then((response) => {
                console.log(response.data)
                this.typeList = response.data
            })
        },
        getBankList(){
            axios.get('http://87.255.194.27:8001/api/banks/')
            .then((response) => {
                console.log(response.data)
                this.bankList = response.data
            })
        },
        submitHandler(){
            axios.post('http://87.255.194.27:8001/api/user/organization/create/', 
            {
                type: this.typeId,
                name: this.name,
                BIN: this.BIN,
                address: this.address,
                bank: this.bankId,
                IBAN: this.IBAN,
                phone: this.phone,
                director_name: this.director_name,
                director_phone: this.director_phone,
                fulfillment: this.fulfillment
            },
            {
                params: {
                    user: localStorage.getItem('id')
                }
            }
            )
            .then((response) => {
                // localStorage.setItem('id', response.data)
                // console.log(response.data)
                alert('Успешно')
                // this.$router.push('/registration/3')
                // localStorage.removeItem('id')
            })
            .catch((error) => {
                console.log(error)
                
            })
        }
    },
    mounted(){
        this.getOrgType(),
        this.getBankList()
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