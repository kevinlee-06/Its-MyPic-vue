function l(e,d,t,r){function f(i){return i instanceof t?i:new t(function(u){u(i)})}return new(t||(t=Promise))(function(i,u){function c(n){try{a(r.next(n))}catch(o){u(o)}}function s(n){try{a(r.throw(n))}catch(o){u(o)}}function a(n){n.done?i(n.value):f(n.value).then(c,s)}a((r=r.apply(e,[])).next())})}function p(){var e;return l(this,void 0,void 0,function*(){if(!(!((e=navigator==null?void 0:navigator.permissions)===null||e===void 0)&&e.query))return!1;const{state:d}=yield navigator.permissions.query({name:"clipboard-write"});return d==="granted"})}export{p as r};
