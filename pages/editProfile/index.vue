<template>

        <div class="model-list" style="background-color:#f2f2f2">
  <GoUpButton></GoUpButton>

            <div class="title__container">
                <span class="title__t">프로필 수정</span>
                <span class="title__b" @click="goOut">나가기</span>
            </div>

            <div class="stepName"> 1단계</div>

                <div class="input-container2">
                    <div class="input-title2">
                    이름 ( 실명 )
                    </div>
                    <div class="input3">
                    <input
                    placeholder="이름"
                        v-model="group1.name"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>

                <div class="input-container">
                    <div class="input-title">
                    전화번호
                    </div>
                <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">담당자와 소통할 연락처를 알려주세요:D <br/> (예시: 01059595959)</p>

                    <div class="input">
                    <input
                    maxlength="11"
                    placeholder="전화번호 ( - 제외 )"
                        v-model="group1.phoneNo"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title">
                    출생연도
                    </div>
                <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">스타일 추천 시 활용해요~</p>
                    <div class="input">
                    <input
                    maxlength="4"
                    placeholder="출생연도 ( 4자리 )"
                        v-model="group1.year"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>


                <div class="input-container">

                <div class="input-title2">
                    SNS 선택 ( 중복 선택 가능 )
                </div>
                <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">내가 활동하는 채널을 선택해주세요.~</p>
                <div class="logos">
                    <div class="logos-checkbox">
                        <input 
                        type="checkbox" 
                        id="instagram"
                         class="logos-checkboxes" 
                         value="inst" 
                         v-model="checkedInst"
                         >
                        <label for="instagram" class="logos-option"> <img class="logos-icon" src="/app/instagram.png" /> Instagram</label>

                        <div class="input2">
                        <input
                            placeholder="인스타그램 ID"
                            v-model="checkSns[0].id"
                            class="input2__bottom"
                            type="text"
                        />
                        </div>

                    <div class="radios-container">
                        <div v-for="portal in instagram" class="radios">
                            <input type="radio"
                                    :id="portal.id"
                                    name="portalSelect"
                                    v-bind:value="{id: portal.id, name: portal.name}"
                                    v-on:change="showSellers(portal.id)"
                                    :checked="portal.id == currentInstaId">

                            <label :for="portal.id">{{portal.name}}</label>
                        </div>
                    </div>

                    </div>
                    <div class="logos-checkbox">
                        <input 
                        type="checkbox" 
                        id="youtube" 
                         class="logos-checkboxes" 
                         value="yout" 
                         v-model="checkedYout"
                         >
                        <label for="youtube" class="logos-option"><img class="logos-icon" src="/app/youtube_icon.png" /> Youtube</label>

                        <div class="input2">
                        <input
                        placeholder="유튜브 채널명"
                            v-model="checkSns[1].id"
                            class="input2__bottom"
                            type="text"
                        />
                        </div>
                        <div class="radios-container">
                        <div v-for="portal2 in youtube" class="radios">
                            <input type="radio"
                                    :id="portal2.id"
                                    name="portalSelect2"
                                    v-bind:value="{id: portal2.id, name: portal2.name}"
                                    v-on:change="showSellers2(portal2.id)"
                                    :checked="portal2.id == currentYoutubeId">

                            <label :for="portal2.id">{{portal2.name}}</label>
                        </div>
                    </div>

                    </div>
                </div>
                </div>

            <br/>
            <button class="step-buttons-container2" @click="editProfile(1)" >1번 단계 수정</button>

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>

            <div class="stepName"> 2단계</div>
                <div class="input-container2">
                    <div class="input-title2">
                    자기소개 및 인사
                    </div>
                    
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">글자수 최소 100자, 최대 200자</p>

                    <div class="input22">
                        <textarea 
                        style="resize: none;"
                        v-model="myintro"
                        class="input__bottom2"
                        placeholder="(예시: 안녕하세요~ 저는 키작녀 여대생 000이라고 합니다. . 저는 학교다닐 때 데일리로 입을수 있는 옷이나, 여행룩을 많이 소개할거예요! 특히 짧은 다리를 길어보이게 하는 룩을 좋아한답니다! 많이 들러주세요오~)">
                        </textarea> 

                    </div>
                </div>


                <div class="input-container2">
                    <div class="input-title2" >
                        프로필 사진 선택
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">프로필 페이지에 동그랗게 나오는 프로필 사진이므로 <br/>머리가 잘리지 않은 전체 얼굴 사진으로 선택해주세요!</p>
                    <div style="text-align:center; margin-top:5%;" v-show="dataURIString == ''">
                        <img :src="IMAGE_URL + USER_GRP5.imgLinkTitle" style="width: 100px;height: 100px; border: 1px solid #000; border-radius:50px">
                    </div>
                    <div style="text-align:center; margin-top:5%;" v-show="dataURIString != ''">
                    <img v-show="dataURIString == ''" :src="IMAGE_URL + USER_GRP5.imgLinkTitle" style="width: 100px;height: 100px; border: 1px solid #000; border-radius:50px">
                    
                        <img :src="dataURIString" style="width: 100px;height: 100px; border: 1px solid #000; border-radius:50px">
                    </div>
                    <no-ssr>
                     <vueAnkaCropper
                        :options="{
                            aspectRatio: 1,
                            closeOnSave: false,
                            cropArea: 'box',
                            croppedHeight: 500,
                            croppedWidth: 500,
                            cropperHeight: true,
                            dropareaMessage: '.',
                            frameLineDash: [5,3],
                            frameStrokeColor: 'rgba(255, 255, 255, 0.8)',
                            handleFillColor: 'rgba(255, 255, 255, 0.2)',
                            handleHoverFillColor: 'rgba(255, 255, 255, 0.4)',
                            handleHoverStrokeColor: 'rgba(255, 255, 255, 1)',
                            handleSize: 10,
                            handleStrokeColor: 'rgba(255, 255, 255, 0.8)',
                            layoutBreakpoint: 350,
                            maxCropperHeight: 300,
                            maxFileSize: 10000000,
                            overlayFill: 'rgba(0, 0, 0, 0.5)',
                            previewOnDrag: true,
                            previewQuality: 0.8,
                            resultQuality: 0.95,
                            resultMimeType: 'image/jpeg',
                            selectButtonLabel: '사진을 선택해주세요.',
                            showPreview: true,
                            skin: 'light',
                            uploadData: {},
                            uploadTo: false}"
                            @cropper-error="errorTitle"
                            @cropper-preview="previewTitle"
                            @cropper-saved="uploadTitle"
                            @cropper-file-selected="selectTitle"
                            ></vueAnkaCropper>
                    </no-ssr>
                    <!-- <VueImageUploadCroppie 
                    :defaultImage.sync="defaultImage" :height="500" :width="500" :circle="true" :trans="trans"></VueImageUploadCroppie> -->
                </div>


                <div class="input-container2">
                <div class="input-title2" style="margin-bottom:5%;">
                    스타일 사진 선택 ( 6장 )
                </div>
                <p style="font-size:0.9em; font-weight:400; margin:0 7% 4% 7%;"> 내가 가장 좋아하는 나의 베스트 코디 사진을 등록해 주세요!<br/> 되도록이면 셀카 사진이 아닌 다른 사람이 찍어준 사진으로 등록해 주세요~</p>

                <div style="margin:8% 0 0 5%">
                    <div class="handle1"v-for="(image, index) in sixImages">
                        <label v-if="image == ''" class="zeroImage">
                            <img src="/app/plzUI.png"  class="image2"/> 
                            <input  style="display: none;" type="file" name="photo" accept="image/*" @change="setPhotoFilesEdit($event.target.name, $event.target.files, index)">
                        </label>
                        <div v-else-if="image.slice(0,7) != '/stages'" >
                            <img :src="image"  class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage1(index)">
                            highlight_off
                            </span>
                            <div class="image__index">{{ index + 1}}</div>
                        </div>
                        <div v-else>
                            <img :src="IMAGE_URL + image"  class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage1(index)">
                            highlight_off
                            </span>
                            <div class="image__index">{{ index + 1}}</div>
                        </div>
                    </div>
                </div>
                </div>

                <div class="input-container2">
                    <div class="input-title2">
                        체형 설명 한 줄
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">글자수 최소 50자, 최대 100자</p>

                    <div class="input22">
                        <textarea 
                        style="resize: none; height:95px !important;"
                        v-model="bodyIntro"
                        class="input__bottom2"
                        placeholder="(예시: '저는 전체적으로 체구가 작고 어깨도 많이 좁은편입니다. 반면 다리는 조금 튼실한 편이라서 너무 스키니한 핏의 바지는 안 좋아해요.) ">
                        </textarea> 
                    </div>
                </div>


                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                    신장
                    </div>
                    <div class="input">
                    <input
                    style="width:100px;"
                    maxlength="3"
                        v-model="size.height"
                        class="input__bottom"
                        type="text"
                    />
                    <span style="font-size:1.5em; font-weight:600; color:#000; margin-left:5px;"> cm</span>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                     상의 사이즈
                    </div>
                    <div class="input">
                        <SelectBox
                            v-model="size.top"
                            :items="topList"
                        ></SelectBox>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                     하의 사이즈
                    </div>
                    <div class="input">
                        <SelectBox
                            v-model="size.bottom"
                            :items="bottomList"
                        ></SelectBox>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                     신발 사이즈
                    </div>
                    <div class="input">
                        <SelectBox
                            v-model="size.foot"
                            :items="footList"
                        ></SelectBox>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                     어깨 너비
                    </div>
                    <div class="input">
                        <SelectBox
                            v-model="size.shoulder"
                            :items="shoulderList"
                        ></SelectBox>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title" style="width:120px;">
                     골반 너비
                    </div>
                    <div class="input">
                        <SelectBox
                            v-model="size.pelvis"
                            :items="pelvisList"
                        ></SelectBox>
                    </div>
                </div>

            <br/>
            <button class="step-buttons-container2" @click="editProfile(2)" >2번 단계 수정</button>

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>
            <div class="stepName"> 3단계</div>
                <div class="input-container2">
                    <div class="input-title2">
                        자주 입는 스타일 <br/><p class="select__range">(최대 3개)</p>
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">내가 너무나 애정하는 스타일을 최대 3개까지만 선택해 주세요~</p>
                    <div class="input22" style="display:block; margin-top:3%">
                        <span 
                        v-for="(item, index) in brandList" 
                        class="brandItem" 
                        @click="clickBrand(item, index)" 
                        :class="{'__active': item.isActive == true }"
                        > {{ item.name }} </span>
                    </div>

                <div class="input2" style="justify-content:start; align-items:start; margin-left:7%; margin-top:7%;">
                    <span>기타 : </span>
                <input
                    placeholder="ex) 백예린st."
                    v-model="newLikeStyle"
                    class="input2__bottom"
                    type="text"
                />
                <div class="plusButton" @click="plusLikeStyle">추가</div>
                </div>
                </div>
                <br/>

                <div class="input-container2">
                    <div class="input-title2">
                        절대 안입는 스타일 <br/><p class="select__range">(최소 3개)</p>
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">무슨 일이 있어도 절대 안 입는 스타일 있잖아요?! 그런 스타일을 최소 3개 이상 선택해 주세요!</p>
                    
                    <div class="input22" style="display:block; margin-top:3%">
                        <span 
                        v-for="(item, index) in brandList2" 
                        class="brandItem" 
                        @click="clickBrand2(item, index)" 
                        :class="{'__dactive': item.isActive == true }"
                        > {{ item.name }} </span>
                    </div>
                <div class="input2" style="justify-content:start; align-items:start; margin-left:7%; margin-top:7%;">
                    <span>기타 : </span>
                    <input
                        placeholder="ex) 백예린st."
                        v-model="newDisLikeStyle"
                        class="input2__bottom"
                        type="text"
                    />
                    <div class="plusButton2" @click="plusDisLikeStyle">추가</div>
                </div>
                </div>

                <br/>
                <div class="input-container2">
                    <div class="input-title2">
                        좋아하는 브랜드 <br/><p class="select__range">(최소 3개, 최대 10개)</p>
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">스트릿브랜드, 국내브랜드, 명품브랜드 등 내가 특별히 좋아하는 패션 브랜드가 있다면 최대 10개까지 적어주세요~ </p>
                    
                    <div class="input22" style="display:block; margin-top:5%">
                        <span 
                        v-for="(item, index) in likeBrand" 
                        class="brandItem2" 
                        @click="clickBrandName(item, index)" 
                        > {{ item }} ✖️ </span>
                    </div>
                <div class="input2" style="justify-content:start; align-items:start; margin-left:7%; margin-top:7%;">
                    <input
                        placeholder="ex) 키르시, 샤넬, 나이키"
                        v-model="brandName"
                        class="input2__bottom"
                        type="text"
                    />
                    <div class="plusButton3" @click="pluslikeBrand">추가</div>
                </div>
                </div>

                <br/>
                <div class="input-container2">
                    <div class="input-title2">
                        자주 가는 인터넷 쇼핑몰<br/><p class="select__range">(최소 2개, 최대 5개)</p>
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 7% 0 7%;">자주 방문하는 인터넷(브랜드X)쇼핑몰을 최소 2개 이상 알려주세요~ </p>
                    
                    <div class="input22" style="display:block; margin-top:5%">
                        <span 
                        v-for="(item, index) in mallList" 
                        class="brandItem2" 
                        @click="clickMallName(item, index)" 
                        > {{ item }} ✖️ </span>
                    </div>
                <div class="input2" style="justify-content:start; align-items:start; margin-left:7%; margin-top:7%;">
                    <input
                    style="width:150px"
                        placeholder="ex) 오러블리, 코코스토어"
                        v-model="mallName"
                        class="input2__bottom"
                        type="text"
                    />
                    <div class="plusButton3" @click="plusLikeMall">추가</div>
                </div>
                </div>

                <div class="input-container2" v-show ="checkSns[1].id != ''">
                    <div class="input-title2">
                        유튜브 컨텐츠 연동 확인
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">유튜브 채널을 운영중이신가요? 그렇다면 픽 등록이 더 쉬워집니다! <br/>내 채널에 등록된 패션하울 영상이 피클링에 연동되어 더 많은 사람들이 나의 패션영상을 볼 수 있게 됩니다. <br/>이렇게 진행을 해드릴까요? </p>
                    <div class="logos" style="justify-content: start; margin-left:7%" >
                        <div class="logos-checkbox">
                            <div class="radios-container">
                            <div v-for="portal3 in youtubeChk" class="radios">
                                <input type="radio"
                                        :id="portal3.id"
                                        name="portalSelect3"
                                        v-bind:value="{id: portal3.id, name: portal3.name}"
                                        v-on:change="showSellers3(portal3.id)"
                                        :checked="portal3.id == currentYouChk">

                                <label :for="portal3.id">{{portal3.name}}</label>
                            </div>
                        </div>

                        </div>
                    </div>
                </div>

            <br/>
            <button class="step-buttons-container2" @click="editProfile(3)" >3번 단계 수정</button>

            <div v-show="USER_GRP4 != null">

            <br/>
            <div style="border-top: 7px solid #ececec;"></div>
            <br/>
            <div class="stepName"> 셀러픽키 주소</div>
            <br/>
            <div style="text-align:center; justify-content:center; margin: 3% auto; display:flex">
                <div @click ="postCodeOpen = true" class="postcodeButton">
                    {{ postCodeBody }}
                </div>
            </div>

            <vue-daum-postcode v-show="postCodeOpen== true" @complete="completePostCode($event)" />
            <br/>
            <div class="postcode__container"><div class="postcode__title">우편 번호 </div>  <span class="postcode__body">{{ postCode3 }}</span></div>
            <div class="postcode__container"><div class="postcode__title">주소 </div>  <span class="postcode__body">{{ postCode1 }}</span></div>
            <div class="postcode__container">
                <div class="postcode__title">상세 주소 </div>  
                <input
                        placeholder="상세주소를 적어주세요."
                        v-model="postCode2"
                        class="input2__bottom"
                        type="text"
                    />
            </div>
            <br/>
            <button class="step-buttons-container2" @click="editProfile(4)" >주소 수정</button>
                
            </div>
            
            <!-- <p class="lastPicky">수정 후 최대 1주일 뒤에 피클링앱에서 확인하실 수 있습니다. 아래 피클링 채널을 통해 픽키 센터 친구추가해주세요.</p> -->

        </div>

