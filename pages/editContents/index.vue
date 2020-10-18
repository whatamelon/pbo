<template>

    <main class="home-container">
            <div class="appbar">
                {{ itemTitle }}
            </div>
        <div v-if="this.step=='option'">

            <div class="appbar2">
                옵션 선택
            </div>
            <div class="option__container">
                <div v-for="(opt, index) in this.options" class="option__div">
                    <span> {{ options[index][0]['title'] }} </span>
                <SelectBox
                    v-model="optionModels[index]"
                    :items="opt"
                ></SelectBox>
                </div>
            </div>

        </div>

        <div v-else>
            <div class="appbar2">
                제목
            </div>

            <div class="input">
            <input
            maxlength="20"
            placeholder="제목 ( 공백 포함 최대 20자 )"
                v-model="contents.title"
                class="input__bottom"
                type="text"
            />
            </div>
            <div class="appbar2">
                상세 설명
            </div>
            <div class="input22">
                <textarea 
                style="resize: none;"
                v-model="contents.exp"
                class="input__bottom2"
                placeholder="(예시: 안녕하세요~ 저는 키작녀 여대생 000이라고 합니다. . 저는 학교다닐 때 데일리로 입을수 있는 옷이나, 여행룩을 많이 소개할거예요! 특히 짧은 다리를 길어보이게 하는 룩을 좋아한답니다! 많이 들러주세요오~)">
                </textarea> 

            </div>

            <div class="appbar2">
                대표사진 ( 1장 )
            </div>
                  <label class="file-select">
                    <div class="select-button">
                    <span>사진 업로드</span>
                    </div>
                    <input  type="file" name="photo1" accept="image/*" @change="setPhotoFilesTitle($event.target.name, $event.target.files)" />
                </label>
                <div v-show="showImagesTitle.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="showImagesTitle"  handle=".handleTitle" >
                        <div class="handleTitle" v-for="(image, index) in showImagesTitle">
                            <img :src="image" width="100" height="100" class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImageTitle(index)">
                            highlight_off
                            </span>
                        </div>
                    </draggable>
                </div>

            <div class="appbar2">
                상세사진 ( 14장 ~ 30장 )
            </div>
                  <label class="file-select">
                    <div class="select-button">
                    <span>사진 업로드</span>
                    </div>
                    <input  type="file" name="photo1" accept="image/*" @change="setPhotoFiles1($event.target.name, $event.target.files)" multiple>
                </label>
                <div v-show="showImages1.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="showImages1"  handle=".handle1" >
                        <div class="handle1" v-for="(image, index) in showImages1">
                            <img :src="image" width="100" height="100" class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage1(index)">
                            highlight_off
                            </span>
                        </div>
                    </draggable>
                </div>

            <div class="appbar2">
                정자세 사진 ( 2장 - 3장 )
            </div>
                  <label class="file-select">
                    <div class="select-button">
                    <span>사진 업로드</span>
                    </div>
                    <input  type="file" name="photo2" accept="image/*" @change="setPhotoFiles2($event.target.name, $event.target.files)" multiple>
                </label>
                <div v-show="showImages2.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="showImages2"  handle=".handle2" >
                        <div class="handle2" v-for="(image, index) in showImages2">
                            <img :src="image" width="100" height="100" class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage2(index)">
                            highlight_off
                            </span>
                        </div>
                    </draggable>
                </div>


            <div class="appbar2">
                부분 확대 사진 ( 2장 - 3장 )
            </div>
                  <label class="file-select">
                    <div class="select-button">
                    <span>사진 업로드</span>
                    </div>
                    <input  type="file" name="photo3" accept="image/*" @change="setPhotoFiles3($event.target.name, $event.target.files)" multiple>
                </label>
                <div v-show="showImages3.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="showImages3"  handle=".handle3" >
                        <div class="handle3" v-for="(image, index) in showImages3">
                            <img :src="image" width="100" height="100" class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage3(index)">
                            highlight_off
                            </span>
                        </div>
                    </draggable>
                </div>
        </div>

        <div class="button_container">
            <div class="button_contents" @click="goTo(0)"> {{ this.bn }} </div>
            <div class="button_divider">|</div>
            <div class="button_contents" @click="goTo(1)"> {{ this.nn }}  </div>
        </div>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SelectBox from "@/components/Functions/selectbox";
