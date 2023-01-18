<template>
    <div class="invoices">
        <div class="invoices__inner">
            <router-link to="/invoices/add">
                <v-btn
                    color="green"
                    dark
                    small
                    class="mt-5 ml-5"
                >
                Добавить накладную
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
                                Номер накладной
                            </th>
                            <th class="text-left">
                                Дата накладной
                            </th>
                            <th class="text-left">
                                Отправитель
                            </th>
                            <th class="text-left">
                                Получатель
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="(item, index) in invoiceList"
                        :key="item.name"
                        >   
                            <td>{{index + 1}}</td>
                            <!-- <td>{{ item.number }}</td> -->
                            <td>
                                <router-link to="">
                                    <a href="">
                                        {{ item.number }}
                                    </a>
                                </router-link>
                            </td>
                            <td>{{ item.date }}</td>
                            <td>{{organization.name}}</td>
                            <td>{{organization.fulfillment}}</td>
                            <!-- <td>
                                <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    small
                                    @click.prevent="pickInvoice(item)"
                                    >
                                    Добавить Excel
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                    <span class="text-h5">Добавить Excel</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                Номер накладной: {{selectedInvoice.number}}
                                            </v-row>
                                            <v-row>
                                                Дата накладной: {{selectedInvoice.date}}
                                            </v-row>
                                            <v-spacer></v-spacer>
                                            <v-row>

                                            </v-row>
                                        </v-container>
                                    <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false"
                                        >
                                            Закрыть
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false"
                                        >
                                            Сохранить
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                                
                            </td> -->
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
        invoiceList: [],
        organization: {},
        selectedInvoice: {},
        dialog: false
    }),
    methods:{
        getOrganizationInvoices(){
            axios.get('http://87.255.194.27:8001/api/organization/invoices/',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            })
            .then((response) => {
                this.invoiceList = response.data
            })
        },
        getOrganization(){
            axios.get('http://87.255.194.27:8001/api/organizations/1',
            {
                headers:{
                    Authorization: 'Token ' + localStorage.getItem('usertoken')
                }
            })
            .then((response) => {
                this.organization = response.data
            })
        },
        pickInvoice(value){
            this.selectedInvoice = value
        }
    },
    mounted(){
        this.getOrganizationInvoices(),
        this.getOrganization()
    }
  }
</script>