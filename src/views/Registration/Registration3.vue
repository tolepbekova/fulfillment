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
                                <v-text-field class="input" label="Имя организации" placeholder="Имя организации"/>
                                <v-text-field class="input" label="BIN" placeholder="BIN"/>
                                <v-text-field class="input" label="Адрес" placeholder="Адрес"/>
                                <v-select
                                v-model="bankId"
                                
                                :items="bankList"
                                item-text="name"
                                item-value="id"
                                label="Выберите банк"
                                >
                                    
                                </v-select>
                                {{bankId}}
                                <v-text-field class="input" label="IBAN" placeholder="IBAN"/>
                                <v-text-field class="input" label="Телефон" placeholder="+77001616757"/>
                                <v-text-field class="input" label="Имя директора" placeholder="Имя директора"/>
                                <v-text-field class="input" label="Телефон директора" placeholder="+77001616757"/>
                                <v-text-field class="input" label="Fulfillment" placeholder="Fulfillment"/>
                                <v-btn type="submit" class="form__button button-register" color="primary" block>
                                    Зарегистрироваться
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
        typeList: [],
        bankList: [],
        bankId: '',
        typeId: ''
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