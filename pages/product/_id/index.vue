<template>
<transition>
  <main class="product-detail-container" id="productContainer">

    <AppSpinner v-if="IS_LOADING" />

          <div class="product-info-once">
          <div class="product-modelProfile">
                <div class="model-profile" @click="toModelPage(model)">
                <div class="model-profile__profile-image__skeleton"></div>
                  <img
                    class="model-profile__profile-image"
                    :src="IMAGE_URL + model.imgFaceFile" />

                  <div class="model-profile__flex">
                    <div class="model-profile__info">
                      <div class="model-profile__info__up">
                      <span class="model-profile__name">{{ model.name }}</span>
                      </div>
                      <div class="model-profile__info__down">
                      <span class="model-profile__height">{{ model.height }}cm</span>
                       <span v-if="model.shopList[0]" class="model-profile__shop">{{model.shopList[0].name || "쇼핑몰 이름"}}</span>
                      </div>
                    </div>
                  </div>
                      <div class="button-container">
                        <div class="skeleton-button"
                        @click.stop="followModel(model)"></div>
                        <button
                        class="model-followButton"
                        :class="{ 'model-followButton--secondary': !isFollowed }"
                        @click.stop="followModel(model)"
                        >
                        <div>
                        <i v-if="!isFollowed" class="material-icons followIcon">person_add</i>
                        <i v-else class="material-icons followIcon-cancel">person_add_disabled</i>
                        </div>
                        <div>
                        <span v-if="!isFollowed" class="model-followButton-exFollow">팔로우</span>
                        <span v-else class="model-followButton-exCancel">팔로우 취소</span>
                        </div>
                        </button>
                    </div>
                </div>
          </div>

        <div class="product-main" >
          <div class="product-infoProfile">
            <div class="product-main-image-container">
                <div class="product-main-image__skeleton"></div>        
                <img class="product-main-image"
                          :src="IMAGE_URL + PRODUCT_INFO.imgFile"/>
            </div>

          <div class="product-main-profile">
            <div class="product-profile">               
                    <span class="product-profile__name">{{PRODUCT_INFO.name}}</span>
                    <span class="product-profile__price">{{ separateThousand(PRODUCT_INFO.price) }}</span>
            </div>
          </div>
          </div>

          <div class="product-fits-container" v-show="PRODUCT_FITS.length != 0">
            <div class="product-fits-title">이런 고민이 있는 고객님께 추천해요</div>
                <div class="product-fits" v-for="fit in PRODUCT_FITS">
                <i class="material-icons product-fits-check">check</i>
                <span class="product-fits-name">{{ fit.name }}</span>
              </div>
          </div>

            <div class="product-link" @click="toDetailPage(PRODUCT_INFO)">         
                <div class="product-link__skeleton"></div>        
                <button class="button-link">상세보기</button>
          </div>
       </div>
       </div>

       <div class="content-main" id="sameProduct">
         <div class="content-title">
             <span class="content-title__title">{{ model.name }} 모델의 다른 {{ category }}</span>
         </div>
              <div class="masonry-container">
                <AppProductPageProduct
                  v-for="product in MODEL_SAME_PRODUCTS"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-item1"
                ></AppProductPageProduct>
              </div>
       </div>

       <div class="content-main" id="newProduct">
         <div class="content-title">
             <span class="content-title__title">{{ model.name }} 모델의 신상품</span>
         </div>
              <div class="masonry-container">
                <AppProductPageProduct
                  v-for="product in MODEL_PRODUCTS_NEW"
                  :key="product.itemId"
                  :product="product"
                  class="masonry-item2"
                ></AppProductPageProduct>
              </div>
          </div>
       </div>

       <div class="another-main" id="sameHeight">
         <div class="another-title">
             <span class="another-title__title">{{ model.name }} 모델과 비슷한 키의 모델</span>
         </div>
          <div class="another-card-container">
            <div class="sameHeight-card-model-container"
              v-for="model in HEIGHT_MODELS"
              :key="model.modelId"
              @click="toModelPage(model)">
                  <img
                      class="sameHeight-card-img"
                      :src="IMAGE_URL + model.imgList[0].imgFile"
                      alt="..."
                      loading="lazy"
                    />
                  <div class="sameHeight-card-name">{{ model.name }}</div>
                  <div class="sameHeight-card-info">
                      <div class="sameHeight-card-height">{{ model.height }}cm</div>
                      <div class="sameHeight-card-shop">{{ model.shopList[0].name }}</div>
                  </div>
              </div>
          </div>
       </div>

        <div class="another-main-style" id="sameStyle">
         <div class="another-title">
             <span class="another-title__title">이런 모델은 어때요?</span>
         </div>
          <div class="another-card-container">
            <div class="sameHeight-card-model-container"
              v-for="model in STYLE_MODELS"
              :key="model.modelId"
              @click="toModelPage(model)">
                  <img
                      class="sameHeight-card-img"
                      :src="IMAGE_URL + model.imgList[0].imgFile"
                      alt="..."
                      loading="lazy"
                    />
                  <div class="sameHeight-card-name">{{ model.name }}</div>
                  <div class="sameHeight-card-info">
                      <div class="sameHeight-card-height">{{ model.height }}cm</div>
                      <div class="sameHeight-card-shop">{{ model.shopList[0].name }}</div>
                  </div>
              </div>
          </div>
       </div>
       

  </main>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppProductPageProduct from "@/components/App/AppProductPageProduct";