import MultipleImageUpload from "@/components/Functions/multipIemageUpload";

export default {
layout: "blank",
    components: {
        SelectBox,
        MultipleImageUpload,
    },

  data() {
    return {
        step:'option',
        // itemTitle: this.$store.getters.SELECT_ITEM.name,
        // bn: '나가기',
        // nn: '컨텐츠 작성하기',
        contents:{
            'title': '승호 테스트입니다!',
            'exp': '승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 승호 테스트 '
        },
        showImages1 : [],
        showImages2 : [],
        showImages3 : [],
        showImagesTitle : [],
        images1 : [],
        images2 : [],
        images3 : [],
        imagesTitle : [],
    };
  },

   computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),

    bn () {
      return this.step == 'contents' ?'이전': '나가기';
    },

    nn () {
      return this.step == 'contents' ? '확인' : '컨텐츠 작성하기';
    },

    itemTitle() {
      return this.$store.getters.SELECT_ITEM.name;
    },

  },

    
  async asyncData({ store, to }) {

     var payload = {'offset':0};

    store.dispatch("setCurrentRoute", "/editContents");

    var optionList = store.getters.SELECT_ITEM.options;
    var optionModel = [];
    var options = [];

    for(var idx = 0; idx < optionList.length; idx++) {
        var obj = new Object();
        obj['option'] = '';
        optionModel.push(obj);

        var objSelect = optionList[idx].split("@@@");
        var objValue = objSelect[1].split(",");
        console.log(objSelect[0])

        var list = new Array();
        for(var k = 0; k < objValue.length; k++) {
            list.push({'no':k, 'keyword': objValue[k], 'title': objSelect[0]});
        }
        options.push(list);
        // options.push(objSelect);
    }

    console.log(options[0][0]['title'])

    return {
        optionModels: optionModel,
        options: options
    };
  },

created() {
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");
},

