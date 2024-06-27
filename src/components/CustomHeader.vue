<template>
    <header class="flex items-center space-x-auto justify-between whitespace-nowrap">
        <span>Тестовое задание</span>
        <SearchBar/>
    </header>
  </template>
  
<script> 

import SearchBar from '@/components/SearchBar';

export default {
    name: 'CustomHeader',
    components: {
        SearchBar,
    }
}
</script>
  
<style></style>