import AppSpinner from "@/components/App/AppSpinner";

export default {
  components: {
    AppProductPageProduct,
    AppSpinner
  },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "model-id" ||
              to.name == "product-id" ||
              to.name == "exhibition-id"||
              to.name == "bodytype-thickthigh"||
              to.name == "bodytype-narrowshoulder"||
              to.name == "bodytype-thickforearm"||
              to.name == "bodytype-thickcalf"||
              to.name == "bodytype-fatbelly") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "modellow" ||
    to.name == "modelmean" ||
    to.name == "modelhigh" ||
    to.name == "home" ||
    to.name == "collection" ||
    to.name == "collection1" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return {
      category : localStorage.getItem('productCategory'),
      style_models : this.$store.getters.STYLE_MODELS,
      height_models : this.$store.getters.HEIGHT_MODELS,
      model_products_new : this.$store.getters.MODEL_PRODUCTS_NEW,
      model_same_products : this.$store.getters.MODEL_SAME_PRODUCTS,
      model_info: this.$store.getters.MODEL_INFO,
      depth_go : this.$store.getters.DEPTH_GO,
      isFollowed: this.$store.getters.MODEL_INFO.isFollow == 'true' ? true : false
    };
  },

  scrollToTop: true,

  computed: {
    ...mapGetters([
      "IS_LOADING",
      "IMAGE_URL",
      "MODEL_PRODUCTS",
      "MODELS",
      "PRODUCT_INFO",
      "STYLE_MODELS",
      "HEIGHT_MODELS",
      "MODEL_PRODUCTS_NEW",
      "MODEL_SAME_PRODUCTS",
      "MODEL_INFO",
      "DEPTH_GO",
      "PRODUCT_FITS"
    ]),
 
  },

  async asyncData({ store, params }) {
    var productInfo = JSON.parse(localStorage.getItem('product'));
    var category1 = productInfo.cat1;
    var category2 = productInfo.cat2;

    console.log(productInfo);
    console.log(category1);
    console.log(category2);

 switch (category1) {
        case "001":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '아우터');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '코트');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '자켓');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '점퍼');
          }
          else {
            localStorage.setItem('productCategory', '가디건');
          }
          break;
        case "002":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '상의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '티셔츠');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '니트');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '블라우스/셔츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '후드/맨투맨');
          }
          else {
            localStorage.setItem('productCategory', '나시');
          }
          break;
        case "003":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '하의');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '청바지');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '슬랙스');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '숏팬츠');
          }
          else if (category2 == "004") {
            localStorage.setItem('productCategory', '레깅스');
          }
          else {
            localStorage.setItem('productCategory', '롱팬츠');
          }
          break;
        case "004":
            localStorage.setItem('productCategory', '스커트');
          break;
        case "005":
            localStorage.setItem('productCategory', '원피스');
          break;
        case "006":
            localStorage.setItem('productCategory', '신발');
          break;
        case "007":
            localStorage.setItem('productCategory', '가방');
          break;
        case "008":
            localStorage.setItem('productCategory', '악세서리');
          break;
        case "009":
          if(category2 == "000") {
            localStorage.setItem('productCategory', '쥬얼리');
          }
          else if (category2 == "001") {
            localStorage.setItem('productCategory', '귀걸이');
          }
          else if (category2 == "002") {
            localStorage.setItem('productCategory', '목걸이/팔찌');
          }
          else if (category2 == "003") {
            localStorage.setItem('productCategory', '반지');
          }
          else {
            localStorage.setItem('productCategory', '기타');
          }
          break;
        case "0010":
            localStorage.setItem('productCategory', '비치웨어');
          break;
        case "0011":
            localStorage.setItem('productCategory', '란제리');
          break;
 }    


     await store.dispatch("getModelProductsNew");
    await  store.dispatch("getModelSameProducts");
   await   store.dispatch("getStyleModels", params);
    await  store.dispatch("getHeightModels", params);
    await  store.dispatch("getProductFits", productInfo);
    store.dispatch("setModel",store.getters.MODEL_INFO);

    return {
      saved: false,
      category: localStorage.getItem('productCategory'),
      models : store.getters.MODELS,
      productList: store.getters.MODEL_PRODUCTS,
      model: store.getters.MODEL,
      product: store.getters.PRODUCT_INFO,
      style_models : store.getters.STYLE_MODELS,
      height_models : store.getters.HEIGHT_MODELS,
      model_products_new : store.getters.MODEL_PRODUCTS_NEW,
      model_same_products : store.getters.MODEL_SAME_PRODUCTS,
      model_info : store.getters.MODEL_INFO
    };
  },

  created() {
    this.isSaved();
  },
    
  mounted() {

  $(".app-header-no-logo-titles").css({
    transform: 
      'translate3d(0, 0, 0) ',
    });

    if(localStorage.getItem("backButton") == "1") {
      console.log("이게먼저냐?")
      localStorage.removeItem("backButton");
      const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.pop();

    localStorage.setItem("recentModelId", JSON.stringify(recentModelId));

    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.pop();

    localStorage.setItem("recentProductId", JSON.stringify(recentProductId));
    }
    else {
      const recentProductId1 = JSON.parse(localStorage.recentProductId);
      recentProductId1.push(this.$store.getters.PRODUCT_INFO);
      localStorage.recentProductId = JSON.stringify(recentProductId1);

      const recentModelId1 = JSON.parse(localStorage.recentModelId);
      recentModelId1.push(this.$store.getters.MODEL_INFO);
      localStorage.recentModelId = JSON.stringify(recentModelId1);

    }

    var heightModelsIsHere = Object.values(this.$store.getters.HEIGHT_MODELS);

    for (var i=0; i<heightModelsIsHere.length; i++) {
    if(heightModelsIsHere[i].modelId == this.$store.getters.MODEL.modelId ) {
      document.getElementsByClassName('sameHeight-card-model-container')[i].style.display = 'none';
      break;
    }
    }   
    
    var newProductsIsHere = Object.values(this.$store.getters.MODEL_PRODUCTS_NEW);

    for (var i=0; i<newProductsIsHere.length; i++) {
    if(newProductsIsHere[i].itemId == this.$store.getters.PRODUCT_INFO.itemId ) {
      document.getElementsByClassName('masonry-item2')[i].style.display = 'none';
      break;
    }
    }
        
    var sameProductsIsHere = Object.values(this.$store.getters.MODEL_SAME_PRODUCTS);

    for (var i=0; i<sameProductsIsHere.length; i++) {
    if(sameProductsIsHere[i].itemId == this.$store.getters.PRODUCT_INFO.itemId ) {
      document.getElementsByClassName('masonry-item1')[i].style.display = 'none';
      break;
    }
    }
    
    

    if(this.$store.getters.MODEL_SAME_PRODUCTS.length<5) {
      document.getElementById('sameProduct').style.display="none";
    }

    if(this.$store.getters.MODEL_PRODUCTS_NEW.length<5) {
      document.getElementById('newProduct').style.display="none";
    }

    if(this.$store.getters.HEIGHT_MODELS.length<5) {
      document.getElementById('sameHeight').style.display="none";
    }

    if(!this.$store.getters.STYLE_MODELS) {
      document.getElementById('sameStyle').style.display="none";
    }

    this.$store.dispatch("setHeaderTitle", "상품상세");
      this.$store.dispatch("setLogo","noLogo");

    if(localStorage.getItem('routerStack') == '' ||
              localStorage.getItem('routerStack') == null  ){}
    else if(localStorage.getItem('routerStack').includes('model')) {
      this.$store.dispatch("setCurrentRoute", '/model');
    }
    else if(localStorage.getItem('routerStack').includes('search')) {
      this.$store.dispatch("setCurrentRoute", '/search');
    }    
    else if(localStorage.getItem('routerStack').includes('myPage')) {
      this.$store.dispatch("setCurrentRoute", '/myPage');
    }
  },

  methods: {

    isSaved() {
      const savedProducts = this.$store.getters.SAVED_PRODUCTS;
      for (let i = 0; i < savedProducts.length; i++) {
        if (savedProducts[i].itemId == this.product.itemId) {
          this.saved = true;
          return;
        }
      }
      return;
    },
    
    separateThousand(price) {
      
      price = price.toString();
      let index;
      if (price.length == 6) {
        index = 3;
      } else if (price.length == 5) {
        index = 2;
      } else if (price.length == 4) {
        index = 1;
      } else {
        return price;
      }
      return price.substring(0, index) + "," + price.substring(index);
    },

    toModelPage(model) {
      
      this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId  , clickedModelPage: "상품상세"});


      this.$store.dispatch("setModel", model);

      const recentModelId = JSON.parse(localStorage.recentModelId);
      recentModelId.push(model);
      localStorage.recentModelId = JSON.stringify(recentModelId);

      
      this.$router.push("/model/" + model.modelId);
    },

    toDetailPage(i) {
      
      this.$amplitude.getInstance().logEvent("go-shop", { modelId: i.modelId});
      const itemId = this.product.itemId.toString();
      const heart = this.saved ? "1" : "0";
      const itemName = this.product.name;
      const imgUrl = this.$store.getters.IMAGE_URL + this.product.imgFile;
        if (window.AppType == "android" || window.AppType == "android3" ) {
        window.fcjs_if.setItemInfo(itemId, heart, itemName, imgUrl);
      }
          if(window.AppType == "ios2" || window.AppType == "ios3"){
        var message = {
          'itemId': itemId,
          'heart': heart,
          'itemName': itemName,
          'imgUrl': imgUrl
        };
        window.webkit.messageHandlers.setItemInfo.postMessage(message);
      }
          window.open(i.linkUrl);
    },

    async followModel(model) {
        if(!this.isFollowed) {
            this.isFollowed = true;
            this.$amplitude.getInstance().logEvent("click follow",
             { modelId: model.modelId ,clickedPage:"모델상세"});
            await this.$store.dispatch("followModel", model.modelId);
            await this.$store.dispatch("setFollowingModels");
            await this.$store.dispatch("setModel", this.$store.getters.MODEL_INFO);
        }
        else {
            this.isFollowed = false;
            await this.$store.dispatch("unfollowModel", model.modelId);
            await this.$store.dispatch("setFollowingModels");
            await this.$store.dispatch("setModel", this.$store.getters.MODEL_INFO);
        }
    }
  },


  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('routerStack');
    localStorage.removeItem('modelId');
    if (to.name.includes("items")) {
      this.$store.dispatch("setLogo","item");
        localStorage.setItem("recentProductId","[]");
        localStorage.setItem("recentModelId","[]");
    }
    localStorage.removeItem("product");    
    localStorage.removeItem("model");
    localStorage.removeItem('productCategory');
    localStorage.removeItem("cat1");
    localStorage.removeItem("cat2");
    if(to.name=="bodytype-thickthigh"){
      this.$store.dispatch("setHeaderTitle", "허벅지 커버 상품");
    }
    else if(to.name=="bodytype-narrowshoulder") {
      this.$store.dispatch("setHeaderTitle", "좁은 어깨 커버 상품");
    }
    else if(to.name=="bodytype-thickforearm") {
      this.$store.dispatch("setHeaderTitle", "두꺼운 팔뚝 커버 상품");
    }
    else if(to.name=="bodytype-thickcalf") {
      this.$store.dispatch("setHeaderTitle", "종아리 커버 상품");
    }
    else if(to.name=="bodytype-fatbelly") {
      this.$store.dispatch("setHeaderTitle", "뱃살 커버 상품");
    }
    else if(to.name=="bodytype-wideshoulder") {
      this.$store.dispatch("setHeaderTitle", "넓은 어깨 커버 상품");
    }
    else if(to.name=="bodytype-shortneck") {
      this.$store.dispatch("setHeaderTitle", "짧은 목 커버 상품");
    }
    else if(to.name=="bodytype-shortleggs") {
      this.$store.dispatch("setHeaderTitle", "짧은 다리 커버 상품");
    }
    else if(to.name=="bodytype-narrowpelvis") {
      this.$store.dispatch("setHeaderTitle", "좁은 골반 커버 상품");
    }
    else if(to.name=="bodytype-bigbust") {
      this.$store.dispatch("setHeaderTitle", "큰 가슴 커버 상품");
    }
    else if(to.name=="bodytype-tinybust") {
      this.$store.dispatch("setHeaderTitle", "작은 가슴 커버 상품");
    }
    else if(to.name=="bodytype-curvedleggs") {
      this.$store.dispatch("setHeaderTitle", "굽은 다리 커버 상품");
    }
    else if(to.name=="bodytype-longface") {
      this.$store.dispatch("setHeaderTitle", "긴 얼굴 커버 상품");
    }
    else if(to.name=="bodytype-angledface") {
      this.$store.dispatch("setHeaderTitle", "각진 얼굴 커버 상품");
    }
    else if(to.name=="bodytype-roundface") {
      this.$store.dispatch("setHeaderTitle", "동그란 얼굴 커버 상품");
    }
    else if(to.name=="bodytype-skinnybody") {
      this.$store.dispatch("setHeaderTitle", "마른 몸매 커버 상품");
    }
    next();
  }
  };
