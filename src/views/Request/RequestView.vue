<template>
    <div class="request">
        <v-container>
            <v-btn>
                Назад
            </v-btn>
            <v-card
            elevation="7"
            shaped
            class="mt-5"
            >
                <v-card-title>
                    Заявка №: {{request.id}}
                </v-card-title>
                <div class="">
                    <v-card-subtitle>
                        Дата заявки: {{request.date}}
                    </v-card-subtitle>
                    <v-card-subtitle>
                        Адрес доставки: {{request.shipping_address}}
                    </v-card-subtitle>
                </div>
            </v-card>
            <v-btn
            class="mt-5"
            @click="generateBarCode()">
                Сгенерировать штрих-код
            </v-btn>
            <span v-html="barcode">

            </span>
            
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        request: {},
        barcode: ''
    }),
    methods:{
        getRequestData(){
            axios.get('http://87.255.194.27:8001/api/orders/' + localStorage.getItem('requestId'),
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                console.log(response.data)
                this.request = response.data,
                this.barcode = response.data.barcode_file.join('')
                
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
                console.log(response.data)
                this.getRequestData()
            })
        }
    },
    mounted(){
        this.getRequestData()
    }
}
</script>