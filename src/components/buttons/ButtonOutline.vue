<script setup>
defineProps({
    btnText: String
})
</script>
<template>
    <button class="bg-transparent text-fatou-blue py-2.5 px-8 rounded-full font-medium border border-fatou-blue">
        {{btnText}}
    </button>
</template>