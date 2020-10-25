<template>

        <div class="model-list" style="background-color:#f2f2f2">

    <div class="step" style="background-color:#f2f2f2" v-show="step=='2' || step=='3' || step =='1'">
        <div class="step-indicator">1</div>
        <div class="step-indicator" v-if ="step=='2' || step=='3'">2</div>
        <div class="step-indicator2" v-else>2</div>
        <div class="step-indicator" v-if ="step=='3'">3</div>
        <div class="step-indicator2" v-else>3</div>
    </div>
            <div v-if="step == '1'"> 

    <div class="select-title-container">
        <span class="select-title1">반갑습니다!</span>
        <span class="select-title1">아래 항목을 작성하여</span>
        <span class="select-title1">프로필 등록을 완료해주세요.</span>
    </div>
                <div class="input-container2">
                    <div class="input-title2">
                    이름 ( 실명 )
                    </div>
                    <div class="input3">
                    <input
                    placeholder="한글"
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
                    placeholder="출생연도 ( 숫자 4자리 )"
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
                         v-model="checkedNames"
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
                         v-model="checkedNames"
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
                

                <!-- <button @click="submit">확인</button> -->


            </div>
            <div v-else-if="step == '2'">
                <div class="input-container2">
                    <div class="input-title2">
                    자기소개 및 인사
                    </div>
                    
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">글자수 최소 100자, 최대 200자</p>

                    <div class="input22">
                        <textarea 
                        maxlength="200"
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

                        <img src="/profile_ex.png" style="height: 100px; margin: 20px auto 0 auto;">
                   
                    <div style="text-align:center; margin-top:5%;" v-show="defaultImage != ''">
                        <img :src="defaultImage" style="width: 100px;height: 100px; border: 1px solid #000; border-radius:50px">
                    </div>
                    
                    <VueImageUploadCroppie :defaultImage.sync="defaultImage" :height="100" :width="100" :circle="true" :trans="trans"></VueImageUploadCroppie>
                </div>


                <div class="input-container2">
                <div class="input-title2" style="margin-bottom:5%;">
                    스타일 사진 선택 ( 6장 )
                </div>
                <p style="font-size:0.9em; font-weight:400; margin:0 7% 4% 7%;"> 내가 가장 좋아하는 나의 베스트 코디 사진을 등록해 주세요! 되도록이면 셀카 사진이 아닌 다른 사람이 찍어준 사진으로 등록해 주세요~</p>

                        <img src="/style_ex.png" style="height: 200px; margin: 0 auto;">
                  <label class="file-select">
                    <div class="select-button">
                    <span>사진 업로드</span>
                    </div>
                    <input  type="file" name="photo1" accept="image/*" @change="setPhotoFiles2($event.target.name, $event.target.files)" multiple>
                </label>
                <div v-show="showImages2.length !=0" style="margin:8% 0 0 5%">
                    <draggable v-model="showImages2"  handle=".handle1" >
                        <div class="handle1" v-for="(image, index) in showImages2">
                            <img :src="image"  class="image2"/>
                            <span class="material-icons imageClose" @click="deleteImage2(index)">
                            highlight_off
                            </span>
                            <div class="image__index">{{ index + 1}}</div>
                        </div>
                    </draggable>
                </div>
                </div>

                <div class="input-container2">
                    <div class="input-title2">
                        체형 설명 한 줄
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;">글자수 최소 50자, 최대 100자</p>

                    <div class="input22">
                        <textarea 
                        maxlength="100"
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


            </div>
            <div v-else-if="step == '3'" style="padding: 0 30px;">

                <div class="input-container2">
                    <div class="input-title2">
                        자주 입는 스타일 <br/><p class="select__range">(최대 3개)</p>
                    </div>
                    <p style="font-size:0.9em; font-weight:400; margin:2% 40px 0 7%;">내가 너무나 애정하는 스타일을 최대 3개까지만 선택해 주세요~</p>
                    <div class="input22" style="display:flow-root; margin-top:3%; margin-right: 50px;">
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
                    <p style="font-size:0.9em; font-weight:400; margin:2% 40px 0 7%;">무슨 일이 있어도 절대 안 입는 스타일 있잖아요?! 그런 스타일을 최소 3개 이상 선택해 주세요!</p>
                    
                    <div class="input22" style="display:flow-root; margin-top:3%; margin-right: 50px;">
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
                    <p style="font-size:0.9em; font-weight:400; margin:2% 40px 0 7%;">스트릿브랜드, 국내브랜드, 명품브랜드 등 내가 특별히 좋아하는 패션 브랜드가 있다면 최대 10개까지 적어주세요~ </p>
                    
                    <div class="input22" style="display:flow-root; margin-top:5%; margin-right: 50px;">
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
                    <p style="font-size:0.9em; font-weight:400; margin:2% 40px 0 7%;">자주 방문하는 인터넷(브랜드X)쇼핑몰을 최소 2개 이상 알려주세요~ </p>
                    
                    <div class="input22" style="display:flow-root; margin-top:5%; margin-right: 50px;">
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
                    <p style="font-size:0.9em; font-weight:400; margin:2% 40px 0 7%;">유튜브 채널을 운영중이신가요? 그렇다면 픽 등록이 더 쉬워집니다! <br/>내 채널에 등록된 패션하울 영상이 피클링에 연동되어 더 많은 사람들이 나의 패션영상을 볼 수 있게 됩니다. <br/>이렇게 진행을 해드릴까요? </p>
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

                <div class="input-container2">
                    <div class="input-title2">
                        개인정보 처리방침 동의
                    </div>
                    <a href="https://pickling.kr/privacy.html" 
                    target="_blank"
                    style="font-size:0.9em; font-weight:400; margin:2% 0 0 7%;"
                    >개인정보 처리 방침 확인하기</a>
                    <div class="logos" style="justify-content: start; margin-left:7%" >
                        <div class="logos-checkbox">
                            <div class="radios-container">
                            <div v-for="portal4 in myinfoChk" class="radios">
                                <input type="radio"
                                        :id="portal4.id"
                                        name="portalSelect4"
                                        v-bind:value="{id: portal4.id, name: portal4.name}"
                                        v-on:change="showSellers4(portal4.id)"
                                        :checked="portal4.id == currentMyinfoChk">

                                <label :for="portal4.id">{{portal4.name}}</label>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
            <div v-else-if="step == 'sellerPicky'">

            <div class="select-title-container">
                <span class="select-title1">스토어에 참여할 수 있는</span>
                <span class="select-title1">인플루언서이십니다!</span>
            </div>

            <div style="text-align:start; font-size:1.0em; font-weight:500; margin: 5%">
                <span>피클링 스토어는 인플루언서와 함께 판매하고 수익을 나누는 공간입니다. 자세한 설명은 카카오채널 ‘피클링_픽키센터'를 통해 확인해주세요. <br/>상품 샘플을 지원받을 주소를 입력해주세요~</span>
            </div>

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
            <br/>
            <button class="step-buttons-container2" @click="goAny(2)" >마지막 단계로 꼬우!</button>
                
            </div>

            <div v-else-if="step == 'getNickname'">

            <div class="select-title-container">
                <span class="select-title1">피클링에서 사용할</span>
                <span class="select-title1"><span class="select-title2">한글 닉네임</span>을 정해주세요!</span>
            </div>
                <p class="lastPicky">반드시 피클링앱에서 먼저 닉네임을 수정하여 이미 사용중인 닉네임이 아닌지 확인해주세요.</p>
        
            <br/>
            <img src="/nick_ex.png" style="margin: 10px 0 30px 30px; width: 300px; height: 240px;" />
                    <div style="padding-left: 7%;">
                    <div class="input-title3">
                    한글 닉네임
                    </div>
                    <br/>
                    <input
                    placeholder="( 최대 6자 )"
                        v-model="picklingNickname"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
            <br/>
            <br/>
            <button class="step-buttons-container2" @click="goAny(3)" >프로필 승인 신청하기</button>

            </div>
            <div v-else>
            </div>
                <div class="step-buttons">
                    <button class="step-buttons-container" @click="goAny(0)" v-if="step == '2' || step == '3'">이전</button>
                    <button class="step-buttons-container" @click="goAny(1)"  v-if="step == '1' || step == '2'|| step == '3'">다음</button>
                </div>
        </div>

