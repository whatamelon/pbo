<template>

    <main class="home-container">

            <div class="title__container">
                <span class="title__t"> {{ itemTitle }}</span>
                <span class="title__b" @click="goOut">나가기</span>
            </div>


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
        <div class="button_container" @click="goTo(1)">
             {{ this.nn }} 
        </div>

            <div class="appbar2">
                대표사진 ( 1장 )
            </div>
                <div v-show="titleImages != null" style="margin:8% 0 0 5%">
                    <img :src="IMAGE_URL + titleImages"  class="image2"/>
                </div>

                <div class="image__button__container">
                    <label class="plusImage">
                        <div class="image__button1">대표 사진 추가</div>
                        <input  style="display: none;" type="file" name="photo1" accept="image/*" @change="plusTitleFiles($event.target.name, $event.target.files)" />
                    </label>
                    <div class="image__button2" @click="deleteImage('title')">대표 사진 삭제</div>
                </div>

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>

            <div class="appbar2">
                상세사진 ( 14장 ~ 30장 )
            </div>
            <div class="changeIndexSum">
                드래그 앤 드롭후 '순서변경' 버튼을 누르시면, 순서가 변경됩니다.
            </div>
                <div v-show="detailImages.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="detailImages"  handle=".handle1" >
                    <div class="handle1"v-for="(image, index) in detailImages" :key="image.imgIdx">
                        <img :src="IMAGE_URL + image.imgLink"  class="image2"/>
                            <input type="checkbox"  :value="image.imgIdx" v-model="checkedDetails" class="imageClose">
                        <div class="image__index">{{ index + 1}}</div>
                    </div>
                    </draggable>
                </div>

                <div class="image__button__container">
                    <label class="plusImage">
                        <div class="image__button1">사진 추가</div>
                        <input  style="display: none;" type="file" name="photo1" accept="image/*" @change="plusDetailFiles($event.target.name, $event.target.files)" multiple>
                    </label>
                    <div class="image__button2" @click="deleteImage('detail')">선택 사진 삭제</div>
                    <div class="image__button3" @click="changeIndex('detail')">순서변경</div>
                </div>

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>

            <div class="appbar2">
                정자세 사진 ( 2장 - 3장 )
            </div>
            <div class="changeIndexSum">
                드래그 앤 드롭후 '순서변경' 버튼을 누르시면, 순서가 변경됩니다.
            </div>
                <div v-show="frontImages.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="frontImages"  handle=".handle2" >
                    <div class="handle2"v-for="(image, index) in frontImages" :key="image.imgIdx">
                        <img :src="IMAGE_URL + image.imgLink"  class="image2"/>
                            <input type="checkbox"  :value="image.imgIdx" v-model="checkedFront" class="imageClose">
                        <div class="image__index">{{ index + 1}}</div>
                    </div>
                    </draggable>
                </div>

                <div class="image__button__container">
                    <label class="plusImage">
                        <div class="image__button1">사진 추가</div>
                        <input  style="display: none;" type="file" name="photo2" accept="image/*" @change="plusFrontFiles($event.target.name, $event.target.files)" multiple>
                    </label>
                    <div class="image__button2" @click="deleteImage('front')">선택 사진 삭제</div>
                    <div class="image__button3" @click="changeIndex('front')">순서변경</div>
                </div>

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>


            <div class="appbar2">
                부분 확대 사진 ( 2장 - 3장 )
            </div>
            <div class="changeIndexSum">
                드래그 앤 드롭후 '순서변경' 버튼을 누르시면, 순서가 변경됩니다.
            </div>
                <div v-show="partImages.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="partImages"  handle=".handle3" >
                    <div class="handle3"v-for="(image, index) in partImages" :key="image.imgIdx">
                        <img :src="IMAGE_URL + image.imgLink"  class="image2"/>
                            <input type="checkbox"  :value="image.imgIdx" v-model="checkedParts" class="imageClose">
                        <div class="image__index">{{ index + 1}}</div>
                    </div>
                    </draggable>
                </div>

                <div class="image__button__container">
                    <label class="plusImage">
                        <div class="image__button1">사진 추가</div>
                        <input  style="display: none;" type="file" name="photo3" accept="image/*" @change="plusPartFiles($event.target.name, $event.target.files)" multiple>
                    </label>
                    <div class="image__button2" @click="deleteImage('part')">선택 사진 삭제</div>
                    <div class="image__button3" @click="changeIndex('part')">순서변경</div>
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
        contents:{
            'title': this.$store.getters.SELECT_ITEM.title,
            'exp': this.$store.getters.SELECT_ITEM.exp,
        },
        showImagesTitle:[],
        showImages1:[],
        showImages2:[],
        showImages3:[],
        images1 : [],
        images2 : [],
        images3 : [],
        imagesTitle : [],
        titleImages: this.$store.getters.CONTS_IMG_TITLE_LINK,
        detailImages: this.$store.getters.CONTS_IMG_DETAIL_LIST,
        frontImages: this.$store.getters.CONTS_IMG_FRONT_LIST,
        partImages: this.$store.getters.CONTS_IMG_PART_LIST,
        plusDetailImages:[],
        checkedDetails:[],
        plusFrontImages:[],
        checkedFronts:[],
        plusPartImages:[],
        checkedParts:[],
    };
  },

   computed: {
    ...mapGetters([
      "IMAGE_URL",
      "NCONTS_ID",
      "CONTS_IMG_TITLE_LINK",
      "CONTS_IMG_DETAIL_LIST",
      "CONTS_IMG_FRONT_LIST",
      "CONTS_IMG_PART_LIST",
    ]),

    bn () {
      return '나가기';
    },

    nn () {
      return  '제목, 설명 수정';
    },

    itemTitle() {
      return '컨텐츠 수정';
    },

  },

    
  async asyncData({ store, to }) {

     var payload = {'offset':0};
     console.log('이거 실행된거임?');

    store.dispatch("setCurrentRoute", "/editContents");
    if(store.getters.SELECT_ITEM.ncontId == undefined || store.getters.SELECT_ITEM.ncontId == null) {
        await store.dispatch("getContentsImage", localStorage.getItem('thisImageId'));
    } else {
        await store.dispatch("getContentsImage", store.getters.SELECT_ITEM.ncontId);
        localStorage.setItem('thisImageId', store.getters.SELECT_ITEM.ncontId)
    }


  },

