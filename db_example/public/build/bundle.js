var app=function(){"use strict";function t(){}const n=t=>t;function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function u(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}const s="undefined"!=typeof window;let i=s?()=>window.performance.now():()=>Date.now(),l=s?t=>requestAnimationFrame(t):t;const a=new Set;function d(t){a.forEach((n=>{n.c(t)||(a.delete(n),n.f())})),0!==a.size&&l(d)}function f(t,n){t.appendChild(n)}function p(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n.host?n:document}function h(t){const n=g("style");return function(t,n){f(t.head||t,n)}(p(t),n),n}function m(t,n,e){t.insertBefore(n,e||null)}function $(t){t.parentNode.removeChild(t)}function g(t){return document.createElement(t)}function y(t){return document.createTextNode(t)}function _(){return y(" ")}function b(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function v(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function x(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function w(t,n){t.value=null==n?"":n}const k=new Set;let E,C=0;function j(t,n,e,o,r,u,c,s=0){const i=16.666/o;let l="{\n";for(let t=0;t<=1;t+=i){const o=n+(e-n)*u(t);l+=100*t+`%{${c(o,1-o)}}\n`}const a=l+`100% {${c(e,1-e)}}\n}`,d=`__svelte_${function(t){let n=5381,e=t.length;for(;e--;)n=(n<<5)-n^t.charCodeAt(e);return n>>>0}(a)}_${s}`,f=p(t);k.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=h(t).sheet),$=f.__svelte_rules||(f.__svelte_rules={});$[d]||($[d]=!0,m.insertRule(`@keyframes ${d} ${a}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${d} ${o}ms linear ${r}ms 1 both`,C+=1,d}function A(t,n){const e=(t.style.animation||"").split(", "),o=e.filter(n?t=>t.indexOf(n)<0:t=>-1===t.indexOf("__svelte")),r=e.length-o.length;r&&(t.style.animation=o.join(", "),C-=r,C||l((()=>{C||(k.forEach((t=>{const n=t.__svelte_stylesheet;let e=n.cssRules.length;for(;e--;)n.deleteRule(e);t.__svelte_rules={}})),k.clear())})))}function N(t){E=t}const O=[],S=[],R=[],P=[],T=Promise.resolve();let L=!1;function q(t){R.push(t)}let z=!1;const D=new Set;function F(){if(!z){z=!0;do{for(let t=0;t<O.length;t+=1){const n=O[t];N(n),M(n.$$)}for(N(null),O.length=0;S.length;)S.pop()();for(let t=0;t<R.length;t+=1){const n=R[t];D.has(n)||(D.add(n),n())}R.length=0}while(O.length);for(;P.length;)P.pop()();L=!1,z=!1,D.clear()}}function M(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}let U;function B(t,n,e){t.dispatchEvent(function(t,n,e=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e,!1,n),o}(`${n?"intro":"outro"}${e}`))}const G=new Set;let J;function K(){J={r:0,c:[],p:J}}function V(){J.r||r(J.c),J=J.p}function W(t,n){t&&t.i&&(G.delete(t),t.i(n))}function H(t,n,e,o){if(t&&t.o){if(G.has(t))return;G.add(t),J.c.push((()=>{G.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}const I={duration:0};function Q(e,o,c,s){let f=o(e,c),p=s?0:1,h=null,m=null,$=null;function g(){$&&A(e,$)}function y(t,n){const e=t.b-p;return n*=Math.abs(e),{a:p,b:t.b,d:e,duration:n,start:t.start,end:t.start+n,group:t.group}}function _(o){const{delay:u=0,duration:c=300,easing:s=n,tick:_=t,css:b}=f||I,v={start:i()+u,b:o};o||(v.group=J,J.r+=1),h||m?m=v:(b&&(g(),$=j(e,p,o,c,u,s,b)),o&&_(0,1),h=y(v,c),q((()=>B(e,o,"start"))),function(t){let n;0===a.size&&l(d),new Promise((e=>{a.add(n={c:t,f:e})}))}((t=>{if(m&&t>m.start&&(h=y(m,c),m=null,B(e,h.b,"start"),b&&(g(),$=j(e,p,h.b,h.duration,0,s,f.css))),h)if(t>=h.end)_(p=h.b,1-p),B(e,h.b,"end"),m||(h.b?g():--h.group.r||r(h.group.c)),h=null;else if(t>=h.start){const n=t-h.start;p=h.a+h.d*s(n/h.duration),_(p,1-p)}return!(!h&&!m)})))}return{run(t){u(f)?(U||(U=Promise.resolve(),U.then((()=>{U=null}))),U).then((()=>{f=f(),_(t)})):_(t)},end(){g(),h=m=null}}}function X(t,n){-1===t.$$.dirty[0]&&(O.push(t),L||(L=!0,T.then(F)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Y(n,c,s,i,l,a,d,f=[-1]){const p=E;N(n);const h=n.$$={fragment:null,ctx:null,props:a,update:t,not_equal:l,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(p?p.$$.context:c.context||[]),callbacks:o(),dirty:f,skip_bound:!1,root:c.target||p.$$.root};d&&d(h.root);let m=!1;if(h.ctx=s?s(n,c.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return h.ctx&&l(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),m&&X(n,t)),e})):[],h.update(),m=!0,r(h.before_update),h.fragment=!!i&&i(h.ctx),c.target){if(c.hydrate){const t=function(t){return Array.from(t.childNodes)}(c.target);h.fragment&&h.fragment.l(t),t.forEach($)}else h.fragment&&h.fragment.c();c.intro&&W(n.$$.fragment),function(t,n,o,c){const{fragment:s,on_mount:i,on_destroy:l,after_update:a}=t.$$;s&&s.m(n,o),c||q((()=>{const n=i.map(e).filter(u);l?l.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(q)}(n,c.target,c.anchor,c.customElement),F()}N(p)}function Z(t,{delay:e=0,duration:o=400,easing:r=n}={}){const u=+getComputedStyle(t).opacity;return{delay:e,duration:o,easing:r,css:t=>"opacity: "+t*u}}function tt(t){let n,e,o,u,c;return{c(){n=g("input"),e=_(),o=g("input"),v(n,"type","text"),v(n,"placeholder","Username"),v(o,"type","password"),v(o,"placeholder","Password")},m(r,s){m(r,n,s),w(n,t[1]),m(r,e,s),m(r,o,s),w(o,t[2]),u||(c=[b(n,"input",t[6]),b(o,"input",t[7])],u=!0)},p(t,e){2&e&&n.value!==t[1]&&w(n,t[1]),4&e&&o.value!==t[2]&&w(o,t[2])},d(t){t&&$(n),t&&$(e),t&&$(o),u=!1,r(c)}}}function nt(n){let e,o,r;return{c(){e=g("p"),e.textContent="Gör ett försök"},m(t,n){m(t,e,n),r=!0},p:t,i(t){r||(q((()=>{o||(o=Q(e,Z,{},!0)),o.run(1)})),r=!0)},o(t){o||(o=Q(e,Z,{},!1)),o.run(0),r=!1},d(t){t&&$(e),t&&o&&o.end()}}}function et(t){let n,e,o,r;const u=[rt,ot],c=[];function s(t,n){return"admin"==t[1]?0:1}return n=s(t),e=c[n]=u[n](t),{c(){e.c(),o=y("")},m(t,e){c[n].m(t,e),m(t,o,e),r=!0},p(t,r){let i=n;n=s(t),n===i?c[n].p(t,r):(K(),H(c[i],1,1,(()=>{c[i]=null})),V(),e=c[n],e?e.p(t,r):(e=c[n]=u[n](t),e.c()),W(e,1),e.m(o.parentNode,o))},i(t){r||(W(e),r=!0)},o(t){H(e),r=!1},d(t){c[n].d(t),t&&$(o)}}}function ot(t){let n,e,o,r,u;return{c(){n=g("p"),e=y("Välkommen "),o=y(t[1])},m(t,r){m(t,n,r),f(n,e),f(n,o),u=!0},p(t,n){(!u||2&n)&&x(o,t[1])},i(t){u||(q((()=>{r||(r=Q(n,Z,{},!0)),r.run(1)})),u=!0)},o(t){r||(r=Q(n,Z,{},!1)),r.run(0),u=!1},d(t){t&&$(n),t&&r&&r.end()}}}function rt(n){let e,o,r;return{c(){e=g("p"),e.textContent="Whoa du hackade admin"},m(t,n){m(t,e,n),r=!0},p:t,i(t){r||(q((()=>{o||(o=Q(e,Z,{},!0)),o.run(1)})),r=!0)},o(t){o||(o=Q(e,Z,{},!1)),o.run(0),r=!1},d(t){t&&$(e),t&&o&&o.end()}}}function ut(t){let n,e,o,r,u,c,s,i,l,a,d,p,h=!t[4]&&tt(t);const w=[et,nt],k=[];function E(t,n){return t[3]?0:1}return i=E(t),l=k[i]=w[i](t),{c(){n=g("main"),e=g("h1"),o=y(t[0]),r=_(),h&&h.c(),u=_(),c=g("button"),c.textContent="Login",s=_(),l.c(),v(e,"class","svelte-1tky8bj"),v(c,"text",""),v(n,"class","svelte-1tky8bj")},m(l,$){m(l,n,$),f(n,e),f(e,o),f(n,r),h&&h.m(n,null),f(n,u),f(n,c),f(n,s),k[i].m(n,null),a=!0,d||(p=b(c,"click",t[8]),d=!0)},p(t,[e]){(!a||1&e)&&x(o,t[0]),t[4]?h&&(h.d(1),h=null):h?h.p(t,e):(h=tt(t),h.c(),h.m(n,u));let r=i;i=E(t),i===r?k[i].p(t,e):(K(),H(k[r],1,1,(()=>{k[r]=null})),V(),l=k[i],l?l.p(t,e):(l=k[i]=w[i](t),l.c()),W(l,1),l.m(n,null))},i(t){a||(W(l),a=!0)},o(t){H(l),a=!1},d(t){t&&$(n),h&&h.d(),k[i].d(),d=!1,p()}}}function ct(t,n,e){let{name:o}=n,r="Admin",u="",c=!1,s=!1;async function i(){e(4,s=!0);try{fetch("http://localhost:3000/authenticate",{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8"},body:JSON.stringify({username:r,password:u})}).then((t=>t.json())).then((t=>{if(!t)throw null;console.log(t),t.authenticated?e(3,c=!0):e(3,c=!1),e(4,s=!1)})).catch((t=>{console.log(t),e(4,s=!1)}))}catch(t){console.log(t),e(4,s=!1)}}return t.$$set=t=>{"name"in t&&e(0,o=t.name)},t.$$.update=()=>{6&t.$$.dirty&&e(3,c=!1)},[o,r,u,c,s,i,function(){r=this.value,e(1,r)},function(){u=this.value,e(2,u)},()=>i()]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),Y(this,t,ct,ut,c,{name:0})}}({target:document.body,props:{name:"Kan du hacka mig nu då?"}})}();
//# sourceMappingURL=bundle.js.map
