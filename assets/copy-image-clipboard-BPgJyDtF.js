function c(n,e,t,i){function d(o){return o instanceof t?o:new t(function(r){r(o)})}return new(t||(t=Promise))(function(o,r){function a(u){try{f(i.next(u))}catch(s){r(s)}}function m(u){try{f(i.throw(u))}catch(s){r(s)}}function f(u){u.done?o(u.value):d(u.value).then(a,m)}f((i=i.apply(n,[])).next())})}function g(n){return c(this,void 0,void 0,function*(){return yield(yield fetch(`${n}`)).blob()})}function p(n){return n.type.includes("jpeg")}function y(n){return n.type.includes("png")}function b(n){return c(this,void 0,void 0,function*(){return new Promise(function(e,t){const i=document.createElement("img");i.crossOrigin="anonymous",i.src=n,i.onload=function(d){const o=d.target;e(o)},i.onabort=t,i.onerror=t})})}function h(n){return c(this,void 0,void 0,function*(){return new Promise(function(e,t){const i=document.createElement("canvas"),d=i.getContext("2d");if(d){const{width:o,height:r}=n;i.width=o,i.height=r,d.drawImage(n,0,0,o,r),i.toBlob(function(a){a?e(a):t("Cannot get blob from image element")},"image/png",1)}})})}function w(n){return c(this,void 0,void 0,function*(){const e=URL.createObjectURL(n),t=yield b(e);return yield h(t)})}function l(n){return c(this,void 0,void 0,function*(){const e={[n.type]:n},t=new ClipboardItem(e);yield navigator.clipboard.write([t])})}function v(n){return c(this,void 0,void 0,function*(){const e=yield g(n);if(p(e)){const t=yield w(e);return yield l(t),e}else if(y(e))return yield l(e),e;throw new Error("Cannot copy this type of image to clipboard")})}function B(){var n;return c(this,void 0,void 0,function*(){if(!(!((n=navigator==null?void 0:navigator.permissions)===null||n===void 0)&&n.query))return!1;const{state:e}=yield navigator.permissions.query({name:"clipboard-write"});return e==="granted"})}export{v as c,B as r};
