export default ({ app, store }) => {
  store.dispatch("setCurrentDevice");

  // for snslogin
  function callbackAppType(type){
    window.AppType = type;
    // alert("call callbackAppType 5: " + window.AppType);
  }

  function callbackAuthToken(token){
    window.AuthToken = token;
    localStorage.setItem("accessToken", token);
    // alert("call callbackAuthToken: " + window.AuthToken);
    // alert("call isLoggedIn:" + store.getters.IS_LOGGED_IN);
  }

  function callbackHeight(height){    
    window.Height = height;
    const getHeight = JSON.parse(height);
        store.dispatch("setHeight", getHeight);
        localStorage.setItem("height", getHeight);
      // store.dispatch("setHeight", height);
      // alert("call callbackHeight 1:" + store.getters.USER_HEIGHT);
  }

  window.callbackAppType = callbackAppType;
  window.callbackAuthToken = callbackAuthToken;
  window.callbackHeight = callbackHeight;
  //

  function callbackOsType(type) {
    window.OsType = type;
    // by shlee for test
    // alert("call callbackOsType:" + window.OsType);
  }

  function callbackPushToken(token) {
    window.PushToken = token;
    // by shlee for test
    // alert("call callbackPushToken:" + window.PushToken);
  }
  
  function callbackPushCheck(check) {
    window.PushCheck = check;
    // by shlee for test
    // alert("call callbackPushCheck:" + window.PushCheck);
  }

  window.callbackOsType = callbackOsType;
  window.callbackPushToken = callbackPushToken;
  window.callbackPushCheck = callbackPushCheck;

  if (!localStorage.getItem("recentProducts")) {
    localStorage.setItem("recentProducts", "[]");
  }

  if (!localStorage.getItem("recentTags")) {
    localStorage.setItem("recentTags", "[]");
  }

  if (!localStorage.getItem("recentModelId")) {
    localStorage.setItem("recentModelId", "[]");
  }

  if (!localStorage.getItem("recentProductId")) {
    localStorage.setItem("recentProductId", "[]");
  }

  app.router.beforeEach(async (to, from, next) => {

    if (from.name != null) {
      localStorage.setItem("previousPage", from.name);
    }

    if(from.name == null || from.name == '') {
      function callbackAuthToken(token){
        window.AuthToken = token;
        localStorage.setItem("accessToken", token);
      }
    
      function callbackHeight(height){    
        window.Height = height;
        const getHeight = JSON.parse(height);
            store.dispatch("setHeight", getHeight);
            localStorage.setItem("height", getHeight);
      }
    
      window.callbackAuthToken = callbackAuthToken;
      window.callbackHeight = callbackHeight;
    }

    store.dispatch("setPreviousPage", localStorage.getItem("previousPage"));

    if (localStorage.getItem("height")) {
      store.dispatch("setHeight", localStorage.getItem("height"));
    }

    if (localStorage.getItem("model")) {
      const model = JSON.parse(localStorage.getItem("model"));
      store.dispatch("setModel", model);
      console.log("새로운모델세팅함");
    }

    // if (localStorage.getItem("modelId")) {
    //   const modelId = JSON.parse(localStorage.getItem("modelId"));
    //   console.log("겟모델함.");
    //   console.log(modelId);
    //   await store.dispatch("getModelInfo", modelId);
    // }


    // if (localStorage.getItem("product")) {
    //   const product = JSON.parse(localStorage.getItem("product"));
    //   store.dispatch("setProductInfo", product);
    //   console.log("새로운상품세팅함");
    // }

    next();
  });
};
