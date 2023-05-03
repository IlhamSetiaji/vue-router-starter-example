import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      meta: {
        mustLogin: true
      },
      components: {
        default: TeamsList,
        footer: TeamsFooter
      },
      children:[
        {
          name: 'team-members',
          path: '/teams/:teamId',
          component: TeamMembers,
          props: true
        },
      ]
      // alias: '/'
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next){
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      }
    },
    {
      path: '/:notFound(.*)',
      // redirect: '/teams'
      component: NotFound
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition){
    console.log(to, from, savedPosition);
    if(savedPosition){
      return savedPosition;
    }
    return {
      left: 0,
      top: 0
    }
  }
});

router.beforeEach(function(to, from, next){
console.log('Global beforeEach');
console.log(to, from);
if(to.meta.mustLogin){
  console.log('must login');
  next();
}
// if(to.name === 'team-members'){
//   next();
// }else{
//   next({name: 'team-members', params: {teamId: 't2'}});
// }
next();
});

router.afterEach(function(to, from){
  console.log('Global afterEach');
  console.log(to, from);
});

export default router;