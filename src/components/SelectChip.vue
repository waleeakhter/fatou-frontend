<script setup>
defineProps({
    chipText: String,
    btnType: {
        type: String,
        default: 'button'
    },
    isActive: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <button :type="btnType"  :class="[isActive ? 'bg-fatou-light-200 text-fatou-blue-dark' : 'bg-color text-black', 'py-2.5 px-8 rounded-full font-medium g']">
        {{chipText}}
    </button>
</template>
<style>
    .bg-color {
        background-color: #F2F4F5;
    }

    .text-black {
        color: #000;
    }
</style>
