<script setup>
import showcase from '@/components/ShowCase.vue';
import aboutcard from '@/components/AboutCard.vue';
import Work from '@/components/Work.vue';
import stackcard from '@/components/Stackcard.vue';
import contact from '@/components/Contact.vue';
import sidenav from '@/components/sidenav.vue';
</script>
<template>
     <showcase />
     <Work />
     <aboutcard />
     <stackcard />
     <contact />
     <sidenav />

</template>
<script>
  //stack reading
  document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}); 
</script>