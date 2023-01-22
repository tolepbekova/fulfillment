<template>
    <div class="request">
        <v-container>
            <router-link to="/requests">
                <v-btn>
                    Назад
                </v-btn>
            </router-link>
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
                        Штрих-код: {{request.bar_code}}
                    </v-card-subtitle>
                </div>
            </v-card>
            <v-btn
            v-if="showButton == true"
            class="mt-5"
            @click="generateBarCode()">
                Сгенерировать штрих-код
            </v-btn>
            <h3  class="mt-5">Штрих-код:</h3>
            <div  class="mt-5" v-html="barcode">
            
            </div>
            <v-btn
            class="mt-5">
                Сохранить в PDF
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        request: {},
        barcode: '',
        showButton: true
    }),
    methods:{
        getRequestData(){
            axios.get('http://87.255.194.27:8001/api/orders/' + localStorage.getItem('requestId'),
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                
                if(response.data.barcode_file){
                    this.showButton = false
                    this.request = response.data,
                    this.barcode = response.data.barcode_file.join('')
                }
                
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
        }
    },
    mounted(){
        this.getRequestData()
    }
}
</script>

<style lang="scss" scoped>
.block{
    display: flex;
}
</style>