</script>

<style scoped lang="scss">
.product-fits{
  background-color: #ececec;
  border-radius: 30px;
  display: inline-block;
  padding: 2.5%;
  margin: 1% 2% 1% 0;

  &-container{
    width:90%;
    margin: 3% 0 0 5%;
  }

  &-title{
    font-size: 1.0em;
    font-weight: 800;
    letter-spacing: -1px;
    margin-bottom: 3%;
  }

  &-check{
    color:$primary;
    display: table-cell;
    vertical-align: middle;
    font-size: 1.1em;
    font-weight: 900;
    animation-name : check-fade;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes check-fade {
      0% {
        color:#ececec;
      }
      100% {      
        color:$primary;
      }
    }
  }

  &-name{
    display: table-cell;
    vertical-align: middle;
    font-size: 0.8em;
    font-weight: 500;
    animation-name : checkname-fade;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes checkname-fade {
      0% {
        color:#ececec;
      }
      100% {      
        color:#000;;
      }
    }
  }
}

.button-container{
    position: absolute;
    right:-0.5%;
    top:7%;
}

.skeleton{
    &-button {
            z-index: 2;
            width: 102%;
            height: 101%;
            left:-1px;
            border-radius: 5px;
            position: absolute;
            animation-name : fade_button;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_button {
                0% {
                background-color : #ececec;
                z-index: 2;
                }
                100% {      
                background-color : transparent;
                z-index: 0;
                }
            }
    }

    &-img-big{
            z-index: 2;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            position: absolute;
            animation-name : fade;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade {
                0% {
                background-color : #ececec;
                }
                100% {      
                background-color : transparent;
                }
            }
        }
    &-img-small {
         z-index: 2;
         top:-1px;
        width: 97%;
        height: 102%;
        border-radius: 5px;
        position: absolute;
        animation-name : fade;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade {
            0% {
            background-color : #ececec;
            }
            100% {      
            background-color : transparent;
            }
        }
    }
}