created() {
    this.detailImages.sort(function(a,b) {
        return a.orderIdx - b.orderIdx;
    });
    this.frontImages.sort(function(a,b) {
        return a.orderIdx - b.orderIdx;
    });
    this.partImages.sort(function(a,b) {
        return a.orderIdx - b.orderIdx;
    });
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");
},

methods:{

    goOut() {
        this.$router.push('/contents');
    },

    async goTo(i) {
            if(i == 0) {
                this.$router.push('/contents');
            } else {
              if(this.contents.title.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '제목을 입력해주세요',
                                actions:{true:'닫기'}
                            });
              } 
              else if( this.contents.title.length  > 20) {
                            const res = await this.$dialog.confirm({
                                text: '제목이 20자를 초과했습니다',
                                actions:{true:'닫기'}
                            });
              } else if( this.contents.exp.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '상세 설명을 입력해주세요',
                                actions:{true:'닫기'}
                            });
              } else if( this.contents.exp.length  > 150) {
                            const res = await this.$dialog.confirm({
                                text: '상세 설명이 150자를 초과했습니다',
                                actions:{true:'닫기'}
                            });
              } else if(this.imagesTitle.length == 0) {
                            const res = await this.$dialog.confirm({
                                text: '대표 사진을 업로드 해주세요',
                                actions:{true:'닫기'}
                            });
              } else if(this.images1.length == 0) {
                            const res = await this.$dialog.confirm({
                                text: '상세 사진을 업로드 해주세요',
                                actions:{true:'닫기'}
                            });
              } else if(this.images2.length == 0) {
                            const res = await this.$dialog.confirm({
                                text: '정자세 사진을 업로드 해주세요',
                                actions:{true:'닫기'}
                            });
              } else if(this.images3.length == 0) {
                            const res = await this.$dialog.confirm({
                                text: '부분 확대 사진을 업로드 해주세요',
                                actions:{true:'닫기'}
                            });
              } 
              else {
                console.log('1')
                console.log(this.$store.getters.SELECT_ITEM.options)
                console.log(this.$store.getters.SELECT_ITEM.ncontId)

                var payload1 = {
                  'nitemId': '',
                  'title' : this.contents.title,
                  'exp' : this.contents.exp,
                  'options' : this.$store.getters.SELECT_ITEM.options,
                };

                var payload = [this.$store.getters.SELECT_ITEM.ncontId,payload1];
                   await this.$store.dispatch("changeContents", payload).then((response) => {
                      if(response == 200) {
                          console.log('잘올라감 : title')
                      } else {
                          console.log('error')
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                      }
                  })
            }
        }
    },

    async setPhotoFilesTitle (fieldName, fileList) {
      console.log('fileList!!! ' + fileList)
       this.showImagesTitle = [];
       this.imagesTitle = [];
        if(fileList.length > 1) {
                            const res = await this.$dialog.confirm({
                                text: '이미지를 1개만 선택해주세요',
                                actions:{true:'닫기'}
                            });
        } else if (fileList.length ==0) {
                            const res = await this.$dialog.confirm({
                                text: '이미지를 선택해주세요',
                                actions:{true:'닫기'}
                            });
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
    deleteImageTitle(idx) {
         this.showImagesTitle.splice(idx,1);
    },

     resizeImage (settings) {
      console.log('setting!!! ' + settings)
      var file = settings.file;
      var maxSize = settings.maxSize;
      var reader = new FileReader();
      var image = new Image();
      var canvas = document.createElement('canvas');
      var dataURItoBlob = function (value) {
            var binary = atob(value.split(',')[1]);
            var array = [];
            for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }
            var blobfile = new Blob([new Uint8Array(array)], {type: 'image/jpg'});
          return blobfile;
      };
      
      var resize = function () {
          var width = image.width;
          var height = image.height;
          height *= (maxSize / width).toFixed(2);
          width = maxSize;
          canvas.width = width;
          canvas.height = height;
          console.log('image!!! ' + image)
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpg');
          return dataURItoBlob(dataUrl);
      };
      return new Promise(function (ok, no) {
        if (!file.type.match(/image.*/)) {
            no(new Error("Not an image"));
            return;
        }
        reader.onload = function (readerEvent) {
            image.onload = function () { return ok(resize()); };
            image.src = readerEvent.target.result;
        };
        reader.readAsDataURL(file);
    });
},

    async plusDetailFiles (fieldName, fileList) {
      console.log('fileList!!! ' + fileList)
       this.plusDetailImages = [];
        if(fileList.length > 30 || fileList.length < 14) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 14~30개선택해주세요',
                                actions:{true:'닫기'}
                            });
        } else if (fileList.length ==0) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 선택해주세요',
                                actions:{true:'닫기'}
                            });
        } else {
            console.log('fileList!!!22222')
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                console.log('idx!!!22222 '  + i)
                
                 var image = await this.resizeImage({
                    file: fileList[i],
                    maxSize: 500
                });
                this.plusDetailImages.push(image);
            }

            var detailList = this.$store.getters.CONTS_IMG_DETAIL_LIST;
            var standardIndex = 0;

            for(var j = 0; j< detailList.length; j++) {
                console.log(Number(detailList[j].imgIdx))
                console.log(standardIndex)
                if(Number(detailList[j].imgIdx) > standardIndex) {
                    standardIndex = Number(detailList[j].imgIdx);
                }
            }
            console.log(standardIndex);

            console.log(this.plusDetailImages)
                var newIndex = 0;
            console.log('기존 이미지 길이' + this.$store.getters.CONTS_IMG_DETAIL_LIST.length)

            for(
                var idxFile = standardIndex+1; 
                idxFile < standardIndex+1+ this.plusDetailImages.length; 
                idxFile++
                ) {
                console.log('시작하는 index '+ idxFile)
                 console.log('new Index는 머야? '+ newIndex)
                var blobfile = this.plusDetailImages[newIndex];
                const formData = new FormData();
                formData.append('imgFile', blobfile, 'image.jpg');
                var payload = [ localStorage.getItem('thisImageId'), 'detail', idxFile, formData];

                   await this.$store.dispatch("sendContentsImage", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘올라감' + idxFile)
                        if(newIndex < idxFile+ this.plusDetailImages.length-1) {
                            newIndex++;
                        }
                    } else {
                        console.log('에러' + idxFile)
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                    }
                })
            }
        }
        location.reload();
    },

    async plusFrontFiles (fieldName, fileList) {
      console.log('fileList!!! ' + fileList)
       this.plusDetailImages = [];
        if(fileList.length > 3 || fileList.length < 2) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 2~3개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
        } else if (fileList.length ==0) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
        } else {
            console.log('fileList!!!22222')
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                console.log('idx!!!22222 '  + i)
                
                 var image = await this.resizeImage({
                    file: fileList[i],
                    maxSize: 500
                });
                this.plusDetailImages.push(image);
            }

            var detailList = this.$store.getters.CONTS_IMG_DETAIL_LIST;
            var standardIndex = 0;

            for(var j = 0; j< detailList.length; j++) {
                console.log(Number(detailList[j].imgIdx))
                console.log(standardIndex)
                if(Number(detailList[j].imgIdx) > standardIndex) {
                    standardIndex = Number(detailList[j].imgIdx);
                }
            }
            console.log(standardIndex);

            console.log(this.plusDetailImages)
                var newIndex = 0;
            console.log('기존 이미지 길이' + this.$store.getters.CONTS_IMG_DETAIL_LIST.length)

            for(
                var idxFile = standardIndex+1; 
                idxFile < standardIndex+1+ this.plusDetailImages.length; 
                idxFile++
                ) {
                console.log('시작하는 index '+ idxFile)
                 console.log('new Index는 머야? '+ newIndex)
                var blobfile = this.plusDetailImages[newIndex];
                const formData = new FormData();
                formData.append('imgFile', blobfile, 'image.jpg');
                var payload = [ localStorage.getItem('thisImageId'), 'front', idxFile, formData];

                   await this.$store.dispatch("sendContentsImage", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘올라감' + idxFile)
                        if(newIndex < idxFile+ this.plusDetailImages.length-1) {
                            newIndex++;
                        }
                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                        console.log('에러' + idxFile)
                    }
                })
            }}
        location.reload();
    },

    async plusPartFiles (fieldName, fileList) {
      console.log('fileList!!! ' + fileList)
       this.plusDetailImages = [];
        if(fileList.length > 3 || fileList.length < 2) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 2~3개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
        } else if (fileList.length ==0) {
                            const res =  this.$dialog.confirm({
                                text: '이미지를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
        } else {
            console.log('fileList!!!22222')
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                console.log('idx!!!22222 '  + i)
                
                 var image = await this.resizeImage({
                    file: fileList[i],
                    maxSize: 500
                });
                this.plusDetailImages.push(image);
            }

            var detailList = this.$store.getters.CONTS_IMG_DETAIL_LIST;
            var standardIndex = 0;

            for(var j = 0; j< detailList.length; j++) {
                console.log(Number(detailList[j].imgIdx))
                console.log(standardIndex)
                if(Number(detailList[j].imgIdx) > standardIndex) {
                    standardIndex = Number(detailList[j].imgIdx);
                }
            }
            console.log(standardIndex);

            console.log(this.plusDetailImages)
                var newIndex = 0;
            console.log('기존 이미지 길이' + this.$store.getters.CONTS_IMG_DETAIL_LIST.length)

            for(
                var idxFile = standardIndex+1; 
                idxFile < standardIndex+1+ this.plusDetailImages.length; 
                idxFile++
                ) {
                console.log('시작하는 index '+ idxFile)
                 console.log('new Index는 머야? '+ newIndex)
                var blobfile = this.plusDetailImages[newIndex];
                const formData = new FormData();
                formData.append('imgFile', blobfile, 'image.jpg');
                var payload = [ localStorage.getItem('thisImageId'), 'part', idxFile, formData];

                   await this.$store.dispatch("sendContentsImage", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘올라감' + idxFile)
                        if(newIndex < idxFile+ this.plusDetailImages.length-1) {
                            newIndex++;
                        }
                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                        console.log('에러' + idxFile)
                    }
                })
            }}
        location.reload();
    },

    async plusTitleFiles(fieldName, fileList) {
        var image = await this.resizeImage({
            file: fileList[0],
            maxSize: 500
        }); 
        const formData = new FormData();
        formData.append('imgFile', image, 'image.jpg');
        var payload = [ localStorage.getItem('thisImageId'), 'title', '0', formData];

            await this.$store.dispatch("sendContentsImage", payload).then((response) => {
            if(response == 200) {
                console.log('잘올라감 title')
            } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                console.log('에러 title')
            }
        })
        location.reload();
    },

    async deleteImage(type){
        switch(type) {
            case 'detail':
                for(var i = 0; i < this.checkedDetails.length; i++) {
                var payload = [localStorage.getItem('thisImageId'), type, this.checkedDetails[i]];
                    await this.$store.dispatch("deleteContentsImage", payload).then((response) => {
                        if(response == 200) {
                            console.log('잘 지워짐 : title')
                        } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            console.log('error')
                        }
                    })
                }
                break;
            case 'front':
                for(var i = 0; i < this.checkedFronts.length; i++) {
                var payload = [localStorage.getItem('thisImageId'), type, this.checkedFronts[i]];
                    await this.$store.dispatch("deleteContentsImage", payload).then((response) => {
                        if(response == 200) {
                            console.log('잘 지워짐 : title')
                        } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            console.log('error')
                        }
                    })
                }
                break;
            case 'part':
                for(var i = 0; i < this.checkedParts.length; i++) {
                var payload = [localStorage.getItem('thisImageId'), type, this.checkedParts[i]];
                    await this.$store.dispatch("deleteContentsImage", payload).then((response) => {
                        if(response == 200) {
                            console.log('잘 지워짐 : title')
                        } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            console.log('error')
                        }
                    })
                }
                break;
            case 'title':
                var payload = [localStorage.getItem('thisImageId'), type, 0];
                    await this.$store.dispatch("deleteContentsImage", payload).then((response) => {
                        if(response == 200) {
                            console.log('잘 지워짐 : title')
                        } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            console.log('error')
                        }
                    })
                break;
        }
        location.reload();
    },

    async changeIndex(type) {
        switch(type) {
            case 'detail':
                for(var i = 0; i < this.detailImages.length; i++) {
                    this.detailImages[i].orderIdx = String(i);
                }
                var payload = [localStorage.getItem('thisImageId'), type, this.detailImages];
                await this.$store.dispatch("changeContentsImageIndex", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘 지워짐 : title')
                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                        console.log('error')
                    }
                })
                break;
            case 'front':
                for(var i = 0; i < this.frontImages.length; i++) {
                    this.detailImages[i].orderIdx = String(i);
                }
                var payload = [localStorage.getItem('thisImageId'), type, this.frontImages];
                await this.$store.dispatch("changeContentsImageIndex", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘 지워짐 : title')
                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                        console.log('error')
                    }
                })
                break;
            case 'part':
                for(var i = 0; i < this.partImages.length; i++) {
                    this.detailImages[i].orderIdx = String(i);
                }
                var payload = [localStorage.getItem('thisImageId'), type, this.partImages];
                await this.$store.dispatch("changeContentsImageIndex", payload).then((response) => {
                    if(response == 200) {
                        console.log('잘 지워짐 : title')
                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                        console.log('error')
                    }
                })
                break;
        }
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
        text-align: center;
        width: 200px;
        height: 30px;
        align-items: center;
        font-size: 1em;
        font-weight: 700;
        color: #000;
        border: 1px solid #000;
        border-radius: 5px;
        padding: 1.5% 0;
        margin: 20px 0 0 21%;
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
  background-color: $primary;

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
    width: 90px;
    height: 90px;
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

