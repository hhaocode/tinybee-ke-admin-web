export default {
  methods: {
    closeVisit (visit) {
      this.$store
        .dispatch('app/removeVisit', visit)
        .then(visitedViews => {
          const lastNav = visitedViews.slice(-1)[0]
          if (lastNav) {
            this.$router.replace(lastNav).catch(() => {})
          } else {
            this.$router.replace('/').catch(() => {})
            // if (nav.name == 'dashboard') {
            //   this.$router.replace({ path: '/redirect' + view.fullPath })
            // } else {
            //   this.$router.push('/')
            // }
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
