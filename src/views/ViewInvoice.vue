<template>
    <div class="view-invoice">
        <div class="view-invoice__inner">
            <container>
                <form action="">
                    <v-row class="mt-5">
                        <v-col>
                            <v-file-input
                                accept=".xlsx"
                                label="Загрузить Excel"
                            ></v-file-input>
                        </v-col>
                        <v-col>
                            <v-btn
                            color="warning"
                            dark
                            >
                                Загрузить
                            </v-btn>
                        </v-col>
                        <v-col></v-col>
                    </v-row>
                </form>
            </container>
        </div>
    </div>
</template>