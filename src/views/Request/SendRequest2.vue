<template>
    <div class="request">
        <v-container>
            {{selectedGoods}}
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
                        <th class="text-left">
                             
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
                        <!-- <td v-if="good.result == null">{{ good.good_quantity }}</td>
                        <td v-if="good.resul != null">{{good.result}}</td> -->
                        <td>
                            <v-checkbox
                            color="success"
                            v-model="selectedGoods"
                            :value="good.title">
                            </v-checkbox>
                        </td>
                        <td>
                            <v-btn
                            class="mx-2 button"
                            fab
                            dark
                            color="green"
                            small
                            >
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </td>
                        <td>
                            <v-text-field
                            @keypress="isNumber"></v-text-field>
                        </td>
                        <td>
                            <v-btn
                            class="button"
                            fab
                            dark
                            small
                            color="red"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    data: () => ({
        goodsList: [],
        selectedGoods: []
    }),
    methods:{
        getOrdersGoodList(){
            axios.get('http://87.255.194.27:8001/api/orders/good/list/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
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