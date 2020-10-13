import vueFilePond from "vue-filepond";
import Vue from "vue";
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately
 
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
 
Vue.use(vueFilePond);
