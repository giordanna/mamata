<template>
  <article id="mamatas" class="active">
    <router-link
      class="close"
      :to="{name: 'home'}"
      tag="div">
        Close
    </router-link>

    <h2 class="major">Mamatas</h2>
    
    <router-view :mamatas="mamatas" />
    
  </article>
</template>

<script>
export default {
  props: ['mamatas']
}
</script>