</template>
<script>

import NoSSR from "vue-no-ssr";
import VueDaumPostcode from "vue-daum-postcode"
import SelectBox from "@/components/Functions/selectbox";
import { mapGetters, mapActions } from "vuex";
// import Vue from 'vue';
import GoUpButton from "@/components/App/GoUpButton";


        
export default {
layout: "blank",

components:{
    SelectBox,
    "no-ssr": NoSSR,
      GoUpButton,
},
data() {
      return{
        step: '2',
        imageUploadIdx: 0,
        postCodeOpen: false,
        postCode1: this.$store.getters.USER_GRP4.addr0 == null ? '':  this.$store.getters.USER_GRP4.addr0 ,
        postCode2:this.$store.getters.USER_GRP4.addr1 == null ? '':  this.$store.getters.USER_GRP4.addr1 ,
        postCode3:this.$store.getters.USER_GRP4.addrCode == null ? '':  this.$store.getters.USER_GRP4.addrCode ,
        dataURIString:'',
        // defaultImage: '',
        trans: { 
            'cropImage': '대표 사진 선택', 
            'chooseImage':'사진 가져오기', 
            'confirmCutting': '확인'
        },
        enabled: false,
        uploadFile : false,
        fileList: [],
        myFiles: [
            {
                'idx': 0,
                'name': ''
            },
            {
                'idx': 1,
                'name': ''
            },
            {
                'idx': 2,
                'name': ''
            },
            {
                'idx': 3,
                'name': ''
            },
            {
                'idx': 4,
                'name': ''
            },
            {
                'idx': 5,
                'name': ''
            },
        ],
        image: null,
        inst: false,
        yout: false,
        currentYouChk :'',
        currentMyinfoChk:'',
        group1 : {
            name: this.$store.getters.USER_GRP1.nameReal,
            phoneNo: this.$store.getters.USER_GRP1.mobileNo,
            year: this.$store.getters.USER_GRP1.birthYear,
        },
        size:{
            height:this.$store.getters.USER_GRP2.sizeHeight,
            top: this.$store.getters.USER_GRP2.sizeTop,
            bottom: this.$store.getters.USER_GRP2.sizeBottom,
            foot: this.$store.getters.USER_GRP2.sizeFoot,
            shoulder: this.$store.getters.USER_GRP2.sizeShoulder,
            pelvis: this.$store.getters.USER_GRP2.sizePelvis,
        },
        instagram:[
            {
                'id': 'inst1', 'name': '1000 이하'
            },
            {
                'id': 'inst2', 'name': '1001 ~ 5000명 이하'
            },
            {
                'id': 'inst3', 'name': '5001명 이상'
            }
        ],
        youtube:[
            {
                'id': 'yout1','name': '1000 이하'
            },
            {
                'id': 'yout2', 'name': '1001 ~ 5000명 이하'
            },
            {
                'id': 'yout3', 'name': '5001명 이상'
            }
        ],
        youtubeChk:[
            {
                'id': 'youChk1','name': '네, 그렇게 해주세요'
            },
            {
                'id': 'youChk2', 'name': '아니요, 연동하지 않을래요.'
            }
        ],
        myinfoChk:[
            {
                'id': 'myChk1','name': '동의'
            },
            {
                'id': 'myChk2', 'name': '동의 안 함'
            }
        ],
        checkedInst : this.$store.getters.USER_GRP1.isInst == 'y'  ? true: false,
        checkedYout : this.$store.getters.USER_GRP1.isYout == 'y'  ? true: false,
        checkSns : [
            {
                'instagram': false,
                'id': this.$store.getters.USER_GRP1.instLink == null? '' :this.$store.getters.USER_GRP1.instLink ,
            },
            {
                'youtube': false,
                'id': this.$store.getters.USER_GRP1.youtLink == null? '' :this.$store.getters.USER_GRP1.youtLink ,
            },
        ],
        checkedNames: this.$store.getters.USER_GRP1.isInst == 'y' &&this.$store.getters.USER_GRP1.isYout == 'y'?
        ['inst', 'yout'] :  this.$store.getters.USER_GRP1.isInst == 'y' &&this.$store.getters.USER_GRP1.isYout == 'n'?
        ['inst'] : this.$store.getters.USER_GRP1.isInst == 'n' &&this.$store.getters.USER_GRP1.isYout == 'y'?
       ['yout'] : [] ,
        myintro: this.$store.getters.USER_GRP2.myExp,
        bodyIntro: this.$store.getters.USER_GRP2.styleExp,
        topList: [
            {'no': 1, 'keyword': '33반 이하'},
            {'no': 2, 'keyword': '44'},
            {'no': 3, 'keyword': '44반'},
            {'no': 4, 'keyword': '55'},
            {'no': 5, 'keyword': '55반'},
            {'no': 6, 'keyword': '66'},
            {'no': 7, 'keyword': '66반'},
            {'no': 8, 'keyword': '77'},
            {'no': 9, 'keyword': '77반'},
            {'no': 10, 'keyword': '88'},
            {'no': 11, 'keyword': '88반'},
            {'no': 12, 'keyword': '99'},
            {'no': 13, 'keyword': '100 이상'},
        ],
        bottomList: [
            {'no': 1, 'keyword': '20 이하'},
            {'no': 2, 'keyword': '21'},
            {'no': 3, 'keyword': '22'},
            {'no': 4, 'keyword': '23'},
            {'no': 5, 'keyword': '24'},
            {'no': 6, 'keyword': '25'},
            {'no': 7, 'keyword': '26'},
            {'no': 8, 'keyword': '27'},
            {'no': 9, 'keyword': '28'},
            {'no': 10, 'keyword': '29'},
            {'no': 11, 'keyword': '30'},
            {'no': 12, 'keyword': '31'},
            {'no': 13, 'keyword': '32'},
            {'no': 14, 'keyword': '33'},
            {'no': 14, 'keyword': '34'},
            {'no': 14, 'keyword': '35'},
            {'no': 14, 'keyword': '36이상'}
        ],
        footList: [
            {'no': 1, 'keyword': '200이하'},
            {'no': 2, 'keyword': '205'},
            {'no': 3, 'keyword': '210'},
            {'no': 4, 'keyword': '220'},
            {'no': 5, 'keyword': '225'},
            {'no': 6, 'keyword': '230'},
            {'no': 7, 'keyword': '235'},
            {'no': 8, 'keyword': '240'},
            {'no': 9, 'keyword': '245'},
            {'no': 10, 'keyword': '250'},
            {'no': 11, 'keyword': '255'},
            {'no': 12, 'keyword': '260'},
            {'no': 13, 'keyword': '265 이상'},
        ],
        shoulderList: [
            {'no': 1, 'keyword': '매우 좁은편'},
            {'no': 2, 'keyword': '좁은편'},
            {'no': 3, 'keyword': '보통'},
            {'no': 4, 'keyword': '넓은편'},
            {'no': 5, 'keyword': '매우 넓은편'},
        ],
        pelvisList: [
            {'no': 1, 'keyword': '매우 좁은편'},
            {'no': 2, 'keyword': '좁은편'},
            {'no': 3, 'keyword': '보통'},
            {'no': 4, 'keyword': '넓은편'},
            {'no': 5, 'keyword': '매우 넓은편'},
        ],
        newLikeStyle:'',
        newDisLikeStyle:'',
        brandName:'',
        mallName: '',
        showImages2 : [],
        images2 : [],
        sixImages: this.$store.getters.USER_GRP5.imgLink,
        allImageDel: false,
        replacedImages:[]
      }
},

  watch: {
    //   'defaultImage':async function(value) {
    //       if (value) {
    //         this.image = value;
    //         console.log('image!!! : ' + this.image)

    //         var binary = atob(value.split(',')[1]);
    //         var array = [];
    //         for(var i = 0; i < binary.length; i++) {
    //             array.push(binary.charCodeAt(i));
    //         }
    //         var blobfile = new Blob([new Uint8Array(array)], {type: 'image/jpg'});

    //         console.log('size!! : ' + blobfile.size);

    //         // if(blobfile.size ==)

    //         const formData = new FormData();
    //         formData.append('imgFile', blobfile, 'image.jpg');
    //         var payload = ['title', formData];

    //         await this.$store.dispatch("sendUserImage", payload).then((response) => {
    //             if(response == 200) {
    //                 console.log('잘올라감 : title')
    //             } else {
    //                 console.log('error')
    //                 // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
    //             }
    //         })
    //       }
    //   }
  },
  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "IS_INFO",
      "USER_NICKNAME",
      "USER_GRP1",
      "USER_GRP2",
      "USER_GRP3",
      "USER_GRP4",
      "USER_GRP5",
    ]),

    postCodeBody() {
        return this.postCode1 == '' ? '주소 입력' : '주소 다시 입력';
    },

        //   errorMessage(a) {
        //       if( a == null || a== undefined) {
        //         return  '';
        //       } else {
        //           return  a;
        //       }
        //   },

        //   imageSource(a) {
        //       if( a == null || a== undefined) {
        //         return  '';
        //       } else {
        //           return  'i';
        //       }
        //   },
        //   file(a) {
        //       if( a == null || a== undefined) {
        //         return  '';
        //       } else {
        //           return  'a';
        //       }
        //   },
        //   cropData(a) {
        //       if( a == null || a== undefined) {
        //         return  '';
        //       } else {
        //           return  'b';
        //       }
        //   },
},

