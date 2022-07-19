<template>
  <div class="app-container">
    <p>个人信息</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        avatar: this.avatar
      }
    }
  }
}
</script>
