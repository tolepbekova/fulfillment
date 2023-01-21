<template>
    <div class="request">
        <v-container>
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
                        <!-- <td>
                            <v-btn
                            class="mx-2 button"
                            fab
                            dark
                            color="green"
                            small
                            @click="changeCounter('1')"
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </td> -->
                        <td>
                            <v-text-field
                            v-model.trim="form.quantity_to_send[index]"
                            :value="counter"
                            @keypress="isNumber"></v-text-field>
                            {{index}}
                            {{form.quantity_to_send[index]}}
                        </td>
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
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            <v-btn
            small
            @click.prevent="">
                Сохранить
            </v-btn>
        </v-container>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data: () => ({
        goodsList: [],
        counter: 0,
        form:{
            selectedGood:[],
            quantity_to_send: []
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
        appendQuantity(){
            
        },
        prependQuantity(){

        },
        sendGoods(){
            console.log(form)
        }
    },
    mounted(){
        this.getOrdersGoodList()
    }
}
</script>


<style lang="scss" scoped>
.button{
    width: 20px;
    height: 20px;
}
</style>