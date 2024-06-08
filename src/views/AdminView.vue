<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import DataTable from '@/components/DataTable.vue';
</script>

<template>
    <v-app>
        <TheHeader/>
        
        <h1>Admin View</h1>
        <DataTableProvider>
            <DataTable/>
        </DataTableProvider>

        <TheFooter/>

    </v-app>


</template>