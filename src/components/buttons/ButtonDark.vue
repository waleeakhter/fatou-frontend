<script setup>
defineEmits([
    'onclick'
]);

defineProps({
    btnText: String,
    disabled: false,
    btnType: {
        type: String,
        default: 'button'
    },
    isLoading: false
})

</script>
<template>
    <button :type="btnType" :disabled="disabled" :class="[disabled ? 'opacity-80' : '','bg-fatou-blue-dark text-white py-2.5 px-8 rounded-full font-medium flex items-center justify-center space-x-1']">
        <div
        v-if="isLoading"
        class="
          h-5
          w-5
          mr-3
          loader
          ease-linear
          rounded-full
          border-2 border-t-2 border-gray-200
        "
      ></div>
        <span>
            {{btnText}}
        </span>
    </button>
</template>
