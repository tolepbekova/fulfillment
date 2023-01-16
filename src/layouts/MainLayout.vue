<template>
    <div class="main">
        <div class="main__inner">
            <v-app-bar
                elevation="6"
                outlined
            >
                <v-toolbar-title>Fulfillment Etrade Partner</v-toolbar-title>
                <v-spacer></v-spacer>
                <router-link to="/main">
                    <v-btn >
                        Главная
                    </v-btn>
                </router-link>
                <router-link to="/invoices">
                    <v-btn class="main__nav-btn">
                        Накладные
                    </v-btn>
                </router-link>
                <router-link to="/goods">
                    <v-btn class="main__nav-btn">
                        Товары
                    </v-btn>
                </router-link>
                
            </v-app-bar>
            <div class="main__content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {

		&__inner {
		}

		&__nav-btn {
            margin-left: 10px;
		}

		&__content {
            
		}
}

</style>