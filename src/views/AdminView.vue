<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import DataTable from '@/components/DataTable.vue';
import AdminProvider from '@/components/AdminProvider.vue';
import DataTableProvider from '@/components/DataTableProvider.vue';
</script>

<template>
    <v-app>

        <TheHeader/>

        <DataTableProvider>

            <AdminProvider>

                <DataTable/>
                
            </AdminProvider>

        </DataTableProvider>

        <TheFooter/>

    </v-app>
</template>