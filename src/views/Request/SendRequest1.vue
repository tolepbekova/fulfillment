<template>
    <div class="request">
        <v-container>
            <div class="request__inner">
                <v-row class="display-flex justify-center mt-10">
                    <v-col cols="6">
                        <v-card class="card">
                            <v-form @submit.prevent="submitHandler()">
                                <h2>Создание заявки на отправку</h2>
                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                class="mt-5"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="date"
                                        label="Дата заявки"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                        >
                                        Закрыть
                                        </v-btn>
                                        <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                        >
                                        OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-text-field 
                                    v-model="organization" 
                                    class="input" 
                                    label="Кому:" 
                                    placeholder="ТОО/ИП"
                                    :error-messages="organizationErrors"
                                    required
                                    @input="$v.organization.$touch()"
                                    @blur="$v.organization.$touch()"
                                />
                                <v-text-field 
                                    v-model="address" 
                                    class="input" 
                                    label="Адрес доставки:" 
                                    placeholder="Мынбаева, 92"
                                    :error-messages="addressErrors"
                                    required
                                    @input="$v.address.$touch()"
                                    @blur="$v.address.$touch()"
                                />
                                <v-text-field 
                                    v-model="phone" 
                                    class="input" 
                                    label="Телефон:" 
                                    placeholder="+77059064321"
                                    :error-messages="phoneErrors"
                                    required
                                    @input="$v.phone.$touch()"
                                    @blur="$v.phone.$touch()"
                                />
                                <v-select
                                v-model="distributeType"
                                :items="typeList"
                                item-text="type"
                                item-value="id"
                                label="Тип отправки"
                                :error-messages="distributeTypeErrors"
                                @change="$v.distributeType.$touch()"
                                @blur="$v.distributeType.$touch()"
                                ></v-select>
                                <v-btn color="#66FF99" type="submit" class="form__button mt-3" block>
                                    Продолжить
                                </v-btn>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    data:() => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        organization: '',
        address: '',
        phone: '+',
        distributeType: '',
        menu: false,

    }),
    methods:{
        submitHandler(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.post('http://87.255.194.27:8001/auth/token/login/', 
                {
                    
                }).then((response) => {
                    console.log(response.data)
                    
                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    },
    computed:{
        organizationErrors () {
            const errors = []
            if (!this.$v.organization.$dirty) return errors
            !this.$v.organization.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        addressErrors(){
            const errors = []
            if (!this.$v.address.$dirty) return errors
            !this.$v.address.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        phoneErrors(){
            const errors = []
            if (!this.$v.phone.$dirty) return errors
            !this.$v.phone.required && errors.push('Данное поле обязательно для заполнения')
            !this.$v.phone.minLength && errors.push('Данное поле должно содержать номер телефона')
            return errors
        },
        distributeTypeErrors(){
            const errors = []
            if (!this.$v.distributeType.$dirty) return errors
            !this.$v.distributeType.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        }
    },
    validations:{
        organization: {required},
        address: {required},
        phone: {required, minLength: minLength(11)},
        distributeType: {required},
    }
}
</script>

<style lang="scss" scoped>
.card{
    padding: 20px;
}
</style>