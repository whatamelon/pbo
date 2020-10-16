<template>
    <main>
        <div id="my-strictly-unique-vue-upload-multiple-image" style="display: flex; justify-content: center; margin-top:0px;">
            <VueUploadMultipleImage
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            @edit-image="editImage"
            @limit-exceeded="limitExceeded"
            :data-images="images"
            :maxImage="maxCount"
            dragText="이미지 업로드"
            browseText=""
            :showPrimary="false"
            ></VueUploadMultipleImage>
        </div>
    </main>
</template>

<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image';

export default {
    name: "MultipleImageUpload",
    props: [
        'max'
    ],

    components: {
        VueUploadMultipleImage
    },
    data() {
        return {
            images: [],
        };
    },
    methods: {


    uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
    },
    beforeRemove (index, done, fileList) {
      var r = confirm("해당 사진을 삭제하시겠습니까?")
      if (r == true) {done() } else {}
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
    },
    limitExceeded(amount) {
        alert('업로드한 사진의 갯수가 \n '+ amount+'개를 초과했습니다.');
    },
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
</style>