async asyncData({ store }) {

        var styleListEx=[
            { 'name':'페미닌', 'isActive': false},
            { 'name':'모던시크',  'isActive': false },
            {  'name':'심플베이직',  'isActive': false },
            {'name':'러블리', 'isActive': false },
            {'name':'유니크','isActive': false},
            { 'name':'캠퍼스룩','isActive': false},
            { 'name':'빈티지','isActive': false },
            { 'name':'섹시글램', 'isActive': false},
            { 'name':'스쿨룩','isActive': false},
            {'name':'로맨틱','isActive': false},
            { 'name':'오피스룩','isActive': false},
            {'name':'럭셔리','isActive': false},
            { 'name':'스트릿', 'isActive': false},
            {'name':'데일리', 'isActive': false}
        ];
        var styleListEx2=[
            { 'name':'페미닌', 'isActive': false},
            { 'name':'모던시크',  'isActive': false },
            {  'name':'심플베이직',  'isActive': false },
            {'name':'러블리', 'isActive': false },
            {'name':'유니크','isActive': false},
            { 'name':'캠퍼스룩','isActive': false},
            { 'name':'빈티지','isActive': false },
            { 'name':'섹시글램', 'isActive': false},
            { 'name':'스쿨룩','isActive': false},
            {'name':'로맨틱','isActive': false},
            { 'name':'오피스룩','isActive': false},
            {'name':'럭셔리','isActive': false},
            { 'name':'스트릿', 'isActive': false},
            {'name':'데일리', 'isActive': false}
        ];

        var styleExes = [
            '페미닌', '모던시크', '심플베이직' , 
            '러블리', '유니크' ,'캠퍼스룩','빈티지',
            '섹시글램','스쿨룩','로맨틱','오피스룩',
            '럭셔리','스트릿','데일리'
        ];
        var list1 = styleListEx;
        var list2 = styleListEx2;

        var userLst = store.getters.USER_GRP3.styleLike.split(',');
        var userDLst = store.getters.USER_GRP3.styleDislike.split(',');

        for(var i = 0; i < list1.length; i++) {
            for(var j = 0; j < userLst.length; j++) {
                if(list1[i].name == userLst[j]) {
                    list1[i].isActive = true;
                    console.log(list1[i])
                } 
            }
        }

        for(var m = 0; m < userLst.length; m++) {
            if(!styleExes.includes(userLst[m])) {
                list1.push({'name': userLst[m], 'isActive': true});
            } 
        }

        console.log(list1)

        for(var k = 0; k < list2.length; k++) {
            for(var p = 0; p < userDLst.length; p++) {
                if(list2[k].name == userDLst[p]) {
                    list2[k].isActive = true;
                    console.log(list2[k])
                } 
            }
        }

        for(var n = 0; n < userDLst.length; n++) {
            if(!styleExes.includes(userDLst[m])) {
                list2.push({'name': userDLst[m], 'isActive': true});
            } 
        }

        console.log(list2)

        var instIDx = '';
        var youtIDx = '';
        
        if(store.getters.USER_GRP1.instIdx == null) {
            instIDx = 'inst4';
        } else {
            var instNum = Number(store.getters.USER_GRP1.instIdx) + 1;
            instIDx =  'inst' + instNum;
        }
      
        if(store.getters.USER_GRP1.youtIdx == null) {
            youtIDx = 'yout4';
        } else { 
            var youtNum = Number(store.getters.USER_GRP1.youtIdx) + 1;
            youtIDx =  'yout' + youtNum;
        }

        console.log(instIDx);
      


    return {
        currentInstaId:instIDx,
        currentYoutubeId:youtIDx,
        brandList: list1,
        brandList2: list2,
        likeList:userLst,
        dislikeList:userDLst,
        likeBrand:store.getters.USER_GRP3.likeBrand.split(','),
        mallList:store.getters.USER_GRP3.likeMall.split(','),
    };

},