methods:{
    async goTo(i) {
        if(this.step == 'option') {
            if(i == 0) {
                this.$router.go(-1);
            } else {
                var so = true;
                for(var j = 0; j < this.optionModels.length; j++) {
                    if(this.optionModels[j]['option'] == '') {
                        so = false;
                         break;
                    }
                }
                console.log(this.optionModels)
                console.log(so)
                if(so == false) {
                    alert('옵션을 선택해주세요.');
                } else {
                    this.step = 'contents';
                }
            }
        } else {
            if(i == 0) {
                this.step = 'option';
            } else {
              if(this.contents.title.trim() == '') {
                alert('제목을 입력해주세요.');
              } 
              // else if( this.contents.title.length  > 20) {
              //   alert('제목이 20자를 초과했습니다.');
              // } else if( this.contents.exp.trim() == '') {
              //   alert('상세 설명을 입력해주세요.');
              // } else if( this.contents.exp.length  > 150) {
              //   alert('상세 설명이 150자를 초과했습니다.');
              // } else if(this.imagesTitle.length == 0) {
              //   alert('대표 사진을 업로드 해주세요.');
              // } else if(this.images1.length == 0) {
              //   alert('상세 사진을 업로드 해주세요.');
              // } else if(this.images2.length == 0) {
              //   alert('정자세 사진을 업로드 해주세요.');
              // } else if(this.images3.length == 0) {
              //   alert('부분 확대 사진을 업로드 해주세요.');
              // } 
              else {
                console.log('1')
                console.log(this.imagesTitle.length)

                var payload = {
                  'nitemId': this.$store.getters.SELECT_ITEM.nitemId,
                  'title' : this.contents.title,
                  'exp' : this.contents.exp,
                  'options' : this.optionModels.join(),
                };
                   await this.$store.dispatch("registerContents", payload).then((response) => {
                      if(response == 200) {
                          console.log('잘올라감 : title')
                      } else {
                          console.log('error')
                          // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
                      }
                  })

                // for(var titleIdx = 0; titleIdx < this.imagesTitle.length; titleIdx ++) {
                // console.log('2')

                //   var blobfile = this.imagesTitle[titleIdx];
                //   const formData = new FormData();
                //   formData.append('imgFile', blobfile, 'image.jpg');
                //   var payload = [this.$store.getters.SELECT_ITEM.nitemId, 'title', formData];

                // console.log('3')
                //    await this.$store.dispatch("sendContentsImage", payload).then((response) => {
                //       if(response == 200) {
                //           console.log('잘올라감 : title')
                //       } else {
                //           console.log('error')
                //           // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
                //       }
                //   })
                // }

              }
            }
        }
    },

    setPhotoFiles1 (fieldName, fileList) {
        if(fileList.length > 30) {
            alert('업로드한 이미지가 30개를 초과했습니다.');
        }else if (fileList.length < 14) {
            alert('업로드한 이미지가 14개 미만입니다.');
        } else {
            this.images1 = fileList;
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                this.showImages1.push(URL.createObjectURL(fileList[i]));
            }
        }
     },
    deleteImage1(idx) {
         this.showImages1.splice(idx,1);
    },

    setPhotoFiles2 (fieldName, fileList) {
        if(fileList.length > 3) {
            alert('업로드한 이미지가 3개를 초과했습니다.');
        } else if (fileList.length < 2) {
            alert('업로드한 이미지가 2개 미만입니다.');
        } else {
            this.images2 = fileList;
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                this.showImages2.push(URL.createObjectURL(fileList[i]));
            }
        }
     },
    deleteImage2(idx) {
         this.showImages2.splice(idx,1);
    },

    setPhotoFiles3 (fieldName, fileList) {
        if(fileList.length > 30) {
            alert('업로드한 이미지가 3개를 초과했습니다.');
        } else if (fileList.length < 2) {
            alert('업로드한 이미지가 2개 미만입니다.');
        } else {
            this.images3 = fileList;
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                this.showImages3.push(URL.createObjectURL(fileList[i]));
            }
        }
     },
    deleteImage3(idx) {
         this.showImages3.splice(idx,1);
    },

     setPhotoFilesTitle (fieldName, fileList) {
      console.log('fileList!!! ' + fileList)
       this.showImagesTitle = [];
       this.imagesTitle = [];
        if(fileList.length > 1) {
            alert('이미지를 1개만 선택해주세요.');
        } else if (fileList.length ==0) {
            alert('이미지를 선택해주세요.');
        } else {
            console.log('fileList!!!22222')
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                console.log('idx!!!22222 '  + i)
                
                 var image = this.resizeImage({
                    file: fileList[i],
                    maxSize: 500
                });

                console.log('image  : ' + image)
                this.imagesTitle.push(image);
 
                this.showImagesTitle.push(URL.createObjectURL(fileList[i]));
            }
        }
     },

     resizeImage (settings) {
      console.log('setting!!! ' + settings)
      var file = settings.file;
      var maxSize = settings.maxSize;
      var reader = new FileReader();
      var image = new Image();
      var canvas = document.createElement('canvas');
      var dataURItoBlob = function (dataURI) {
          var bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
              atob(dataURI.split(',')[1]) :
              unescape(dataURI.split(',')[1]);
          var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
          var max = bytes.length;
          var ia = new Uint8Array(max);
          for (var i = 0; i < max; i++)
              ia[i] = bytes.charCodeAt(i);


              console.log('ia!' + ia)
          return new Blob([ia], { type: mime });
      };
      var resize = function () {
          var width = image.width;
          var height = image.height;
          if (width > height) {
              if (width > maxSize) {
                  height *= maxSize / width;
                  width = maxSize;
              }
          } else {
              if (height > maxSize) {
                  width *= maxSize / height;
                  height = maxSize;
              }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpeg');
          console.log('dataUrl!!! ' + dataUrl)
          return dataURItoBlob(dataUrl);
      };
      return  resize();
},

    deleteImageTitle(idx) {
         this.showImagesTitle.splice(idx,1);
    },

    handleSubmit (e) {
        const formData = new FormData();
        formData.append('name', 'hong');
        this.photoFiles.forEach((element, index, array) => {
        formData.append('photo-' + index, element);
        });
    },

},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>

