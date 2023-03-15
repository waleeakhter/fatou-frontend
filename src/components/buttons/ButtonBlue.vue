<script setup>
defineProps({
    btnText: String,
    disabled: false,
})
</script>
<template>
    <button :disabled="disabled" :class="[disabled ? 'opacity-80 bg-[#8D8D8D]' : 'bg-fatou-blue', 'text-white py-2.5 px-8 rounded-full font-medium']">
        {{btnText}}
    </button>
</template>