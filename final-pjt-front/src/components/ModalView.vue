<template>
  <div class="my-modal well"> 
    <div class="my-overlay" @click="$emit('close-modal')"></div> 
    <div class="my-modal-card"> 
      <slot /> 
    </div> 
  </div>
</template>

<script>
export default {
  name : 'ModalView'
}
</script>

<style>
.my-modal, 
.my-overlay { 
  width: 100%; 
  height: 100%; 
  position: fixed; 
  left: 0; 
  top: 0; 
} 
.my-overlay { 
  opacity: 0.5; 
  background-color: black; 
} 
.my-modal-card { 
  position: relative; 
  max-width: 80%;
  min-width: 80%; 
  margin: auto; 
  margin-top: 30px; 
  padding: 20px; 
  background-color: white; 
  min-height: 80%;
  z-index: 10; 
  border-radius: 30px;
}

</style>