#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 
h1, h2 {
  font-weight: normal;
}
 
ul {
  list-style-type: none;
  padding: 0;
}
 
li {
  display: inline-block;
  margin: 0 10px;
}
 
a {
  color: #42b983;
}

.home-container{
  margin-bottom:100px;
  height:100%;
}

.appbar{
    margin: 50px 7% 20px 7%;
    font-size: 1.5em;
    font-weight: 800;
}

.appbar2{
    margin: 50px 7% 20px 7%;
    font-size: 1.4em;
    font-weight: 800;
}
.option{
    &__container{
        margin: 0 7%;
    }

    &__div{
        margin-top: 3%;
        display: grid;
    }
}

.custom-select{
    width: 50% !important;
}

.button{
    &_container{
        display: flex;
        text-align: center;
        justify-content: center;
        width: 100%;
        height: 60px;
        align-items: center;
        position: fixed;
        bottom: 0px;
        padding-bottom: 10px;
        background: linear-gradient(transparent, #d9d9d9);
        z-index:3;
        max-width: 500px;
    }

    &_contents{
        width: 50%;
        font-size: 1.1em;
        font-weight: 700;
        color: #000;
    }

    &_divider{
        font-size: 1.2em;
        font-weight: 700;
        color: #000;
    }
}

.input {
  display: flex;
  justify-content: start;
  margin: 7% 0 0 7%;
  border-radius: 0;
  color: #000;
&-container{
  display: grid;
  padding: 5%0;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5%;
  background-color: #fff;
}
&-container2{
  display: grid;
  padding: 5%0;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 5%;
  background-color: #fff;
}

&-title{
  margin-left: 7%;
  margin-right: 10px;
  font-size: 1.5em;
  font-weight: 800;
  width: 120px;
  // text-align:center;
}
&-title2{
  margin-left: 7%;
  margin-right: 10px;
  font-size: 1.5em;
  font-weight: 800;
  width: 300px;
  // text-align:center;
}

  &__bottom {
    border: 0;
    border-bottom: 2px solid #000;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1.3em;
    outline: 0;
    width: 320px;
    text-align: start;
    color: #000;
  }

  &__bottom2 {
    border: 2px solid #000;
    border-radius: 5px;
    padding: 2%;
    background: transparent;
    font-weight: 400;
    font-size: 1.0em;
    outline: 0;
    width: 93%;
    height: 150px;
    text-align: start;
    // text-align: center;
    color: #000;
  }
}

.input22{
  display: flex;
  border-radius: 0;
  color: #000;
  justify-content: start;
  margin-left: 7%;
}

.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
.file-select {
    display: inline-block;
    margin: 0 35%;
}

.handle1, .handle2, .handle3, .handleTitle {
    position: relative;
    margin: 2%;
    display: inline-block;
}
.image2{
    position: relative;
     z-index: 1;
     border-radius: 5px;
}

.imageClose{
    position: absolute;
     z-index: 2;
     right: 2px;
     top: 2px;
     color: #000;
     background-color: #fff;
     border-radius: 50px;
     float:right;
}

</style>