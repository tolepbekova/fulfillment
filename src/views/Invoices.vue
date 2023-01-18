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
                                БИН
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
                        v-for="item in desserts"
                        :key="item.name"
                        >
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
    </div>
</template>

<script>
  export default {
    data: () => ({

    }),
    methods:{
        getOrganizationInvoices(){
            axios.get('http://87.255.194.27:8001/api/organization/invoices/')
            .then()
        }
    },
    mounted(){

    }
  }
</script>