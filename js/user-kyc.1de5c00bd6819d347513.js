!function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],f=0,d=[];f<o.length;f++)s=o[f],i[s]&&d.push(i[s][0]),i[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);for(u&&u(e);d.length;)d.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==i[l]&&(n=!1)}n&&(r.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},i={14:0},r=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(t){var e=[],a=i[t];if(0!==a)if(a)e.push(a[2]);else{var n=new Promise(function(e,n){a=i[t]=[e,n]});e.push(a[2]=n);var r=document.getElementsByTagName("head")[0],o=document.createElement("script");o.charset="utf-8",o.timeout=120,s.nc&&o.setAttribute("nonce",s.nc),o.src=function(t){return s.p+"js/"+({}[t]||t)+"."+{0:"b1d82bc311e5aff38167"}[t]+".js"}(t);var l=setTimeout(function(){c({type:"timeout",target:o})},12e4);function c(e){o.onerror=o.onload=null,clearTimeout(l);var a=i[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,s=new Error("Loading chunk "+t+" failed.\n("+n+": "+r+")");s.type=n,s.request=r,a[1](s)}i[t]=void 0}}o.onerror=o.onload=c,r.appendChild(o)}return Promise.all(e)},s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw t};var o=window.webpackJsonp=window.webpackJsonp||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;r.push([840,1]),a()}({148:function(t,e,a){var n=a(828);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a(1)(n,i);n.locals&&(t.exports=n.locals)},149:function(t,e,a){var n=a(834);"string"==typeof n&&(n=[[t.i,n,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};a(1)(n,i);n.locals&&(t.exports=n.locals)},150:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(836);e.default={name:"kyc-complate",mixins:[n.kycComplate]}},151:function(t,e,a){"use strict";a.r(e);var n=a(150),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},152:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},i=s(a(3)),r=s(a(838));function s(t){return t&&t.__esModule?t:{default:t}}e.default={name:"user-kyc",data:function(){var t=this,e=+Date.now()-567648e6,n=+Date.now()-189216e7,i=function(e,a,n){if(!a)return t.$message.warning("请上传认证需要的图片");n()};return{file_list:{F:{loading:!1,img:a(832)},B:{loading:!1,img:a(831)},H:{loading:!1,img:a(830)}},birthday_option:{disabledDate:function(t){return(t=t.getTime())>e&&t<n}},breadcrumbList:[{name:"安全",link:this.$_url.user_overview},{name:"KYC"}],form_data:{birthday:e,code:"",last_name:"",first_name:"",is_agree:!0,photo_front:"",photo_front_Original:"",photo_back:"",photo_back_Original:"",photo_hand:"",photo_hand_Original:""},rules:{birthday:[{required:!0,message:this.$_lang("生日不能为空"),trigger:"blur"}],code:[{required:!0,message:this.$_lang("证件号不能为空"),trigger:"blur"}],last_name:[{required:!0,message:this.$_lang("名字不能为空"),trigger:"blur"}],first_name:[{required:!0,message:this.$_lang("姓名不能为空"),trigger:"blur"}],photo_front:[{validator:i}],photo_back:[{validator:i}],photo_hand:[{validator:i}]},is_complate:0,is_loading:!1,is_agree:!0,is_comein:0}},components:{KycComplate:r.default,TableTitle:i.default},computed:{userName:function(){return""!==this.last_name&&""!==this.first_name&&this.last_name+" "+this.first_name}},methods:{uploadHandle:function(t,e){var a=this,n=t.target.files[0],i=n.size;if(t.target.value="",i>1572864)this.$message.warning(this.$_lang("图片大小不能超过1.5MB"));else{this.file_list[e].loading=!0;var r=new FormData;r.append("file",n),r.append("fileType",e),this.$_http.loadFile(r,{transformRequest:[function(t){return t}]}).then(function(t){if(0===t.status){var i=new window.FileReader;i.readAsDataURL(n),i.onload=function(t){a.file_list[e].img=t.target.result,a.file_list[e].loading=!1};var r={F:["photo_front","photo_front_Original"],B:["photo_back","photo_back_Original"],H:["photo_hand","photo_hand_Original"]};a.form_data[r[e][0]]=t.dataWrapper.filePathName,a.form_data[r[e][1]]=t.dataWrapper.originalFilePath}else a.$message.error(a.$_lang(t.msg))}).catch(function(){a.$message.error(a.$_lang("上传失败"))})}},submitKyc:function(){var t=this;this.$refs.form.validate(function(e){if(e){var a=t.form_data,i=a.last_name,r=a.first_name,s=a.birthday,o=(a.is_agree,function(t,e){var a={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n]);return a}(a,["last_name","first_name","birthday","is_agree"]));s=t.$_lib.timeFormat(s,"yyyy-MM-dd");var l=i+" "+r;t.is_loading=!0,t.$_http.identify(n({type:"身份证",authType:"c2",birthday:s,username:l},o)).then(function(e){t.is_loading=!1,0===e.status?t.is_complate=1:t.$message.error(t.$_lang(e.msg))})}})}},created:function(){var t=this;this.$_obs.sub("user_info",function(e){e.kycStatus>0?location.href=t.$_url.user_overview:t.is_comein=1})}}},153:function(t,e,a){"use strict";a.r(e);var n=a(152),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);e.default=i.a},474:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"kyc-complate g-text-center g-font18"},[a("p",[t._v("在您之前还有： "),a("span",{staticClass:"main-col"},[t._v(t._s(t.pepo))]),t._v("人 正在审核")]),t._v(" "),t._m(0),t._v(" "),a("p",{staticClass:"main-col"},[t._v(t._s(t.$_lang("您提交的实名认证正在火速审核")))]),t._v(" "),a("p",{staticClass:"g-font16"},[t._v(t._s(t.$_lang("认证通过后将获得额外5BTC提现额度")))]),t._v(" "),a("div",{staticClass:"kyc-link-w"},[a("a",{staticClass:"g-btn-one g-font16",attrs:{href:t.$_url.user_overview}},[t._v("\n      "+t._s(t.$_lang("返回个人信息"))+"\n    ")])])])},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cplt-img"},[e("img",{attrs:{src:a(837)}})])}];n._withStripped=!0,a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},530:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-kyc"},[a("v-header"),t._v(" "),a("div",{staticClass:"g-wrap"},[1===t.is_comein?a("div",{staticClass:"g-container"},[a("v-breadcrumb",{attrs:{list:t.breadcrumbList}}),t._v(" "),a("div",{staticClass:"g-content cont"},[a("table-title",{attrs:{title:t.$_lang("实名认证")}}),t._v(" "),a("div",{staticClass:"main-wrap"},[0===t.is_complate?[a("p",{staticClass:"wran-p"},[t._v("\n              "+t._s(t.$_lang("最低认证年龄限制为18岁，最高认证年龄限制为60岁"))+"\n            ")]),t._v(" "),a("el-form",{ref:"form",staticClass:"g-between g-flex-wrap",attrs:{rules:t.rules,model:t.form_data,"label-position":"top"}},[a("el-form-item",{staticClass:"input-group",attrs:{for:"name",prop:"first_name",label:t.$_lang("名")}},[a("el-input",{attrs:{id:"name",placeholder:t.$_lang("名")},model:{value:t.form_data.first_name,callback:function(e){t.$set(t.form_data,"first_name",e)},expression:"form_data.first_name"}})],1),t._v(" "),a("el-form-item",{staticClass:"input-group",attrs:{for:"firstname",prop:"last_name",label:t.$_lang("姓")}},[a("el-input",{attrs:{id:"firstname",placeholder:t.$_lang("姓")},model:{value:t.form_data.last_name,callback:function(e){t.$set(t.form_data,"last_name",e)},expression:"form_data.last_name"}})],1),t._v(" "),a("el-form-item",{staticClass:"input-group",attrs:{prop:"birthday",label:t.$_lang("生日")}},[a("el-date-picker",{staticClass:"li-w-558",staticStyle:{width:"100%"},attrs:{type:"date",align:"left","picker-options":t.birthday_option,placeholder:"选择日期"},model:{value:t.form_data.birthday,callback:function(e){t.$set(t.form_data,"birthday",e)},expression:"form_data.birthday"}})],1),t._v(" "),a("el-form-item",{staticClass:"input-group",attrs:{prop:"code",label:t.$_lang("证件号")}},[a("el-input",{attrs:{placeholder:t.$_lang("证件号")},model:{value:t.form_data.code,callback:function(e){t.$set(t.form_data,"code",e)},expression:"form_data.code"}})],1),t._v(" "),a("el-form-item",{staticClass:"upload-group g-text-center",attrs:{prop:"photo_front"}},[a("div",{staticClass:"g-center g-flex-column"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.file_list.F.loading,expression:"file_list.F.loading"}],staticClass:"upl-img g-loading-col3 g-center"},[a("img",{attrs:{height:"133px",src:t.file_list.F.img}})]),t._v(" "),a("p",{staticClass:"up-tip"},[a("span",{staticClass:"g-font16"},[t._v(t._s(t.$_lang("请提供一张您的证件正面照片")))]),a("br"),t._v("\n                    ＊"+t._s(t.$_lang("保证证件照片清晰可见"))+"\n                  ")]),t._v(" "),a("label",{staticClass:"up-btn-wrap",attrs:{for:"front"}},[a("div",{staticClass:"g-btn-one up-btn btn-upload"},[t._v("\n                      "+t._s(t.$_lang("上传证件照正面"))+"\n                    ")]),t._v(" "),a("input",{staticClass:"file-input",attrs:{id:"front",type:"file"},on:{change:function(e){t.uploadHandle(e,"F")}}})])])]),t._v(" "),a("el-form-item",{staticClass:"upload-group g-text-center",attrs:{prop:"photo_back"}},[a("div",{staticClass:"g-center g-flex-column"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.file_list.B.loading,expression:"file_list.B.loading"}],staticClass:"upl-img g-loading-col3 g-center"},[a("img",{attrs:{height:"133px",src:t.file_list.B.img}})]),t._v(" "),a("p",{staticClass:"up-tip"},[a("span",{staticClass:"g-font16"},[t._v(t._s(t.$_lang("请提供一张您的证件反面照片")))]),a("br"),t._v("\n                    ＊"+t._s(t.$_lang("保证证件照片清晰可见"))+"\n                  ")]),t._v(" "),a("label",{staticClass:"up-btn-wrap",attrs:{for:"back"}},[a("div",{staticClass:"g-btn-one up-btn btn-upload"},[t._v("\n                      "+t._s(t.$_lang("上传证件照背面"))+"\n                    ")]),t._v(" "),a("input",{staticClass:"file-input",attrs:{name:"B",id:"back",type:"file"},on:{change:function(e){t.uploadHandle(e,"B")}}})])])]),t._v(" "),a("el-form-item",{staticClass:"upload-group g-text-center",attrs:{prop:"photo_hand"}},[a("div",{staticClass:"g-center g-flex-column"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.file_list.H.loading,expression:"file_list.H.loading"}],staticClass:"upl-img g-loading-col3"},[a("img",{attrs:{height:"133px",src:t.file_list.H.img}})]),t._v(" "),a("p",{staticClass:"up-tip"},[a("span",{staticClass:"g-font16"},[t._v(t._s(t.$_lang("左手持有身份证件,右手持带有LBank字样、认证当天日期的证明文件")))]),a("br"),t._v("\n                    ＊"+t._s(t.$_lang("保证证件照片清晰可见"))+"\n                  ")]),t._v(" "),a("label",{staticClass:"up-btn-wrap",attrs:{for:"hold"}},[a("div",{staticClass:"g-btn-one up-btn btn-upload"},[t._v("\n                      "+t._s(t.$_lang("上传手持证件照"))+"\n                    ")]),t._v(" "),a("input",{staticClass:"file-input",attrs:{name:"H",id:"hold",type:"file"},on:{change:function(e){t.uploadHandle(e,"H")}}})])])]),t._v(" "),a("el-form-item",{staticClass:"full-group g-center",attrs:{prop:"is_agree"}},[a("el-checkbox",{model:{value:t.form_data.is_agree,callback:function(e){t.$set(t.form_data,"is_agree",e)},expression:"form_data.is_agree"}},[a("span",{staticClass:"col-49"},[t._v(t._s(t.$_lang("我承诺本人来自非美国等地区，不存在任何盗用他人证件行为")))])])],1),t._v(" "),a("el-form-item",{staticClass:"full-group g-center"},[a("el-button",{staticClass:"sub-btn g-font16 g-btn-one",attrs:{disabled:!t.form_data.is_agree,loading:t.is_loading},on:{click:t.submitKyc}},[t.is_loading?t._e():[t._v("\n                    "+t._s(t.$_lang("提交"))+"\n                  ")]],2)],1)],1)]:a("kyc-complate")],2)],1)],1):t._e()]),t._v(" "),a("v-footer")],1)},i=[];n._withStripped=!0,a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},828:function(t,e,a){},829:function(t,e,a){"use strict";var n=a(148);a.n(n).a},830:function(t,e,a){t.exports=a.p+"imgs/upload-03.276bf0ad19a29971e6052853a4e1efea.jpg"},831:function(t,e,a){t.exports=a.p+"imgs/upload-02.9bb2b7da47a65591b8a84f16e768afba.png"},832:function(t,e,a){t.exports=a.p+"imgs/upload-01.db3757d67e87996307452a16ab46f21b.png"},834:function(t,e,a){},835:function(t,e,a){"use strict";var n=a(149);a.n(n).a},836:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.kycComplate={data:function(){return{pepo:"--"}},methods:{getUnconfirmed:function(){var t=this;this.$_http.unconfirmed().then(function(e){if(0===e.status){var a=e.dataWrapper.unconfirmes;t.$nextTick(function(){a<0&&(a=0),t.pepo=a})}else t.$message.error(t.$_lang(e.msg))})}},created:function(){this.getUnconfirmed()}}},837:function(t,e,a){t.exports=a.p+"imgs/user-kyc-01.fe437673a20fab485ec4988d9430fb4c.png"},838:function(t,e,a){"use strict";a.r(e);var n=a(474),i=a(151);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a(835);var s=a(0),o=Object(s.a)(i.default,n.a,n.b,!1,null,"3e46e4e0",null);o.options.__file="src/lbank/views/user-kyc/modules/kyc-complate.vue",e.default=o.exports},839:function(t,e,a){"use strict";a.r(e);var n=a(530),i=a(153);for(var r in i)"default"!==r&&function(t){a.d(e,t,function(){return i[t]})}(r);a(829);var s=a(0),o=Object(s.a)(i.default,n.a,n.b,!1,null,"b4507f84",null);o.options.__file="src/lbank/views/user-kyc/user-kyc.vue",e.default=o.exports},840:function(t,e,a){"use strict";var n,i=a(2),r=a(839),s=(n=r)&&n.__esModule?n:{default:n};i.utils.isLogin?(0,i.Render)(function(){new Vue({el:"#app",components:{primary:s.default},template:"<primary/>"})}):location.href=i.url.login}});