<template>
    <div class="request">
        <v-form ref="form" @submit.prevent="sendGoods()">
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Invoice ID
                        </th>
                        <th class="text-left">
                            Нумерация №
                        </th>
                        <th class="text-left">
                            Наименование товара
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Общий остаток 
                        </th>
                        <th class="text-left">
                            Выбрать 
                        </th>
                        <!-- <th class="text-left">
                             
                        </th> -->
                        <th class="text-left">
                            Количество на отправку
                        </th>
                        <!-- <th class="text-left">
                             
                        </th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(good, index) in goodsList"
                    :key="good.id"
                    >
                        <td>{{ good.invoice_id }}</td>
                        <td>{{ index + 1 }}</td>
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>
                            <p v-if="good.result == null">{{ good.good_quantity }}</p>
                            <p v-else>{{good.result}}</p>
                        </td>
                        <td>
                            <v-checkbox
                            color="success"
                            v-model.trim="form.selectedGood[index]"
                            :value="good.id">
                            </v-checkbox>
                            {{form.selectedGood}}
                        </td>
                        
                        <td>
                            <v-text-field
                            v-model.trim="form.quantity_to_send[index]"
                            
                            @keypress="isNumber"
                            :rules="[rules.required]"
                            required
                            :disabled="!form.selectedGood[index]"></v-text-field>
                            <!-- {{index}} -->
                            <!-- v-if="form.selectedGood[index] != null" -->
                            <p class="" v-if="form.quantity_to_send[index] > (good.result === null ?  good.good_quantity : good.result)">Количество не должно превышать остаток</p>
                            <!-- <div v-if="!$v.form.quantity_to_send[index].required">Description is required.</div> -->
                        </td>
                        
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            <v-btn
            small
            type="submit">
                Сохранить
            </v-btn>
        </v-form>
    </div>
</template>


<script>
import axios from 'axios'
import { required, maxValue } from 'vuelidate/lib/validators'
export default {
    data: () => ({
        goodsList: [],
        form:{
            order: localStorage.getItem('orderId'),
            selectedGood: [],
            quantity_to_send: []
        },
        rules:{
            required: value => !!value || 'Данное поле обязательно',
        }
    }),
    methods:{
        getOrdersGoodList(){
            axios.get('http://87.255.194.27:8001/api/orders/good/list/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.goodsList = response.data
            })
        },
        isNumber (e) {
        const regex = /[0-9]/
        if (!regex.test(e.key)) {
            e.returnValue = false;
            if (e.preventDefault) e.preventDefault();
            }
        },
        changeCounter: function(num){
			this.counter += +num
			console.log(this.counter)
			!isNaN(this.counter) && this.counter > 0 ? this.counter : this.counter = 0;
            
		},
        appendQuantity(value, result, quantity){
            value++;
            // if(result == null){
            //     if(value > )
            // }
        },
        prependQuantity(){

        },
        sendGoods(){
            let goods = this.form.selectedGood
            let quantity = this.form.quantity_to_send
            let array = []
            for(let i in goods){
                if(goods[i] != null){
                    
                    array.push({
                        order: localStorage.getItem('orderId'),
                        good: goods[i],
                        quantity: quantity[i]
                    })
                }
            }

            console.log(array)
            axios.post('http://87.255.194.27:8001/api/goods_to_send/',
            array,
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
            
        }
    },
    mounted(){
        this.getOrdersGoodList()
    },
    computed:{
        // quantityToSendErrors () {
        //     const errors = []
        //     if (!this.$v.username.$dirty) return errors
        //     !this.$v.username.required && errors.push('Данное поле обязательно для заполнения')
        //     return errors
        // },
    },
    // validations(){
    //     if(!this.form.selectedGood){
    //         return {
    //             form:{
    //                 quantity_to_send: {
    //                     required
    //                 }
    //             }
    //         }
    //     }
    // }
}
</script>


<style lang="scss" scoped>
.button{
    width: 20px;
    height: 20px;
}
</style>

<!-- <td>
                            <v-btn
                            class="mx-2 button"
                            fab
                            dark
                            color="green"
                            small
                            @click="appendQuantity(form.quantity_to_send[index], good.result, good.good_quantity)"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </td> -->

                        <!-- <td>
                            <v-btn
                            class="button"
                            fab
                            dark
                            small
                            color="red"
                            @click="changeCounter('-1')"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </td> -->