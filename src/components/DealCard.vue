<template>
    <tr>
        <td class="flex items-center">
            <button 
                @click="toggleVisibility"
                type="button" 
                class="text-white bg-gradient-to-br from-blue-400 to-blue-800 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800 font-medium rounded-md text-sm px-2 py-1.5 text-center">
                <svg class="w-3 h-3 text-gray-800 dark:text-white transition delay-0 duration-800 ease" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 16 10" :style="{ transform: `rotate(${rotation}deg)` }">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1.707 2.707 5.586 5.586a1 1 0 0 0 1.414 0l5.586-5.586A1 1 0 0 0 13.586 1H2.414a1 1 0 0 0-.707 1.707Z"/>
                </svg>
            </button>
        </td>
        <td>{{ deal.name }}</td>
        <td>{{ deal.price }}</td>
        <td>
            <span :style="{ backgroundColor: pipeline.color}" class="rounded-md px-2 py-1 text-xs">{{ pipeline.name }}</span>
        </td>
        <td>{{ deal.responsible_user_id }}</td>
        <td>{{ formatTimestamp(deal.created_at) }}</td>
    </tr>

    <tr v-show="isVisible" class="text-sm text-gray-400 font-light">
        <td></td>
        <td :colspan="5">
            Контакт: {{ deal._embedded.contacts[0].id }}
        </td>
    </tr>
</template>

<script> 
export default {
    name: 'DealCard',
    components: {
    },
    props: {
        deal: {},
        pipeline: {},
    },
    data() {
        return {
            isVisible: false,
            rotation: 0,
        }
    },
    methods: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
            this.rotation += 180;
        },
        formatTimestamp(timestamp) {
            const date = new Date(parseInt(timestamp) * 1000);

            const year = date.getUTCFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            return `${day}.${month}.${year}`;
        }, 
    }
}
</script>