</template>
<script>

import NoSSR from "vue-no-ssr";

import VueDaumPostcode from "vue-daum-postcode"
import SelectBox from "@/components/Functions/selectbox";
import VueImageUploadCroppie from 'vue-image-upload-croppie'
import { mapGetters, mapActions } from "vuex";import Vue from 'vue';
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
    );
Vue.component('filePond', FilePond);

        
export default {
layout: "blank",

components:{
    SelectBox,
    VueImageUploadCroppie,
    FilePond, 
    "no-ssr": NoSSR
},
data() {
      return{
        step: '3',
        imageUploadIdx: 0,
        picklingNickname:'',
        postCodeOpen: false,
        postCode1:'',
        postCode2:'',
        postCode3:'',
        defaultImage: '',
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
        currentInstaId :'',
        currentYoutubeId :'',
        currentYouChk :'',
        currentMyinfoChk:'',
        group1 : {
            name: '',
            phoneNo: '',
            year: '',
        },
        size:{
            height:'',
            top:'',
            bottom:'',
            foot:'',
            shoulder:'',
            pelvis:''
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
                'id': 'you1','name': '1000 이하'
            },
            {
                'id': 'you2', 'name': '1001 ~ 5000명 이하'
            },
            {
                'id': 'you3', 'name': '5001명 이상'
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
        checkedNames: [],
        checkSns : [
            {
                'instagram': false,
                'id': '',
            },
            {
                'youtube': false,
                'id': '',
            },
        ],
        myintro: '',
        bodyIntro: '',
        topList: [
            {'no': 1, 'keyword': '상의 사이즈'},
            {'no': 2, 'keyword': '33반 이하'},
            {'no': 3, 'keyword': '44'},
            {'no': 4, 'keyword': '44반'},
            {'no': 5, 'keyword': '55'},
            {'no': 6, 'keyword': '55반'},
            {'no': 7, 'keyword': '66'},
            {'no': 8, 'keyword': '66반'},
            {'no': 9, 'keyword': '77'},
            {'no': 10, 'keyword': '77반'},
            {'no': 11, 'keyword': '88'},
            {'no': 12, 'keyword': '88반'},
            {'no': 13, 'keyword': '99'},
            {'no': 14, 'keyword': '100 이상'},
        ],
        bottomList: [
            {'no': 1, 'keyword': '하의 사이즈'},
            {'no': 2, 'keyword': '20 이하'},
            {'no': 3, 'keyword': '21'},
            {'no': 4, 'keyword': '22'},
            {'no': 5, 'keyword': '23'},
            {'no': 6, 'keyword': '24'},
            {'no': 7, 'keyword': '25'},
            {'no': 8, 'keyword': '26'},
            {'no': 9, 'keyword': '27'},
            {'no': 10, 'keyword': '28'},
            {'no': 11, 'keyword': '29'},
            {'no': 12, 'keyword': '30'},
            {'no': 13, 'keyword': '31'},
            {'no': 14, 'keyword': '32'},
            {'no': 15, 'keyword': '33'},
            {'no': 16, 'keyword': '34'},
            {'no': 17, 'keyword': '35'},
            {'no': 18, 'keyword': '36이상'}
        ],
        footList: [
            {'no': 1, 'keyword': '신발 사이즈'},
            {'no': 2, 'keyword': '200이하'},
            {'no': 3, 'keyword': '205'},
            {'no': 4, 'keyword': '210'},
            {'no': 5, 'keyword': '220'},
            {'no': 6, 'keyword': '225'},
            {'no': 7, 'keyword': '230'},
            {'no': 8, 'keyword': '235'},
            {'no': 9, 'keyword': '240'},
            {'no': 10, 'keyword': '245'},
            {'no': 11, 'keyword': '250'},
            {'no': 12, 'keyword': '255'},
            {'no': 13, 'keyword': '260'},
            {'no': 14, 'keyword': '265 이상'},
        ],
        shoulderList: [
            {'no': 1, 'keyword': '어깨 너비'},
            {'no': 2, 'keyword': '매우 좁은편'},
            {'no': 3, 'keyword': '좁은편'},
            {'no': 4, 'keyword': '보통'},
            {'no': 5, 'keyword': '넓은편'},
            {'no': 6, 'keyword': '매우 넓은편'},
        ],
        pelvisList: [
            {'no': 1, 'keyword': '골반 너비'},
            {'no': 2, 'keyword': '매우 좁은편'},
            {'no': 3, 'keyword': '좁은편'},
            {'no': 4, 'keyword': '보통'},
            {'no': 5, 'keyword': '넓은편'},
            {'no': 6, 'keyword': '매우 넓은편'},
        ],
        newLikeStyle:'',
        newDisLikeStyle:'',
        brandName:'',
        mallName: '',
        brandList:[
            {
                'name':'페미닌',
                'isActive': false
            },
            {
                'name':'모던시크',
                'isActive': false
            },
            {
                'name':'심플베이직',
                'isActive': false
            },
            {
                'name':'러블리',
                'isActive': false
            },
            {
                'name':'유니크',
                'isActive': false
            },
            {
                'name':'캠퍼스룩',
                'isActive': false
            },
            {
                'name':'빈티지',
                'isActive': false
            },
            {
                'name':'섹시글램',
                'isActive': false
            },
            {
                'name':'스쿨룩',
                'isActive': false
            },
            {
                'name':'로맨틱',
                'isActive': false
            },
            {
                'name':'오피스룩',
                'isActive': false
            },
            {
                'name':'럭셔리',
                'isActive': false
            },
            {
                'name':'스트릿',
                'isActive': false
            },
            {
                'name':'데일리',
                'isActive': false
            }
        ],
        brandList2:[
            {
                'name':'페미닌',
                'isActive': false
            },
            {
                'name':'모던시크',
                'isActive': false
            },
            {
                'name':'심플베이직',
                'isActive': false
            },
            {
                'name':'러블리',
                'isActive': false
            },
            {
                'name':'유니크',
                'isActive': false
            },
            {
                'name':'캠퍼스룩',
                'isActive': false
            },
            {
                'name':'빈티지',
                'isActive': false
            },
            {
                'name':'섹시글램',
                'isActive': false
            },
            {
                'name':'스쿨룩',
                'isActive': false
            },
            {
                'name':'로맨틱',
                'isActive': false
            },
            {
                'name':'오피스룩',
                'isActive': false
            },
            {
                'name':'럭셔리',
                'isActive': false
            },
            {
                'name':'스트릿',
                'isActive': false
            },
            {
                'name':'데일리',
                'isActive': false
            }
        ],
        likeList:[],
        dislikeList:[],
        likeBrand:[],
        mallList:[],
        showImages2 : [],
        images2 : [],
      }
},

  watch: {
      'defaultImage':async function(value) {
          if (value) {
            this.image = value;
            console.log(this.image)

            var binary = atob(value.split(',')[1]);
            var array = [];
            for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            } 
            var blobfile = new Blob([new Uint8Array(array)], {type: 'image/jpg'});

            // if(blobfile.size ==)

            const formData = new FormData();
            formData.append('imgFile', blobfile, 'image.jpg');
            var payload = ['title', formData];

            await this.$store.dispatch("sendUserImage", payload).then((response) => {
                if(response == 200) {
                    console.log('잘올라감 : title')
                } else {
                    console.log('error')
                    // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
                }
            })
          }
      }
  },
  computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),

    postCodeBody() {
        return this.postCode1 == '' ? '주소 찾기' : '주소 다시 입력';
    }
        },

