<template>
  <div class="todo">
      <h3>todo</h3>
      dsf
  </div>
</template>

<script>
import Vue from 'vue'

// eslint-disable-next-line no-undef
export default Vue.extend({
  name: 'Home',
  created() {
    window.addEventListener('wxload', query => console.log('page1 wxload', query))
    window.addEventListener('wxshow', () => console.log('page1 wxshow'))
    window.addEventListener('wxready', () => console.log('page1 wxready'))
    window.addEventListener('wxhide', () => console.log('page1 wxhide'))
    window.addEventListener('wxunload', () => console.log('page1 wxunload'))

    if (process.env.isMiniprogram) {
      console.log('I am in miniprogram')
    } else {
      console.log('I am in Web')
    }
  },
})
</script>

<style>

</style>
