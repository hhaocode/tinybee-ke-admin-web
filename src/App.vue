<template>
  <div id="app">
    <transition :name="$router.transitionName">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