async asyncData({ store }) {
},

created() {
  
},

mounted() {

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
        console.log(i)
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

    async goAny(i) {
        /// 뒤로 가기
        if(i == 0) {
            switch(this.step) {
                    case '2':
                        this.step = '1';
                        break;
                    case '3':
                        this.step = '2';
                        break;
                }
        } else if(i==1) {
        /// 앞으로 ㄲ 
                switch(this.step) {
                    case '1':
                        if (this.group1.name.trim() =='' ) {
                            const res = await this.$dialog.confirm({
                                text: '이름을 입력해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if( this.group1.phoneNo.trim().length != 11) {
                            const res = await this.$dialog.confirm({
                                text: '전화번호를 확인해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if( this.group1.year.trim().length != 4) {
                            const res = await this.$dialog.confirm({
                                text: '출생연도를 확인해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.checkedNames.length ==0) {
                            const res = await this.$dialog.confirm({
                                text: 'SNS를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.checkSns[0].id == '' && this.checkSns[1].id == '') {
                            const res = await this.$dialog.confirm({
                                text: '인스타그램 ID / 유튜브 채널명을 입력해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.currentInstaId == '' && this.currentYoutubeId == '') {
                            const res = await this.$dialog.confirm({
                                text: '인스타그램 / 유튜브 팔로워 or 구독자 수를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else {

                            var params = {
                                'status': 'req',
                                'nameReal': this.group1.name,
                                'mobileNo': this.group1.phoneNo,
                                'birthYear': this.group1.year,
                                'isYout': this.checkedNames.includes('yout') ? 'y': 'n',
                                'youtLink':  this.checkedNames.includes('yout') ? this.checkSns[1].id : '',
                                'youtIdx':  this.checkedNames.includes('yout') ? Number(this.currentYoutubeId.slice(-1))-1: '',
                                'isInst': this.checkedNames.includes('inst') ? 'y': 'n',
                                'instLink': this.checkedNames.includes('inst') ? this.checkSns[0].id  : '',
                                'instIdx': this.checkedNames.includes('inst') ? Number(this.currentInstaId.slice(-1))-1: '',
                            }

                            var payload = ['ugr1', params];

                             await this.$store.dispatch("sendUserInfo", payload).then((response) => {
                                if(response == 200) {
                                    window.scrollTo(0,0);
                                    this.step = '2';
                                } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                                }
                            })
                            .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            })
                        }
                        break;
                    case '2':
                        console.log(this.myFiles.length)
                        if (this.myintro.trim().length < 100 ) {
                            const res = await this.$dialog.confirm({
                                text: '자기소개는 최소 100자 이상 적어주셔야 합니다.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.defaultImage == null) {
                            const res = await this.$dialog.confirm({
                                text: '대표 사진을 업로드해주세요.',
                                actions:{true:'닫기'}
                            });
                        }else if( this.images2.length != 6) {
                            const res = await this.$dialog.confirm({
                                text: '스타일 사진을 6장 업로드해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.size.top.no == '상의 사이즈') {
                            const res = await this.$dialog.confirm({
                                text: '상의 사이즈를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.size.bottom.no == '하의 사이즈') {
                            const res = await this.$dialog.confirm({
                                text: '하의 사이즈를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.size.foot.no == '신발 사이즈') {
                            const res = await this.$dialog.confirm({
                                text: '신발 사이즈를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.size.shoulder.no == '어깨 너비') {
                            const res = await this.$dialog.confirm({
                                text: '어깨 너비를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.size.pelvis.no == '골반 너비') {
                            const res = await this.$dialog.confirm({
                                text: '골반 너비를 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.bodyIntro.trim() .length < 50) {
                            const res = await this.$dialog.confirm({
                                text: '체형 설명은 최소 50자 이상 적어주셔야 합니다.',
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
                                text: '체형 정보를 모두 입력해주세요.',
                                actions:{true:'닫기'}
                            });
                        }  else {


                        for(var idxFile = 0; idxFile < 6; idxFile++) {
                            // console.log(this.imageUploadIdx)
                            // this.imageUploadIdx = this.imageUploadIdx +1;

                            var blobfile = this.images2[idxFile];
                            const formData = new FormData();
                            formData.append('imgFile', blobfile, 'image.jpg');
                            var payload = [ idxFile, formData];

                                this.$store.dispatch("sendUserImage", payload).then((response) => {
                                if(response == 200) {
                                    console.log('잘올라감' + this.imageUploadIdx)
                                } else {
                            const res = this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                                }
                            })
                        }

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

                            var payload = ['ugr2', params];

                             await this.$store.dispatch("sendUserInfo", payload).then((response) => {
                                if(response == 200) {
                                    window.scrollTo(0,0);
                                    this.step = '3';
                                } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                                }
                            })
                            .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            })
                        }
                        break;
                    case '3':
                        console.log(this.currentMyinfoChk);
                        if (this.likeList.length < 1) {
                            const res = await this.$dialog.confirm({
                                text: '자주 입는 스타일을 최소 1개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.dislikeList.length < 3) {
                            const res = await this.$dialog.confirm({
                                text: '절대 안 입는 스타일을 최소 3개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        }else if( this.likeBrand.length < 3 || this.likeBrand.length > 10) {
                            const res = await this.$dialog.confirm({
                                text: '좋아하는 브랜드를 최소 3개, 최대 10개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if( this.mallList.length < 2 || this.mallList.length > 5) {
                            const res = await this.$dialog.confirm({
                                text: '자주가는 인터넷 쇼핑몰을 최소 2개, 최대 5개 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        }  else if(this.checkSns[1].id != '' && this.currentYouChk == '') {
                            const res = await this.$dialog.confirm({
                                text: '유튜브 컨텐츠 연동 항목을 선택해주세요.',
                                actions:{true:'닫기'}
                            });
                        } else if(this.currentMyinfoChk == '' || this.currentMyinfoChk == 'myChk2') {
                            const res = await this.$dialog.confirm({
                                text: '개인 정보 처리 방침에 동의 해주셔야 프로필 등록이 가능합니다ㅜ',
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

                                    if(this.currentInstaId == 'inst3' || this.currentYoutubeId == 'you3') {
                                        this.step = 'sellerPicky';
                                    }  else {
                                        this.step = 'getNickname';
                                    }
                                    window.scrollTo(0,0);
                                } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                                }
                            })
                            .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                            })

                        }
                        break;
                }
        } else if(i ==2) {
        /// 셀러픽키에서 닉네임 받는 부분으로 ㄲ

         if (this.postCode1.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '주소를 입력해주세요.',
                                actions:{true:'닫기'}
                            });
        } else if(this.postCode2.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '상세 주소를 입력해 주세요.',
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
                    this.step = 'getNickname';
                } else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                }
            })
        }
        } else {
        /// 다했다! 홈으로 ㄲ

        if(this.picklingNickname.trim() == '') {
                            const res = await this.$dialog.confirm({
                                text: '피클링 닉네임을 입력해주세요.',
                                actions:{true:'닫기'}
                            });
        } else {
                await this.$store.dispatch("sendUserNick", this.picklingNickname).then((response) => {
                if(response == 200) {
                    console.log('이제 홈으로 가든지 가면됨.')
                    console.log(window.location.origin);
                    location.replace(window.location.origin + "/home");
                } else if(response == 404){
                            const res =  this.$dialog.confirm({
                                text: '확인되지 않은 닉네임입니다. 피클링 앱에서 먼저 닉네임을 수정한 후 입력해주세요.',
                                actions:{true:'닫기'}
                            });
                }else {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
                }
            })
            .catch((e) => {
                            const res =  this.$dialog.confirm({
                                text: '네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.',
                                actions:{true:'닫기'}
                            });
            })
        }
        }
    },
    deleteImage2(idx) {
        this.images2.splice(idx,1);
         this.showImages2.splice(idx,1);
    },

    async setPhotoFiles2 (fieldName, fileList) {
        if(fileList.length > 6) {
                            const res = await this.$dialog.confirm({
                                text: '업로드한 이미지가 6개를 초과했습니다.',
                                actions:{true:'닫기'}
                            });
        }else if (fileList.length < 6) {
                            const res = await this.$dialog.confirm({
                                text: '6장의 사진을 한 번에 등록해주세요.',
                                actions:{true:'닫기'}
                            });
        } else {
            this.showImages2 = [];
            this.images2 = [];
            for(var i = 0; i < fileList.length; i ++) {
                console.log(fileList[i])
                 var image = await this.resizeImage({
                    file: fileList[i],
                    maxSize: 500
                });

                console.log('image  : ' + image)
                this.images2.push(image);
                this.showImages2.push(URL.createObjectURL(fileList[i]));
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

    handleFilePondInit () {
      console.log('FilePond has initialized')
        this.$refs.pond.getFiles();
    },
    onload (e, r) {
        if(this.uploadFile == true) {
            console.log('load ok?')
            // var idx = 0;
            console.log(this.imageUploadIdx)
            this.imageUploadIdx = this.imageUploadIdx +1;

            if(e== null) {
                console.log('file object : ' + r.file)
                console.log('file id : ' + r.id)
                console.log('file extension : ' + r.fileExtension)
                console.log('fileSize : ' + r.fileSize)
                console.log('filename : ' + r.filename)
            }  else {
                console.log('error? : ' + e)
            }

            const formData = new FormData();
            formData.append('imgFile', r.file, r.file.name);
            var payload = [ this.imageUploadIdx, formData];

                this.$store.dispatch("sendUserImage", payload).then((response) => {
                if(response == 200) {
                    console.log('잘올라감' + this.imageUploadIdx)
                } else {
                    // alert('네트워크 에러가 발생했습니다. 잠시후에 다시 시도해주세요.');
                }
            })
        } else {

        }
    },
    updateFiles(files) {
        this.fileList = files;
        console.log(this.fileList.length)
        console.log(this.myFiles.length)


        if(this.fileList.length < this.myFiles.length) {
            this.uploadFile = false;
            this.$refs.pond.removeFile();
            this.fileList = [];
            console.log('이건 삭제한거임. api 보내면 안됨.')
        }
        else if(files.length == 0) {
            this.uploadFile = false;
            console.log('no files')
        } else if (files.length != 6) {
            if(this.uploadFile == true) {
                this.imageUploadIdx = 0;
                this.uploadFile = true;
            } 
            console.log('file length not 6')
            console.log(files)
            this.myFiles = [];
            for(var i =0; i < files.length; i ++) {
                if(files[i].filename == '') {
                    console.log('has no file name')      
                } else {
                    console.log(files[i].filename)
                    this.myFiles.push({'idx': i, 'name': files[i].filename});
                }
            }
        } else {
            if(this.uploadFile == false) {
                this.imageUploadIdx = 0;
                this.uploadFile = true;
            } 
            console.log('how about update files?')
            console.log(files)
            this.myFiles = [];
            for(var i =0; i < files.length; i ++) {
                if(files[i].filename == '') {
                    console.log('has no file name')      
                } else {
                    console.log(files[i].filename)
                    this.myFiles.push({'idx': i, 'name': files[i].filename});
                }
            }
        }
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
            margin: 0 25%;
            width: 200px;
            height: 40px;
            border: 2px solid #000;
            background-color: #000;
            color: #fff;
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

</style>