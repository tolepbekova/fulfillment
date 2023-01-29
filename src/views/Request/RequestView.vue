<template>
    <div class="request">
        <v-container>
            <router-link to="/requests">
                <v-btn
                    class="mt-3"               
                    color="orange darken-2"
                    dark
                >
                <v-icon
                dark
                left
                >
                mdi-arrow-left
                </v-icon>Назад
                </v-btn>
            </router-link>
            <span v-if="request.is_draft == true" class="">
            <v-dialog
            transition="dialog-top-transition"
            max-width="600"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                
                class="ml-5 mt-3"
                color="primary"
                v-bind="attrs"
                v-on="on"
                >Редактировать заявку</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                <v-toolbar
                    color="primary"
                    dark
                >Редактирование заявки</v-toolbar>
                <v-form class="card" @submit.prevent="patchRequest()">
                            
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
                                    v-model="contacts" 
                                    class="input" 
                                    label="Контактные данные:" 
                                    placeholder="Контакты"
                                    :error-messages="contactsErrors"
                                    required
                                    @input="$v.contacts.$touch()"
                                    @blur="$v.contacts.$touch()"
                                />
                                
                                <v-select
                                v-model="distributeType"
                                :items="shippingTypes"
                                item-text="type"
                                item-value="id"
                                label="Тип отправки"
                                :error-messages="distributeTypeErrors"
                                @change="$v.distributeType.$touch()"
                                @blur="$v.distributeType.$touch()"
                                ></v-select>
                                <v-btn color="green"
                                dark  type="submit" class="form__button mt-3" block>
                                    Сохранить
                                </v-btn>
                        </v-form>
                <v-card-actions class="justify-end">
                    <v-btn
                    text
                    @click="dialog.value = false"
                    >Назад</v-btn>
                </v-card-actions>
                </v-card>
            </template>
            </v-dialog>
            </span>
            <v-btn v-if="request.is_draft == true" @click.prevent="sendOrder()" class="mt-3 ml-5">
                Отправить Заявку
            </v-btn>
            
            <v-card
            
            elevation="7"
            shaped
            class="mt-5"
            >
                <v-card-title>
                    Заявка №: {{request.id}}
                </v-card-title>
                <div class="block">
                    <v-card-subtitle>
                        Дата заявки: {{request.date}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Адрес доставки: {{request.shipping_address}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Получатель: {{request.recipient}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Контакты: {{request.contacts}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Тип доставки: {{request.shipping_type}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Статус: {{request.status}}
                    </v-card-subtitle>
                    <!-- <v-card-subtitle>
                        Ячейка на складе: {{request.status}}
                    </v-card-subtitle> -->
                </div>
            </v-card>
            <v-btn v-if="request.is_draft == true" @click.prevent="showButton = !showButton" class="mt-5">
                Редактировать товары
            </v-btn>
            <router-link to="/request/2">
                <v-btn v-if="showButton == true" @click="setToStorage(request.id)" class="mt-5 ml-5">
                    Добавить товары
                </v-btn>
            </router-link>
            <v-simple-table class="mt-5">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Наименование товара
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Количество на отправку
                        </th>
                        <th class="text-left">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(good, index) in request.goods_to_send"
                    :key="good.id"
                    >
                        <td>{{index + 1}}</td>
                        <td>{{good.good_name}}</td>
                        <td>{{good.good_vendor_code}}</td>
                        <td>{{good.quantity}}</td>
                        <td>
                            <v-btn v-if="showButton == true" @click="deleteGood(good.id)">
                                &#10006;
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            
            
            
            <!-- <v-btn
            v-if="showButton == true"
            class="mt-5"
            color=""
            @click="generateBarCode()">
            
                Сгенерировать штрих-код
            </v-btn> -->
            <!-- <div class="">
                <h3  class="mt-5">Штрих-код:</h3>
                <div style="width: 500px; height: 500px;" id="element-to-convert" class="mt-5" v-html="barcode">
                
                </div>
            </div>
            <v-btn
            class="mt-5"
            @click="exportToPDF">
                Сохранить в PDF
            </v-btn> -->
        </v-container>
        
    </div>
</template>

<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        request: {},
        barcode: '',
        showButton: true,
        date: '',
        organization: '',
        address: '',
        contacts: '',
        distributeType: '',
        menu: false,
        shippingTypes: [],
        showButton: false
    }),
    methods:{
        getRequestData(){
            axios.get('http://87.255.194.27:8001/api/orders/' +  localStorage.getItem('requestId') + '/detail/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.request = response.data
                this.organization = response.data.recipient,
                this.address = response.data.shipping_address,
                this.contacts = response.data.contacts,
                this.date = response.data.date
                console.log(response.data)
                if(response.data.barcode_file){
                    this.showButton = false
                    this.barcode = response.data.barcode_file.join('')
                }
                
            })
        },
        getShippingTypes(){
            axios.get('http://87.255.194.27:8001/api/shipping_types/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.shippingTypes = response.data
            })
        },
        patchRequest(){
            this.$v.$touch()
            if(!this.$v.$invalid){
                axios.put('http://87.255.194.27:8001/api/orders/'+ localStorage.getItem('requestId') +'/', 
                {
                    date: this.date,
                    recipient: this.organization,
                    shipping_address: this.address,
                    contacts: this.contacts,
                    shipping_type: this.distributeType
                },
                {
                    headers:{
                        Authorization: 'Token ' + localStorage.getItem('usertoken')
                    }
                }).then((response) => {
                    this.getRequestData()
                })
            }
            
        },
        deleteGood(value){
            axios.delete('http://87.255.194.27:8001/api/goods_to_send/' + value)
            .then(() => {
                alert('Успешно')
                this.getRequestData()
            })
        },
        setToStorage(value){
            localStorage.setItem('orderId', value)
        },
        sendOrder(){
            axios.patch('http://87.255.194.27:8001/api/orders/'+ localStorage.getItem('requestId') +'/immutable/',
            {

            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then(() => {
                alert('Успешно')
            })
        },
        generateBarCode(){
            axios.put('http://87.255.194.27:8001/api/orders/' + localStorage.getItem('requestId') + '/barcode/generate/',
            {
                
            },
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                this.getRequestData()
            })
        },
        exportToPDF() {
			html2pdf(document.getElementById("element-to-convert"), {
				margin: 1,
  			    filename: "Заявка",
			});
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
        contactsErrors(){
            const errors = []
            if (!this.$v.contacts.$dirty) return errors
            !this.$v.contacts.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        },
        distributeTypeErrors(){
            const errors = []
            if (!this.$v.distributeType.$dirty) return errors
            !this.$v.distributeType.required && errors.push('Данное поле обязательно для заполнения')
            return errors
        }
    },
    mounted(){
        this.getRequestData(),
        this.getShippingTypes()
    },
    validations:{
        organization: {required},
        address: {required},
        contacts: {required},
        distributeType: {required},
    }
}
</script>

<style lang="scss" scoped>
.block{
    display: flex;
}

.card{
    padding: 20px;
}
</style>