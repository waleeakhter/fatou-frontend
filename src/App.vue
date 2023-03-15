<template>
    <notifications class="mt-x" />
    <router-view />
</template>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>

</style>
<style>
/* multiselect */
.multiselect {
  height: auto;
  background-color: #e4f0f3;
  border: none;
  padding-left: .55em;
}

 .multiselect-tags-search {
    background-color: #e4f0f3;
}

.multiselect-placeholder {
    color: #077685;
}

.multiselect-tag {
   background-color: #077685;
}

/* notification component */
    .mt-x {
        margin-top: 7%;
    }
    .vue-notification-template {
        padding-top: 15px !important;
        padding-bottom: 15px !important;
    }
    .notification-title {
        font-size: 14px !important;
    }
    .notification-content {
        font-size: 16px !important;
    }
</style>