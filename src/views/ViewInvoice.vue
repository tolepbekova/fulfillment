<template>
    <div class="view-invoice">
        <div class="view-invoice__inner">
            <v-container>
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
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        file: ''
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
        }
    }
}
</script>