<template>
  <button class="GoUp-button" @click="GoUp" ref="hello" id="upButton">
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
    created() {
      window.addEventListener("scroll", this.hello);
      window.addEventListener("wheel", this.hello);
    },
    methods:{
    hello() {
          // var lastY = 0;
          const detectButton1 = document.getElementById("upButton");
        // $(document).bind('touchmove', function (e){
        //     var currentY = e.originalEvent.touches[0].clientY;
        //     if(currentY > lastY){
        //         // moved down
        //      upButton.classList.remove("fadeOut");
        //     upButton.classList.add("fadeIn");
                
        //     }else if(currentY < lastY){
        //         // moved up
        //     upButton.classList.remove("fadeIn");
        //      upButton.classList.add("fadeOut");
        //     }
        //   lastY = currentY;
        // });
        if ( window.scrollY == 0 && detectButton1) {
            detectButton1.classList.remove("fadeInButton");
            detectButton1.classList.add("fadeOutButton");
        }
        else if (window.scrollY != 0 && detectButton1) {
            detectButton1.classList.remove("fadeOutButton");
            detectButton1.classList.add("fadeInButton");
        }
      
    },
    GoUp() {
          // if (window.AppType == "android3" ) {
          //  window.fcjs_if.doReview()
          // }
          // if(window.AppType == "ios3"){
          //   window.webkit.messageHandlers.doReview.postMessage("")
          // }
    const detectButton2 = document.getElementById("upButton");
       window.scroll( {
         top : 0,
         left : 0,
         behavior : 'smooth'
       });
      detectButton2.classList.remove("fadeInButton");
      detectButton2.classList.add("fadeOutButton");
}
    },
    beforeRouteLeave(to, from, next) {
    
      window.removeEventListener("scroll", this.hello);
      window.removeEventListener("wheel", this.hello);
    
    next();
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 8px 16px;
  border: 1px solid #ec3e39;
  border-radius: 4px;
  color: #FFFFFF;
  font-size: 1.0em;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index:4;
  right:20px;
  width:35px;
  background-color:#ec3e39;
  box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.2);
  opacity:0;
}
i {
  font-size: 1.1em;
}
.fadeInButton {
  visibility : visible;
  bottom : -25px;
  -webkit-transition : opacity 2s ease-out , -webkit-transform 2s ease, transform 2s ease;
  transition : opacity 2s ease-out ,transform 2s ease;
  opacity : 1;
  transform : translate3d(0,-100px,0);
  -webkit-transform : translate3d(0,-100px,0);
  // animation : fadeUp 2s ease ;
  // @keyframes fadeUp {
  //   from {
  //       bottom : 0px;
  //       transform: translate3d(0,140px,0);
  //       opacity:0;
  //   }
  // }
}
.fadeOutButton {
  visibility : hidden;
  bottom : -25px;
  -webkit-transition : visibility 0s 2s, opacity 2s ease-in ,-webkit-transform 2s ease, transform 2s ease;
  transition : visibility 0s 2s, opacity 2s ease-in,transform 2s ease;
  opacity : 1;
  transform : translate3d(0,50px,0);
  -webkit-transform : translate3d(0,50px,0);
  // animation : fadeDown 2s ease;
  // @keyframes fadeDown {
  //   from {
  //     bottom:0px;
  //       transform: translate3d(0,-120px,0);
  //   }
  //   to {
  //     opacity:0;
  //   }
  // }
}
</style>