<template>
  <main class="container mx-auto bg-gray-50 rounded-xl p-4 font-mono space-y-4 overflow-x-auto">
    <CustomHeader />
    <DealsTable />
  </main>
</template>

<script>

import './style.css';
import CustomHeader from '@/components/CustomHeader.vue';
import DealsTable from '@/components/DealsTable.vue';

export default {
  name: 'App',
  components: {
    CustomHeader,
    DealsTable,
  }
}
</script>

<style>
  body {
    background-color: #f0f0f0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 50px 10px;
  }
</style>
