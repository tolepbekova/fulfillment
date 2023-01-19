<template>
    <div class="view-invoice">
        <div class="view-invoice__inner">
            <v-container>
                {{invoiceNumber}} {{invoiceDate}} {{goodList}}
                <v-card>
                    <p>Номер накладной: {{invoiceNumber}}</p>
                    <p>Дата накладной: {{invoiceDate}}</p>
                </v-card>
                <form @submit.prevent="sendFile()" action="">
                    <v-row class="mt-5">
                        <v-col>
                            <v-file-input
                                
                                id="file"
                                ref="file"
                                v-on:change="handleFileUpload"
                                accept=".xlsx"
                                label="Загрузить Excel"
                            ></v-file-input>
                        </v-col>
                        <v-col>
                            <v-btn
                            color="warning"
                            dark
                            type="submit"
                            >
                                Загрузить
                            </v-btn>
                        </v-col>
                        <v-col></v-col>
                    </v-row>
                </form>
            </v-container>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            ID Накладной
                        </th>
                        <th class="text-left">
                            ID
                        </th>
                        <th class="text-left">
                            Наименование
                        </th>
                        <th class="text-left">
                            Артикул
                        </th>
                        <th class="text-left">
                            шт.
                        </th>
                        <th class="text-left">
                            Коробок
                        </th>
                        <th class="text-left">
                            Вложимость штук в коробку
                        </th>
                        <th class="text-left">
                            Общий вес коробки
                        </th>
                        <th class="text-left">
                            Вес 1 шт. 
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Цена НДС
                        </th>
                        <th class="text-left">
                            Высота, м
                        </th>
                        <th class="text-left">
                            Ширина, м
                        </th>
                        <th class="text-left">
                            Длина, м
                        </th>
                        <th class="text-left">
                            Объем, м3
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="good in goodList"
                    :key="good.id"
                    >
                        <td>{{ good.invoice }}</td>
                        <td>{{ good.id }}</td>
                        <td>{{ good.title }}</td>
                        <td>{{ good.vendor_code }}</td>
                        <td>{{ good.good_quantity }}</td>
                        <td>{{ good.box_quantity }}</td>
                        <td>{{ good.good_quantity_in_box }}</td>
                        <td>{{ good.box_full_weight }}</td>
                        <td>{{ good.good_unit_weight }}</td>
                        <td>{{ good.bar_code }}</td>
                        <td>{{ good.tax }}</td>
                        <td>{{ good.height_m }}</td>
                        <td>{{ good.width_m }}</td>
                        <td>{{ good.length_m }}</td>
                        <td>{{ good.capacity_m3 }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        file: '',
        invoiceNumber: '',
        invoiceDate: '',
        goodList: []
    }),
    methods:{
        sendFile(){
            // let docForm = document.getElementById('docForm')
            // let formData = new FormData(docForm);
            // console.log(formData)
            let formData = new FormData();
            formData.append('file', this.file);
            axios.post('http://87.255.194.27:8001/api/goods/download/',
            
                formData,
            
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken'),
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        handleFileUpload: function(file){
            this.file = file;
            console.log(this.file)
        },
        getInvoiceGoods(){
            axios.get('http://87.255.194.27:8001/api/organization/invoice/' + localStorage.getItem('invoiceId'),
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            }).then((response) => {
                this.invoiceDate = response.data.date,
                this.invoiceNumber = response.data.number,
                this.goodList = response.data.goods
            })
        }
    },
    mounted(){
        this.getInvoiceGoods()
    }
}
</script>