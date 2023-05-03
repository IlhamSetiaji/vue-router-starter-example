<template>
  <button @click="confirm">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data(){
    return {
      changeSaved: false
    }
  },
  inject: ['users'],
  methods: {
    confirm(){
      this.$router.push('/teams');
    },
    saveChanges(){
      this.changeSaved = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next){
    console.log('beforeRouteLeave');
    console.log(to, from);
    if(this.changeSaved){
      next();
    }else{
      const answer = confirm('Do you want to leave without saving?');
      next(answer);
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>