created() {
  
},

mounted() {
    console.log(this.currentInstaId);
    console.log(this.sixImages);
},

methods: {
    
    completePostCode(e) {
        console.log(e)
        this.postCodeOpen = false;
        this.postCode1 = e.address;
        this.postCode3 = e.zonecode;
    },
    showSellers(i) {
        this.currentInstaId = i;
    },
    showSellers2(i) {
        this.currentYoutubeId = i;
        console.log(i)
    },
    showSellers3(i) {
        this.currentYouChk = i;
        console.log(i)
    },
    showSellers4(i) {
        this.currentMyinfoChk = i;
        console.log(i)
    },
    submit() {
        console.log(this.checkedNames);
        if(this.checkedNames.includes('instagram')) {
            this.checkSns[0].instagram = true;
        }
        if(this.checkedNames.includes('youtube')) {
            this.checkSns[1].youtube = true;
        }

        console.log(this.checkSns);
    },

    async editProfile(stepID) {
         switch(stepID) {
            case 1:
                if (this.group1.name.trim() =='' ) {
                            const res = await this.$dialog.confirm({
                                text: '이름을 입력해주세요',
                                actions:{true:'닫기'}
                            });
                } else if( this.group1.phoneNo.trim() == '' || this.group1.phoneNo.trim().length < 11) {
                            const res = await this.$dialog.confirm({
                                text: '전화번호를 입력해주세요',
                                actions:{true:'닫기'}
                            });
                } else if( this.group1.year.trim() == '' || this.group1.year.trim().length < 4) {
                            const res = await this.$dialog.confirm({
                                text: '날짜를 입력해주세요',
                                actions:{true:'닫기'}
                            });
                } else if(this.checkedNames.length ==0) {
                            const res = await this.$dialog.confirm({
                                text: 'SNS를 선택해주세요',
                                actions:{true:'닫기'}
                            });
                } else if(this.checkSns[0].id == '' && this.checkSns[1].id == '') {
                            const res = await this.$dialog.confirm({
                                text: '인스타그램 ID / 유튜브 채널명을 입력해주세요',
                                actions:{true:'닫기'}
                            });
                } else if(this.currentInstaId == 4 && this.currentYoutubeId == 4) {
                            const res = await this.$dialog.confirm({
                                text: '인스타그램 / 유튜브 팔로워 or 구독자 수를 선택해주세요',
                                actions:{true:'닫기'}
                            });
                } else {
                    console.log(this.checkedNames)
                    console.log(this.checkedYout)
                    console.log(this.checkSns)

                    var params = {
                        'status': 'req',
                        'nameReal': this.group1.name,
                        'mobileNo': this.group1.phoneNo,
                        'birthYear': this.group1.year,
                        'isInst': this.checkedInst == true ? 'y': 'n',
                        'instLink': this.checkedInst == true ? this.checkSns[0].id  : '',
                        'instIdx': this.checkedInst == true ? Number(this.currentInstaId.slice(-1)-1): '',
                        'isYout': this.checkedYout == true ? 'y': 'n',
                        'youtLink':  this.checkedYout == true ? this.checkSns[1].id : '',
                        'youtIdx':  this.checkedYout == true ?  Number(this.currentYoutubeId.slice(-1)-1): '',
                    }

                    console.log(params)

                    var payload = ['ugr1', params];

                        await this.$store.dispatch("sendUserInfo", payload).then((response) => {
                        if(response == 200) {
                            const res =  this.$dialog.confirm({
                                text: '수정되었습니다. 피클링 앱에서는 최대 1주일 후부터 확인 가능합니다',
                                actions:{true:'닫기'}
                            });
                        } else if(response == 400) {
                            const res =  this.$dialog.confirm({
                                text: '모든 항목을 알맞게 작성해주세요.',
                                actions:{true:'닫기'}
                            });
                        }else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                        }
                    })
                    .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                    })
                }
                break;
                case 2:
                    if (this.myintro.trim() =='' ) {
                            const res = await this.$dialog.confirm({
                                text: '자기소개를 입력해주세요',
                                actions:{true:'닫기'}
                            });
                    } else if( this.myFiles.length != 6) {
                            const res = await this.$dialog.confirm({
                                text: '스타일 사진을 6장 업로드해주세요',
                                actions:{true:'닫기'}
                            });
                    } else if(this.bodyIntro.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '체형 설명을 입력해주세요',
                                actions:{true:'닫기'}
                            });
                    } else if(
                        this.size.height.trim() == '' || 
                        this.size.top.trim() == '' || 
                        this.size.bottom.trim() == '' || 
                        this.size.foot.trim() == '' || 
                        this.size.shoulder.trim() == '' || 
                        this.size.pelvis.trim() == '' 
                    ) {
                            const res = await this.$dialog.confirm({
                                text: '체형을 선택 / 입력해주세요',
                                actions:{true:'닫기'}
                            });
                    }  else {

                        var params = {
                            'status': 'req',
                            'myExp': this.myintro,
                            'styleExp': this.bodyIntro,
                            'sizeHeight': this.size.height,
                            'sizeTop': this.size.top,
                            'sizeBottom':  this.size.bottom,
                            'sizeFoot':  this.size.foot,
                            'sizeShoulder': this.size.shoulder,
                            'sizePelvis': this.size.pelvis
                        }

                        var payloadUgr2 = ['ugr2', params];

                        console.log(payloadUgr2);
                    for(var idxFile = 0; idxFile < this.replacedImages.length; idxFile++) {

                        var blobfile = this.replacedImages[idxFile].file;
                        const formData = new FormData();
                        formData.append('imgFile', blobfile, 'image.jpg');
                        var payload = [ this.replacedImages[idxFile].index, formData];

                            this.$store.dispatch("sendUserImage", payload).then((response) => {
                            if(response == 200) {
                                console.log('잘올라감' + this.imageUploadIdx)
                            } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                            }
                        })
                    }    

                            await this.$store.dispatch("sendUserInfo", payloadUgr2).then((response) => {
                            if(response == 200) {
                            const res =  this.$dialog.confirm({
                                text: '수정되었습니다. 피클링 앱에서는 최대 1주일 후부터 확인 가능합니다',
                                actions:{true:'닫기'}
                            });
                            } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                            }
                        })
                        .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                        })
                    }
                    break;
                    case 3:
                        if (this.likeList.length < 1) {
                            const res = await this.$dialog.confirm({
                                text: '자주 입는 스타일을 최소 1개 선택해주세요',
                                actions:{true:'닫기'}
                            });
                        } else if(this.dislikeList.length < 3) {
                            const res = await this.$dialog.confirm({
                                text: '절대 안 입는 스타일을 최소 3개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        }else if( this.likeBrand.length < 3 || this.likeBrand.length > 10) {
                            const res = await this.$dialog.confirm({
                                text: '좋아하는 브랜드를 최소 3개, 최대 10개 선택해주세요',
                                actions:{true:'닫기'}
                            });
                        } else if( this.mallList.length < 2 || this.mallList.length > 5) {
                            const res = await this.$dialog.confirm({
                                text: '자주가는 인터넷 쇼핑몰을 최소 2개, 최대 5개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        }  else if(this.checkSns[1].id != '' && this.currentYouChk == '') {
                            const res = await this.$dialog.confirm({
                                text: '유튜브 컨텐츠 연동 항목을 선택해주세요',
                                actions:{true:'닫기'}
                            });
                        } else {

                            var params = {
                                'status': 'req',
                                'styleLike': this.likeList.join(),
                                'styleDislike': this.dislikeList.join(),
                                'likeBrand': this.likeBrand.join(),
                                'likeMall': this.mallList.join(),
                                'youtFlag':  this.currentYouChk == 'youChk1' && this.this.checkSns[1].id != '' ? 'y' : 'n'
                            }

                            var payload = ['ugr3', params];

                             await this.$store.dispatch("sendUserInfo", payload).then((response) => {
                                if(response == 200) {
                            const res =  this.$dialog.confirm({
                                text: '수정되었습니다. 피클링 앱에서는 최대 1주일 후부터 확인 가능합니다',
                                actions:{true:'닫기'}
                            });
                                } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                                }
                            })
                            .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                            })

                        }
                        break;
                        case 4:
                             if (this.postCode1.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '주소를 입력해주세요',
                                actions:{true:'닫기'}
                            });
                            } else if(this.postCode2.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '상세 주소를 입력해주세요',
                                actions:{true:'닫기'}
                            });
                            } else {

                                var code = {
                                    'status': 'req',
                                    'addrCode': this.postCode3,
                                    'addr0': this.postCode1,
                                    'addr1': this.postCode2,
                                    'addr2': ''
                                };

                                var payload = ['ugr4', code];

                            await this.$store.dispatch("sendUserInfo", payload).then((response) => {
                                    if(response == 200) {
                            const res =  this.$dialog.confirm({
                                text: '수정되었습니다. 피클링 앱에서는 최대 1주일 후부터 확인 가능합니다',
                                actions:{true:'닫기'}
                            });
                                    } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요',
                                actions:{true:'닫기'}
                            });
                                    }
                                })}
                            break;
        }
    },

    deleteImage1(idx) {
        console.log(idx)
        this.sixImages[idx] = '';
        console.log(this.sixImages);
        this.sixImages = this.sixImages.slice();
    },

    async setPhotoFilesEdit (fieldName, fileList, index) {
        if(fileList.length != 1) {
                            const res = await this.$dialog.confirm({
                                text: '이미지를 1개만 선택해주세요.',
                                actions:{true:'닫기'}
                            });
        } else {
                 var image = await this.resizeImage({
                    file: fileList[0],
                    maxSize: 500
                });
                this.sixImages[index] = URL.createObjectURL(fileList[0]);
                this.sixImages = this.sixImages.slice();

                const isAlreayExist = (element) => element.index == index;

                var isExist = this.replacedImages.findIndex(isAlreayExist);

                if(isExist == -1) {
                    this.replacedImages.push({'index': index, 'file': image});
                } else {
                    this.replacedImages[isExist] = {'index': index, 'file': image};
                }


                console.log(this.replacedImages);

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
          
          height *= (maxSize / width).toFixed(2);
          width = maxSize;
          canvas.width = width;
          canvas.height = height;
          console.log('image!!! ' + image)
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas.toDataURL('image/jpg');
          console.log('dataUrl!!! ' + dataUrl)
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

async uploadTitle(cropData) {
    if(cropData == null || cropData == undefined) {
            const res = await this.$dialog.confirm({
                text: 'save버튼을 눌러주세요.',
                actions:{true:'닫기'}
            });
    } else {

    console.log('cropData : ' + cropData)
    var blobfile = cropData.croppedFile;

    console.log('size!! : ' + blobfile);


    const formData = new FormData();
    formData.append('imgFile', blobfile, 'image.jpg');
    var payload = ['title', formData];

    await this.$store.dispatch("sendUserImage", payload).then((response) => {
        if(response == 200) {
            console.log('잘올라감 : title')
            const res =  this.$dialog.confirm({
                text: '대표 사진 수정을 요청했습니다.',
                actions:{true:'닫기'}
            });
        } else {
            console.log('error')
            // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
        }
    })
    }
},

async previewTitle(res) {
    console.log('previe title image' + res)
    this.dataURIString = res;
},

async selectTitle(res) {
    console.log('select title' + res)
},

async errorTitle() {
    const res2 =  this.$dialog.confirm({
        text: '다른 사진을 선택해주세요.',
        actions:{true:'닫기'}
    });
},

    clickBrand(item, index){
        console.log(item)
        console.log(index)
        if(item.isActive == true) {
            var idx = this.likeList.findIndex(function(value) {
                return value == item.name;
            })
            this.likeList.splice(idx,1);
            this.brandList[index].isActive = false;
        } else {
            if(this.likeList.length+1 > 3) {

            } else {
                this.likeList.push(item.name);
                this.brandList[index].isActive = true;
            }
        }
    },
    clickBrand2(item, index){
        console.log(item)
        console.log(index)
        if(item.isActive == true) {
            var idx = this.dislikeList.findIndex(function(value) {
                return value == item.name;
            })
            this.dislikeList.splice(idx,1);
            this.brandList2[index].isActive = false;
        } else {
            this.dislikeList.push(item.name);
            this.brandList2[index].isActive = true;
        }
    },
    clickBrandName(item, index){
        console.log(item)
        console.log(index)
        var idx = this.likeBrand.findIndex(function(value) {
            return value == item;
        })
        this.likeBrand.splice(idx,1);
    },
    clickMallName(item, index){
        console.log(item)
        console.log(index)
        var idx = this.mallList.findIndex(function(value) {
            return value == item;
        })
        this.mallList.splice(idx,1);
    },
    plusLikeStyle() {
            if(this.likeList.length+1 > 3) {

            } else if(this.newLikeStyle.trim() == '') {
                console.log('trim 당했는데 아무것도 없음.')
            }else {
                this.likeList.push(this.newLikeStyle.trim());
                this.brandList.push({'name': this.newLikeStyle.trim(), 'isActive': true});
                this.newLikeStyle = '';
            }
    },
    plusDisLikeStyle() {
        if(this.newDisLikeStyle.trim() == '') {
                console.log('trim 당했는데 아무것도 없음.')
        } else{
            this.dislikeList.push(this.newDisLikeStyle.trim());
            this.brandList2.push({'name': this.newDisLikeStyle.trim(), 'isActive': true});
            this.newDisLikeStyle = '';
        }
    },
    pluslikeBrand() {
        if(this.brandName.trim() == '') {
        } else if(this.likeBrand.length+1 > 10) {
        } else {
            this.likeBrand.push(this.brandName.trim());
            this.brandName = '';
        }
    },
    plusLikeMall() {
        if(this.mallName.trim() == '') {
        } else if(this.mallList.length+1 > 5) {
        } else {
            this.mallList.push(this.mallName.trim());
            this.mallName = '';
        }
    },
    goOut() {
        this.$router.go(-1);
    }
},

beforeRouteLeave(to, from, next) {
    next();
}
}
</script>
<style lang="scss" scoped>
.step{
    display: flex;
    justify-content: space-around;
    margin-top: 5%;
    &Name{
        font-size: 1.5em;
        font-weight: 800;
        margin-left: 7%;
    }

    &-indicator{
        margin: 0 10px;
        width: 40px;
        height: 40px;
        background-color: $primary;
        color: #fff;
        font-size: 1em;
        border-radius: 50px;
        text-align: center;
        padding: 9px 0;
    }
    &-indicator2{
        margin: 0 10px;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #000;
        font-size: 1em;
        border: 2px solid #000;
        border-radius: 50px;
        text-align: center;
        padding: 8px 0;
    }

    &-buttons{
        margin-bottom: 50px;
        margin-top: 50px;
        justify-content: center;
        display: flex;
        &-container{
            border-radius: 5px;
            margin: 0 10px;
            width: 30%;
            height: 40px;
            background-color: #000;
            color: #fff;
            font-size: 1.2em;
            text-align: center;
            padding: 8px 0;
        }
        &-container2{
            border-radius: 5px;
            margin: 10% 25%;
            width: 200px;
            height: 40px;
            border: 2px solid #000;
            background-color: #fff;
            color: #000;
            font-size: 1.2em;
            text-align: center;
            padding: 5px 0;
        }
    }
}

