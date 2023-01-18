<template>
    <div class="goods">
        <div class="goods__inner">
            <h2 class="mt-5 ml-5">Товары</h2>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">
                            Наименование
                        </th>
                        <th class="text-left">
                            Штрих-код
                        </th>
                        <th class="text-left">
                            Номинал
                        </th>
                        <th class="text-left">
                            Величина
                        </th>
                        <th class="text-left">
                            Остаток
                        </th>
                        <th class="text-left">
                            Реализовано
                        </th>
                        <th class="text-left">
                            Цена за шт
                        </th>
                        <th class="text-left">
                            Сумма
                        </th>
                        <th class="text-left">
                            Сумма НДС
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
        goodsList: []
    }),
    methods:{
        getGoodsList(){
            axios.get('')
        }
    },
    mounted(){

    }
}
</script>