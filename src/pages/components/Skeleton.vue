
<script>
import { reactive, toRefs } from 'vue'

export default {
  // setup () {
  //   const state = reactive({
  //     count: 0,
  //   })
  
  //   return {
  //     ...toRefs(state),
  //   }
  // }
}
</script>

<template>
  <div class="grid w-full grid-cols-1 gap-8 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
    <div v-for="n in 3" class="relative flex flex-col items-center p-6 space-y-3 bg-white border border-fatou-black-50 rounded-xl animation-pulse">
      <div class="w-[40px] h-[22px] bg-slate-400 rounded absolute left-[20px] top-[20px] !mt-0" ></div>
      <div class="box-content rounded-full cursor-pointer bg-slate-300 shrink-0 h-36 w-36"></div>

      <div class="w-[90%] space-y-6">
        <div class="flex items-center justify-center w-full space-x-2">
          <div class="bg-slate-400 rounded w-[70%] h-[20px]"></div>
          <div class="rounded-full w-7 h-7 bg-slate-200"></div>
        </div>
        <div class="bg-slate-200  mx-auto rounded w-[60%] h-[20px]"></div>
        <div class="bg-slate-400 mx-auto rounded w-[50%] h-[15px]"></div>
        <div class="flex space-x-3">
          <div class="bg-slate-300 flex-grow rounded h-[20px]"></div>
          <div class="bg-slate-200 flex-grow rounded h-[20px]"></div>
        </div>
      </div>
      
      <div class="flex items-center self-end w-full space-x-2">
        <div class="h-[40px] flex-grow bg-slate-200 rounded-full"></div>
        <div class="h-[40px] flex-grow bg-slate-400 rounded-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
   .animation-pulse {
    animation: anim-pulse 1s ease-in-out infinite;
  }

  @keyframes anim-pulse {
    50% {
      opacity: 30%;
      transform: scale(.99);
    }
  }

  .animation-pulse:nth-of-type(2) {
    animation-delay: 250ms;
  }
  .animation-pulse:nth-of-type(3) {
    animation-delay: 500ms;
  }
  .animation-pulse:nth-of-type(4) {
    animation-delay: 750ms;
  }
</style>  