.select-title{
    &-container{
        width:100%;
        display: grid;
        text-align: center;
        background-color: #f2f2f2;
        padding: 10% 0 3% 0;
    }

    &1{
        font-size: 1.8em;
        font-weight: 800;
    }

    &2{
      color:$primary;
    }

    &-sub{
        font-size: 1em;
        font-weight: 500;
        color: #555;
        padding: 3% 0 1% 0;
    }
}
.button-black{
    color: #000;
}
.selectButton{
    z-index: 5;
    position: fixed;
    bottom:0;
    height:50px;
    width:100%;
    background-color: #000;;
    padding: 3.5% 8%;
    color: #fff;
    font-size: 1em;
    font-weight: 800;
    text-align: center;

    &-black{
        background-color: $primary;
        font-size: 1em;
        font-weight: 800;
        padding: 3.5% 8%;
        color:#fff;
    }
}

.input22{
  display: flex;
  border-radius: 0;
  color: #000;
  justify-content: start;
  margin-left: 7%;
}

.input3{
  display: flex;
  justify-content: start;
  margin: 7% 0 0 7%;
  border-radius: 0;
  color: #000;
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
  border: 1px solid #cccccc;
  border-radius: 5px;
  margin: 5%;
  background-color: #fff;
}
&-container2{
  display: grid;
  padding: 5%0;
  border: 1px solid #cccccc;
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
&-title3{
  margin-left: 0;
  margin-right: 10px;
  font-size: 1.5em;
  font-weight: 800;
  width: 160px;
  // text-align:center;
}

  &__bottom {
    border: 0;
    border-bottom: 1px solid #ececec;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1.3em;
    outline: 0;
    width: 90%;
    text-align: start;
    color: #000;
  }

  &__bottom2 {
      margin-top: 4% !important;
    border: 1px solid #ececec;
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

.input2 {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  // padding: 25% 0 0 0;
  border-radius: 0;
  color: #000;
  margin-bottom: 5%;

  &__bottom {
    border: 0;
    border-bottom: 1px solid #ececec;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size:0.9em;
    outline: 0;
    width: 140px;
    text-align: center;
    color: #000;
  }
}
.logos{
    margin-top: 5%;
    display: flex;
    justify-content: space-around;
    &-checkbox{
        display: grid;
    }

    &-icon{
        width: 20px;
        height: 20px;
    }

    &-checkboxes {
       margin: 0 auto 3% auto;
    }

    &-option{
        display: inline-block;
        margin-bottom: 20%;
        margin-left: 15px;
    }
}
.radios{
    &-container{
        justify-content: space-around;
        margin-top: 15%;
        display: grid;
    }
}

.brandItem{
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #d9d9d9;
    margin: 4px 8px 4px 0;
    display: inline-block;

    &.__active{
        background-color: #0091ff;
        border: 1px solid #0091ff !important;
        color: #fff !important;
    }
    &.__dactive{
        background-color: #ff4866;
        border: 1px solid #ff4866 !important;
        color: #fff !important;
    }
}
.brandItem2{
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    margin: 4px 8px 4px 0;
    display: inline-block;
}

.plusButton{
    border-radius: 5px;
    background-color: #0091ff;
    color: #fff !important;
    padding: 0 2%;
    margin-left: 3%;
}
.plusButton2{
    border-radius: 5px;
    background-color: #ff4866;
    color: #fff !important;
    padding: 0 2%;
    margin-left: 3%;
}
.plusButton3{
    border-radius: 5px;
    background-color: #000;
    color: #fff !important;
    padding: 0 2%;
    margin-left: 3%;
}
.postcode{
    &Button{
        width: 120px;
        height: 40px;
        background-color: $primary;
        color: #fff;
        border-radius: 10px;
        text-align: center;
        padding: 8px 0;
    }

    &__title{
        width: 100px;
        font-size: 1.1em;
        font-weight: 800;
        margin: 0 5% 0 7%;
    }

    &__body{
        font-size: 1.0em;
        font-weight: 800;
    }

    &__container{
        display: flex;
        margin: 3% 0;
    }

}


.file-select > .select-button {

  color: white;
  background-color: #03a9f4;
  border: 1px solid #03a9f4;
  width: 117px;
  padding: 4px 15px;

  border-radius: 3px;

  text-align: center;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
.file-select {
    display: inline-block;
    margin: 0 33%;
}

.handle1, .handle2, .handle3, .handleTitle {
    position: relative;
    margin: 2%;
    display: inline-block;
}
.lastPicky{
    width: 90%;
    margin: 0 auto;
    padding: 10px;
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

.image__index {
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

.select__range{
    font-size: 0.7em;
    font-weight: 400;
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
.handle1, .handle2, .handle3, .handleTitle {
    position: relative;
    margin: 2%;
    display: inline-block;
}

.zeroImage{
    width: 90px;
    height:90px;
    border-radius: 5px;
    border: 1px solid #ececec;    
}

</style>