.followIcon{
    font-size: 1.2em;
    color:#fff;
    line-height: 1.3;
    margin-right: 5px;
    &-cancel{
        font-size: 1.2em;
        color:$primary;
        line-height: 1.3;
        margin-right: 5px;
    }
}

.model-followButton{
    z-index:1;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid $primary;
    width:110px;
    display: flex;
    justify-content: center;
    height: 33px;
    padding:3.5% 0;

    &--secondary{
        z-index:1;
        background-color: $primary;
        border-radius: 5px;
        border: 1px solid $primary;
        width:110px;
        display: flex;
        justify-content: center;
        height: 33px;
        padding:3.5% 0;
    }

    &-exFollow{
        font-size: 0.8em;
        color:#fff;
        position: relative;
        bottom: 1px;
        font-weight: 700;
    }

    &-exCancel{
        font-size: 0.8em;
        color:$primary;
        position: relative;
        bottom: 1px;
        font-weight: 700;
    }
}

.product-info-once {
  display: grid;
  background-color:#fff;
}
.product-modelProfile{
  padding : 3% 6%;
  border-bottom: 1px solid #ececec;
}

.product-infoProfile{
  display: flex;
  padding:4% 5%;
  border-bottom: 1px solid #ececec;
}

.product-main {
  display: grid;
  padding: 0 0 5% 0;

  &-image-container {
    padding : 0 5px 0 0;
    width:40%;
    position: relative;
  }
    &-image {
    border-radius: 6px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    z-index: 1;

    &__skeleton {
            z-index: 2;
            width:100%;
            height: 210px;
            left:-3px;
            top:-5px;
            border-radius: 6px;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
  &-profile {
    width : 60%;
    padding-left : 3%;
  }
}

.model-profile{
  display: flex;
  position: relative;
  &__profile-image {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    z-index:1;

     &__skeleton {
            z-index: 2;
            width: 47px;
            height: 47px;
            left:-3px;
            top:-3px;
            border-radius: 50%;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
    &__name {
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 0.9em;
    font-weight: 700;

    animation-name : fade_name;
  animation-duration: 0.2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  @keyframes fade_name {
    0% {
      background-color : #ececec;
      color:#ececec;
    }
    100% {      
      background-color : transparent;
      color:#000000;
    }
  }
  }
  &__height {
    margin-right: 10px;
    font-size: 0.8em;
    font-weight: bold;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
  &__shop {
    margin-right: 10px;
    color: $grey;
    font-size: 0.8em;
    font-weight: 500;

    animation-name : fade_shop;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_shop {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#888888;
      }
  }
  }

  &__info{
    margin: 2% 0 0 7%;
    &__up {
      margin-top : 1%;
  }
    &__down {
      display: flex;
      margin : 5% 0 0 1%;
  }
  }
}

.product-profile {
  padding: 0 0 26px 2%;
  display: grid;

  &__name {
    font-size: 1em;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
  &__price {
    margin-top: 1%;
    font-size: 1.3em;
    font-weight: 700;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
}

.product-link {
  width: 100%;
  margin-top:4%;
  // &__skeleton {
  //     z-index: 2;
  //     width: 92%;
  //     height:3%;
  //     left:4%;
  //     top:22.8%;
  //     border-radius: 3px;
  //     position:absolute;
  //     animation-name : fade_mainImage;
  //     animation-duration: 0.2s;
  //     animation-delay: 1s;
  //     animation-fill-mode: both;
  //     @keyframes fade_mainImage {
  //       0% {
  //         background-color: #ececec;
  //       }
  //       100% {      
  //         background-color: transparent;
  //       }
  //     }
  //   }
}

.button-link {
    z-index:1;
    padding: 12px 5px;
    border-radius: 3px;
    margin-left: 5%;
    width: 90%;
    background-image: linear-gradient(to right,  #f45c43,#eb3346);
    color: $white;
    font-size: 0.9em;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.content-main {
  border-top : 10px solid #ececec;
  padding:0 0 3% 5%;
  background-color : #ffffff;
}

.content-title{
  padding: 25px 0px 5px 0;
  position:relative;

  &__title {
    font-size: 1em;
    font-weight: 700;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
    &__profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 1;

         &__skeleton {
            z-index: 2;
            width: 35px;
            height: 35px;
            left:-3px;
            top:22px;
            border-radius: 50%;
            position:absolute;
            animation-name : fade_mainImage;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_mainImage {
              0% {
                background-color: #ececec;
              }
              100% {      
                background-color: transparent;
              }
            }
    }
  }
}

.another-main {
  border-top : 10px solid #ececec;
  padding:0 0 7% 5%;

  &-style{
      border-top : 10px solid #ececec;
      padding:0 0 23% 5%;
  }
}

.another-title{
  padding: 25px 0px 10px 0;

  &__title {
    font-size: 1em;
    font-weight: 700;
    animation-name : fade_height;
    animation-duration: 0.2s;
    animation-delay: 1s;
    animation-fill-mode: both;
    @keyframes fade_height {
      0% {
        background-color : #ececec;
        color:#ececec;
      }
      100% {      
        background-color : transparent;
        color:#000000;
      }
    }
  }
}

.masonry-container {
    margin: 0 0 0 -10%;
    padding: 3% 0 3% 8%;
    background-color : #ffffff;
    width: 110%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      &::-webkit-scrollbar {
        display : none;
        width:0px;
      }
}

.another-card-container{
        overflow: -moz-scrollbars-none;
        display:flex;
        overflow-x: auto;
        overflow-y: hidden;
        margin:2% 0 0 -20px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
}

.sameHeight-card{
  height: auto;
  width : 45%;
  padding-right:5%;
}

.sameHeight-card{

    &-head{
        margin: 0 0 0 5%;
        width:50%;
    }

    &-title{
        margin-left: -3px;
        padding:3px;
        font-size: 1.2em;
        font-weight: 800;
        letter-spacing: -1.5px;
    }

    &-model-container{
        position: relative;
        margin: 0 0 0 4%;
        text-align: center;
    }

    &-new{
        position: absolute;
        margin: 11px;
        padding: 4px 8px;
        border-radius: 50%;
        font-size: 0.7em;
        font-weight: 700;
        z-index: 4;
        color:#ececec;
        background-color : #ec3e39;
    }

    &-img {
        width:120px;
        height: auto;
        border-radius: 50%;
    }

    &-name{
        font-size: 1em;
        font-weight: 800;
        margin-top:8%;        
    }

    &-info{
        display: flex;
        justify-content: center;
        margin-top:2%;
        line-height: 21px;   
    }

    &-height{
        font-size: 1em;
        font-weight: 800;
    }

    &-shop{
        font-size: 0.8em;
        font-weight: 800;
        color:#999999;
        margin-left: 10px;
    }
}
</style>