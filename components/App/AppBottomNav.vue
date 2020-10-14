<template>

  <div class="app-bottom-nav" ref="navButton" id="isNavButton"
  v-show="isSearching">

    <button
      class="app-bottom-nav__button"
      :class="{ 'app-bottom-nav--active': isActive('/home', CURRENT_ROUTE) }"
      @click="goToRoute('/home')"
    >
      <span class="material-icons app-bottom-nav__icon">
      person_pin
      </span>
      <span class="app-bottom-nav__name">프로필</span>
    </button>
    
  <button
      class="app-bottom-nav__button"
      :class="{
        'app-bottom-nav--active': isActive('/order', CURRENT_ROUTE)
      }"
      @click="goToRoute('/order')"
    >
      <span class="material-icons app-bottom-nav__icon">
      clear_all
      </span>
      <span class="app-bottom-nav__name">컨텐츠</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  computed: {
    ...mapGetters(["CURRENT_ROUTE",
    "IS_SEARCH"]),

    isSearching() {
      if(this.$route.name == "search") {
        if(!this.$store.getters.IS_SEARCH) {
          return false;
        }
        else {
          return true;
        }
      }
      else if(this.$route.name.includes("curate")) {
        return false;
      }
      else if(this.$route.name == '' || this.$route.name==null) {
        return true;
      }
      else {
        return true;
      }
    },
  },
  
    created() {
     this.bottomNavScroll();
    },

  methods: {

    bottomNavScroll() {
      var lastScrollTop = 0;
      window.addEventListener("scroll", function(){ 
          const isNavButton = document.getElementById("isNavButton");
         var st = window.pageYOffset || document.documentElement.scrollTop; 
           if (st > lastScrollTop){
            isNavButton.classList.remove("fadeInNav");
            isNavButton.classList.add("fadeOutNav");
        } else {
            isNavButton.classList.remove("fadeOutNav");
            isNavButton.classList.add("fadeInNav");
        }
        lastScrollTop = st <= 0 ? 0 : st; 
      }, false);
    },

    isActive(route, currentRoute) {
      if( currentRoute == null) {

      }
      return currentRoute.includes(route) ? true : false;
    },

    goToRoute(path) {
      this.$store.dispatch("setCurrentRoute", path);
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>

.fadeInNav {
  bottom : -25px;
  transition : transform 0.5s ease-in;
  transform : translate3d(0,0,0);
}
.fadeOutNav {
  bottom : -25px;
  transition : transform 0.5s ease-in;
  transform : translate3d(0,70px,0);
}

.inactiveLogo{
  width:19px;
}

.activeLogo{
  width:19px;
}

.app-bottom-nav {
  max-width: 500px;
  margin: 0;
  border: 0;
  border-radius: 0;
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  z-index: 101;
box-shadow: 0px -8px 24px -5px rgba(0, 0, 0, 0.1);

  &__button {
    width: 25%;
    height: 45px;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    color: #222222;
  }

  &__icon {
    padding-bottom: 2px;
    font-size: 1.3em;
    width: 20px;
    height: auto;
  }

  &__name {
    // font-weight: 600;
    font-size: 0.7em;
  }

  &--active {
    color: $primary;
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: $white;
    font-weight: 600;
  }
}

.fa-f:before {
  font-weight: bold;
  content:'F';
}

</style>