.image{
    &__index{
        position: absolute;
        z-index: 2;
        left: 2px;
        top: 3px;
        width: 23px;
        height: 23px;
        color: #000;
        background-color: #fff;
        border-radius: 50px;
        float:left;
        border: 1px solid #000;
        text-align: center;
    }

     &__button1{
         padding: 3% 0;
         border-radius: 5px;
         border: 1px solid #000;
         margin-right: 10px;
         font-size: 0.9em;
         width: 100px;
         height: 30px;
         text-align: center;
     }

     &__button2{
         padding: 1% 0;
         border-radius: 5px;
         border: 1px solid #000;
         margin-right: 10px;
         font-size: 0.9em;
         width: 120px;
         height: 30px;
         text-align: center;
     }

     &__button3{
         padding: 1.5% 0;
         border-radius: 5px;
         border: 1px solid #000;
         margin-right: 10px;
         font-size: 0.9em;
         width: 100px;
         height: 30px;
         text-align: center;
     }

     &__button__container{
         display: flex;
         margin: 5% 0 0 7%;
     }
}

.changeIndexSum{
    margin: 2% 7%;
}


.title{
    &__container{
        margin: 10% 7% 10% 7%;
        display: flex;
        justify-content: space-between;
    }

    &__t{
        font-size: 1.5em;
        font-weight: 800;

    }

    &__b{
        font-size: 1.0em;
        font-weight: 800;
        margin-top: 9px;
    }
}

.zeroImage{
    width: 90px;
    height:90px;
    border-radius: 5px;
    border: 1px solid #ececec;    
}

</style>