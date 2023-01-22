<template>
    <div class="requests">
        <v-container>
            <router-link to="/request/1">
                <v-btn
                    color="green"
                    dark
                    small
                    class="mt-5 ml-5"
                >
                    Добавить заявку
                </v-btn>
            </router-link>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            №
                        </th>
                        <th class="text-left">
                            Дата
                        </th>
                        <th class="text-left">
                            Получатель
                        </th>
                        <th class="text-left">
                            Адрес доставки
                        </th>
                        <th class="text-left">
                            Контакты
                        </th>
                        <th class="text-left">
                            Штрих-код 
                        </th>
                        <th class="text-left">
                            Тип доставки 
                        </th>
                        <th class="text-left">
                            Статус доставки 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="(order, index) in ordersList"
                    :key="order.id"
                    >
                        <td>{{ index + 1 }}</td>
                        <td>{{ order.date }}</td>
                        <td>{{ order.recipient }}</td>
                        <td>{{ order.shipping_address }}</td>
                        <td>{{ order.contacts }}</td>
                        <td>{{ order.bar_code }}</td>
                        <td>{{ order.bar_code }}</td>
                        <td>{{ order.bar_code }}</td>
                        
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            {{getStatus}}
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        ordersList: [],
        status: '',
        getStatus: []
    }),
    methods: {
        getOrderList(){
            axios.get('http://87.255.194.27:8001/api/orders/list/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
                this.ordersList = response.data,
                console.log(response.data[0].status)
                this.getStatus = response.data.status
            })
        },
        getStatusList(){
            axios.get('http://87.255.194.27:8001/api/statuses/STATUS_IS/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                // console.log(response.data)
                this.status = response.data
            })
        }
    },
    mounted(){
        this.getOrderList()
        // this.getStatusList()
    }
}
</script>