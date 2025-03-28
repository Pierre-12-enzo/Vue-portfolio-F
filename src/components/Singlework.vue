<script setup>
import { defineProps } from 'vue';

defineProps({
    work: Object
})

</script>
<template>
      <div class="row p-5">
            <div class="col-lg-5 col-md-6">
                <p class="p-4 text-bold left">{{ work.name }}</p>
                <div class="cursor"></div>
            </div>
            <div class="col">
                <p class="p-4 main-text">{{work.description}}</p>
              <!--<a :href="{{ work.link }}">{{ work.link }}</a>-->  
            </div>
        </div>
</template>
<style scoped>
#main .container .row {
    border-bottom: 2px solid #cfcece;
}
.main-text {
    font-size: 1.2em;
    font-family: 'Poppins' sans-serif;

}
 .left {
    font-weight: bolder;
    font-size: 2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>