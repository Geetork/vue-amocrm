<template>
    <table class="container table-auto text-nowrap text-left rtl:text-right text-gray-500 dark:text-gray-400 text-sm border-spacing-6 border-separate">
        <thead class="text-sm text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th></th>
                <th>Название</th>
                <th>Бюджет</th>
                <th>Статус</th>
                <th>Ответственный</th>
                <th>Дата создания</th>
            </tr>
        </thead>
        <tbody v-if="deals">
            <template v-for="deal in deals" :key="deal.id">
                <deal-card :deal="deal" :pipeline="getStatus(deal.status_id)"></deal-card>
            </template>
        </tbody>
    </table>

    <div class="w-full">
        <div class="relative" v-if="error">
            <p>Произошла ошибка...</p>
        </div>
        <div class="relative" v-if="loading">
            <LoadingSpinner/>
        </div>
    </div>
</template>
  
<script> 
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import DealCard from './DealCard.vue';
import axios from 'axios';

export default {
    name: 'DealsTable',
    components: {
        LoadingSpinner,
        DealCard,
    },
    data() {
        return { 
            deals: null,
            pipelines: null,
            error: null,
            loading: true,
            retryDelay: 2000,
            maxRetries: 5,
            retryCount: 0,
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const dealsRes = await axios.get('https://galinaleespb.amocrm.ru/api/v4/leads?with=contacts', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
                    }});

                const pipelinesRes = await axios.get('https://galinaleespb.amocrm.ru/api/v4/leads/pipelines', {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
                    }});

                this.deals = dealsRes.data._embedded.leads;
                this.pipelines = pipelinesRes.data._embedded.pipelines[0]._embedded.statuses;
                this.loading = false;
            } catch (err) {
                this.retryCount++;

                if (this.retryCount < this.maxRetries) {
                    setTimeout(this.fetchData, this.retryDelay);
                } else {
                    this.error = 'Failed to fetch data after multiple attempts.';
                    this.loading = false;
                }
            }
        },
        getStatus(id) {
            return this.pipelines.find(pipeline => pipeline.id === id)
        }
    },
}
</script>
  
<style></style>