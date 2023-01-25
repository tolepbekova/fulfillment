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
            <v-card
            id="element-to-convert"
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
            <v-btn
            v-if="showButton == true"
            class="mt-5"
            color=""
            @click="generateBarCode()">
            
                Сгенерировать штрих-код
            </v-btn>
            <div id="element-to-convert" class="">
                <h3  class="mt-5">Штрих-код:</h3>
                <div  class="mt-5" v-html="barcode">
                
                </div>
            </div>
            <v-btn
            class="mt-5"
            @click="exportToPDF">
                Сохранить в PDF
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'
import html2pdf from "html2pdf.js";
export default {
    data: () => ({
        request: {},
        barcode: '',
        showButton: true
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
                // console.log(response.data)
                if(response.data.barcode_file){
                    this.showButton = false
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
        },
        exportToPDF() {
			html2pdf(document.getElementById("element-to-convert"), {
				margin: 1,
  			    filename: "Заявка",
			});
		},
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