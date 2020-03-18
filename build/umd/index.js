!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n=n||self).jsutils={})}(this,(function(n){"use strict";var t=function(n){return Array.isArray(n)};function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function e(n,t,r){return t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}function o(n,t){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.push.apply(r,e)}return r}function u(n){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){e(n,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(r,t))}))}return n}function i(n,t){return(i=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n})(n,t)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(n){return!1}}function a(n,t,r){return(a=c()?Reflect.construct:function(n,t,r){var e=[null];e.push.apply(e,t);var o=new(Function.bind.apply(n,e));return r&&i(o,r.prototype),o}).apply(null,arguments)}function f(n,t){return s(n)||function(n,t){if(!(Symbol.iterator in Object(n))&&"[object Arguments]"!==Object.prototype.toString.call(n))return;var r=[],e=!0,o=!1,u=void 0;try{for(var i,c=n[Symbol.iterator]();!(e=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);e=!0);}catch(n){o=!0,u=n}finally{try{e||null==c.return||c.return()}finally{if(o)throw u}}return r}(n,t)||y()}function l(n){return function(n){if(Array.isArray(n)){for(var t=0,r=new Array(n.length);t<n.length;t++)r[t]=n[t];return r}}(n)||p(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function s(n){if(Array.isArray(n))return n}function p(n){if(Symbol.iterator in Object(n)||"[object Arguments]"===Object.prototype.toString.call(n))return Array.from(n)}function y(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var d=function(n){return"object"===r(n)&&!Array.isArray(n)&&null!==n},v=function(n){return"number"==typeof n&&n!=n},g=function(n){return"number"==typeof n&&!v(n)},m=function(n){return g(n)&&n>=0},h={SHOULD_LOG:!0,SHOULD_THROW:!1,LOG_PREFIX:null},O=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=r.logs,o=void 0===e?h.SHOULD_LOG:e,u=r.throws,i=void 0===u?h.SHOULD_THROW:u,c=r.prefix,a=void 0===c?h.LOG_PREFIX:c,l=Object.entries(n),s=function(){return!0},p=l.map((function(n){var r=f(n,2),e=r[0],o=r[1];return j(e,o,t[e]||t.$default||s)})),y=function(n,t){return w(n,t,{logs:o,throws:i,prefix:a})},d=p.reduce(y,{success:!0,cases:{}}),v=d.success,g=d.cases;return[v,g]};O.setOptions=function(n){var t=n.logs,r=n.throws,e=n.prefix;void 0!==t&&(h.SHOULD_LOG=t),void 0!==r&&(h.SHOULD_THROW=r),void 0!==e&&(h.LOG_PREFIX=e)},O.resetOptions=function(){h.SHOULD_LOG=!0,h.SHOULD_THROW=!1,h.LOG_PREFIX=null};var b,j=function(n,t,r){var e=r(t),o=!r.name||r.name===n||"$default"===r.name?r.toString():r.name;return{success:e,key:n,value:t,validator:r,reason:e?null:['Argument "'.concat(n,'" with value '),t," failed validator: ".concat(o,".")]}},w=function(n,t,r){var o=r.logs,i=r.throws,c=r.prefix;return!t.success&&S(t,o,i,c),{success:n.success&&t.success,cases:u({},n.cases,e({},t.key,t))}},S=function(n,t,r,e){var o,u=e?[e].concat(l(n.reason)):n.reason;if(r)throw new Error(u.join());t&&(o=console).error.apply(o,l(u))},A=function(n){return"function"==typeof n},_=function(n){return"boolean"==typeof n},P=function(n){return"false"===n||"true"===n},C=function(n){return"string"==typeof n},F=function(n){return null==n?"":C(n)?n:JSON.stringify(n)},E=function(n){return _(n)?F(n):n&&"false"!==n&&"0"!==n?"true":"false"},x=function(n){return Boolean(n||""===n||0===n)},I=function(n){return P(n)?"true"===n:"true"===E(n)},L=function(n){return"object"===r(n)&&null!==n},D=function(n,e,o,u){var i=n;if(!L(n)||!n||!e)return"set"!==o&&u||void 0;for(var c,a,f=t(e)?Array.from(e):e.split("."),l=f.pop(),s=function(){var t=n[c];if(L(t)||A(t)||("set"===o?n[c]={}:a=!0),n=t,a)return{v:u}};c=f.shift();){var p=s();if("object"===r(p))return p.v}return"get"===o?l in n?n[l]:u:"unset"===o?delete n[l]:(n[l]=u)&&i||i},R=function(n,t,r){return D(n,t,"get",r)},T=function(n,t,r){return D(n,t,"set",r)},N=function(n){var t=n,r=function(){for(var n=arguments.length,r=new Array(n),e=0;e<n;e++)r[e]=arguments[e];return a(t,r)},e=function e(){for(var o=arguments.length,u=new Array(o),i=0;i<o;i++)u[i]=arguments[i];return n instanceof e?r.apply(null,u):t.apply(n,u)};for(var o in n)n.hasOwnProperty(o)&&(e[o]=n[o]);return Object.defineProperty(e,"name",{value:n.name,configurable:!0}),e.toString=function(){return n.toString()},e},U=function n(r){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new WeakMap;if(Object(r)!==r)return r;if(r instanceof Set)return new Set(r);if(o.has(r))return o.get(r);if(t(r))return r.map((function(t){return n(t)}));if(A(r))return N(r);var u=r instanceof Date?new Date(r):r instanceof RegExp?new RegExp(r.source,r.flags):r.constructor?null:Object.create(null);return null===u?k(r):(o.set(r,u),r instanceof Map?Array.from(r,(function(t){var r=f(t,2),e=r[0],i=r[1];return u.set(e,n(i,o))})):Object.assign.apply(Object,[u].concat(l(Object.keys(r).map((function(t){return e({},t,n(r[t],o))}))))))},k=function(n){if(!n)return n;for(var t=Object.getPrototypeOf(n),r=Object.getOwnPropertyDescriptors(n),e=0,o=Object.entries(r);e<o.length;e++){var u=f(o[e],2),i=u[0],c=u[1];r[i].value=U(c.value)}var a=Object.create(t,r);return Object.isFrozen(n)&&Object.freeze(a),Object.isSealed(n)&&Object.seal(a),a},z=function(n){return F(n).replace(/([^.\d])/gm,"")},H=function(n){return g(n)?n:n&&!v(n)&&Number(z(n))||0},J=function(n){return n&&C(n)?P(n)?I(n):g(n)?H(n):function(){try{return JSON.parse(n)}catch(t){return n}}():n},M=function(n){return Object.prototype.toString.call(n).slice(8,-1)},B="dir",G="type",$=["error","info","log","dir","warn"],q=function(){for(var n,t,r=arguments.length,e=new Array(r),o=0;o<r;o++)e[o]=arguments[o];if(e.length){var u=1===e.length?B:e.pop();(b||"error"===u)&&("string"==typeof e[0]&&("type"===G?e[0]="[ ".concat(u.toUpperCase()," ] ").concat(e[0]):G&&(e[0]="".concat(G," ").concat(e[0]))),-1!==$.indexOf(u)?(n=console)[u].apply(n,e):(t=console)[B].apply(t,e.concat([u])))}},W=function(n,e){if(t(e)){var o=s(c=e)||p(c)||y(),u=o[0],i=o.slice(1);return u.apply(void 0,[n].concat(l(i)))}return A(e)?e(n):(console.error("Pipeline expected either a function or an array (for function expressions). Found ".concat(r(e))),n);var c},X=function(n){for(var t=arguments.length,r=new Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];return r.reduce((function(n,t){return W(n,t)}),n)},K=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},V=function(n){for(var r=arguments.length,e=new Array(r>1?r-1:0),o=1;o<r;o++)e[o-1]=arguments[o];if(!e.length)return null;for(var u=0,i=e;u<i.length;u++){var c=i[u];if(!t(c)){console.error("Matching case must be an entry (a 2-element array). Found: ".concat(M(c)),c);break}var a=f(c,2),l=a[0],s=a[1];if(A(l)&&l(n))return s;if(l===n)return s}return null};V.default=function(){return!0};var Q=function(n){return t(n)&&2===n.length&&(g(n[0])||C(n[0]))},Z=function(n,e){if(!t(n)&&!d(n))return console.error(n,"Expected array or object for obj. Found ".concat(r(n))),n;if(!A(e))return console.error("Expected function for cb. Found ".concat(r(e))),n;var o=Object.entries(n),u=t(n)?[]:{};return o.reduce((function(n,t){var r=f(t,2),o=r[0],u=r[1],i=e(o,u);return Q(i)?T(n,i[0],i[1]):(console.error("Callback function must return entry. Found: ".concat(i,". Using current entry instead.")),T(n,o,u))}),u)},Y=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return d(n)&&A(t)&&Object.entries(n).reduce((function(n,r){var e=f(r,2),o=e[0],u=e[1];return t(o,u,n)}),r)||r},nn=function(n){return C(n)&&n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")||n},tn=function(n){if(!A(n))throw"Argument must be a function";return function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return new Promise((function(t,e){return A(r[r.length-1])?(r.pop(),r.push((function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return r&&r[0]?e.apply(void 0,r):t.apply(void 0,r)})),n.apply(void 0,r)):t(n.apply(void 0,r))}))}},rn=Array.from(["caller","callee","arguments","apply","bind","call","toString","__proto__","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","valueOf","toLocaleString"]).concat(Object.getOwnPropertyNames(Object.prototype)).reduce((function(n,t){return n[t]=!0,n}),{}),en=function(n){if(!n.__IS_PROMISIFIED__){var t=!0,r=!1,e=void 0;try{for(var o,u=Object.getOwnPropertyNames(n)[Symbol.iterator]();!(t=(o=u.next()).done);t=!0){var i=o.value;if(!(-1!==i.indexOf("Async")||n["".concat(i,"Async")])&&!rn[i])if(A(n[i]))n["".concat(i,"Async")]=tn(n[i]);else{var c=Object.getOwnPropertyDescriptor(n,i).get;A(c)&&(n["".concat(i,"Async")]=tn(c))}}}catch(n){r=!0,e=n}finally{try{t||null==u.return||u.return()}finally{if(r)throw e}}n.__IS_PROMISIFIED__=!0}return n},on=function(n,t){if(!C(n))return n;if(!A(t))return n;var r="",e=!0,o=!1,u=void 0;try{for(var i,c=n[Symbol.iterator]();!(e=(i=c.next()).done);e=!0){r+=t(i.value)}}catch(n){o=!0,u=n}finally{try{e||null==c.return||c.return()}finally{if(o)throw u}}return r},un=function(n){return n===n.toLowerCase()},cn=function(n){return n===n.toUpperCase()},an=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:["-","_"," "];if(!C(n))return n;var e=function(n){return r.some((function(t){return t===n}))},o="_";return on(n,(function(n){return e(n)?(o=t,t):cn(n)&&un(o)&&!e(o)?(o=n,t+n):(o=n,n)}))},fn=function(n){return C(n)&&n[0]&&"".concat(n[0].toUpperCase()).concat(n.slice(1).toLowerCase())||n},ln=function(n){var t=0===n.indexOf(".")?n.slice(1):n;return t.indexOf(".")===t.length-1?t.slice(0,-1):t},sn=function(n){return n&&ln(n).replace(/[-_]/gm," ")||n},pn=function(n,t){return n&&sn(n).split(/[\s_-]/gm).reduce((function(n,r,e){return r?n+=(e>0||t)&&fn(r)||r.toLowerCase():n}),"")||n};n.applyToCloneOf=function(n,t){var r;if(n||(r="object (Argument 1) in applyToCloneOf, must be defined!"),d(n)||(r="object (Argument 1) in applyToCloneOf, must be an object!"),t||(r="mutator (Argument 2) in applyToCloneOf, must be defined!"),A(t)||(r="mutator (Argument 2) arg in applyToCloneOf, must be a function!"),r)return console.warn(r)||n;var e=U(n);return t(e),e},n.applyToFunc=W,n.buildPath=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];var e=t.reduce((function(n,t){var r=toStr(t);return"".concat(n).concat(r&&"/"+r||"")}),"");return e.replace(/([^:\/]|^)\/{2,}/g,"$1/")},n.camelCase=pn,n.capitalize=fn,n.checkCall=function(n){for(var t=arguments.length,r=new Array(t>1?t-1:0),e=1;e<t;e++)r[e-1]=arguments[e];return A(n)&&n.apply(void 0,r)||void 0},n.cleanStr=sn,n.clearObj=function n(t,e){t&&Object.entries(t).map((function(o){var u=f(o,2),i=u[0],c=u[1];e&&-1!==e.indexOf(i)||("object"===r(c)&&n(c),t[i]=void 0,delete t[i])}))},n.cloneArr=function(n){return Array.from(l(t(n)&&n||d(n)&&Object.entries(n)||[]))},n.cloneFunc=N,n.cloneJson=function(n){try{return JSON.parse(JSON.stringify(n))}catch(n){return q(n.message,"error"),null}},n.cloneObjWithPrototypeAndProperties=k,n.containsStr=function(n,t,r){return n=!C(n)&&F(n)||n,t=!C(t)&&F(t)||t,-1!==n.indexOf(t,r)},n.convertToStrBool=E,n.debounce=function(n){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250,e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];function o(){for(var o=arguments.length,u=new Array(o),i=0;i<o;i++)u[i]=arguments[i];if(!A(n))return null;var c=this,a=function(){t=null,!e&&n.apply(c,u)},f=e&&!t;return clearTimeout(t),t=setTimeout(a,r),f?A(n)&&n.apply(c,u):void 0}return o},n.deepClone=U,n.deepFreeze=function n(t){return Object.freeze(t),Object.getOwnPropertyNames(t).map((function(e){t.hasOwnProperty(e)&&null!==t[e]&&("object"===r(t[e])||A(t[e]))&&!Object.isFrozen(t[e])&&n(t[e])})),t},n.deepMerge=function n(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.reduce((function(r,o){return t(o)?[].concat(l(t(r)&&r||[]),l(U(o))):d(o)?Object.entries(o).reduce((function(t,r){var o=f(r,2),i=o[0],c=o[1];return u({},t,e({},i,L(c)&&i in t?n(t[i],U(c)):U(c)))}),r):r}),t(o[0])&&[]||{})},n.delimitString=an,n.doIt=function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];var e=t.slice(),o=e.shift(),u=e.shift(),i=e.pop();if(!g(o)||!A(i))return[];for(var c=new Array(o),a=[],f=0;f<c.length;f++){var s=i.call.apply(i,[u,f].concat(l(e)));if(!1===s)break;a.push(s)}return a},n.either=function(n,t,r){return A(r)?r(n,t)&&n||t:x(n)&&n||t},n.eitherFunc=function(n,t){return A(n)&&n||t},n.eitherObj=function(n,t){return d(n)&&n||t},n.eitherStr=function(n,t){return C(n)&&n||t},n.equalsNaN=v,n.everyEntry=function(n,t){return n?d(n)?A(t)?X(n,Object.entries,(function(n){return n.every((function(n){var r=f(n,2),e=r[0],o=r[1];return t(e,o)}))})):(console.error("Argument 'predicate' passed into everyEntry must a function. Found: ".concat(t)),!1):(console.error("Argument obj ".concat(n," must be an object.")),!1):(console.error("everyEntry expects argument obj [".concat(n,"] to be defined.")),!1)},n.filterObj=function(n,t){return n?d(n)?A(t)?Y(n,(function(n,r,e){return t(n,r)&&(e[n]=r),e}),{}):(console.error("Argument 'predicate' passed into filterObject must a function. Found: ".concat(t)),n):(console.error("Object ".concat(n," was not an object. It must be for filterObject")),n):n},n.flatMap=function(n,r){return f(O({arr:n,mapFn:r},{arr:t,mapFn:A}),1)[0]?n.reduce((function(n,e){var o=r(e);return t(o)?o.map((function(t){return n.push(t)})):n.push(o),n}),[]):n},n.get=R,n.getNums=z,n.hasOwn=K,n.isArr=t,n.isBool=_,n.isColl=L,n.isEmail=function(n){if(!n||!C(n))return!1;return Boolean(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(n))},n.isEmpty=function(n){return d(n)?0===Object.keys(n).length:t(n)?0===n.length:C(n)?0===n.trim().length:!!g(n)&&n<1},n.isEmptyColl=function(n){return t(n)?0===n.length:L(n)&&0===Object.getOwnPropertyNames(n).length},n.isEntry=Q,n.isFloat=function(n){return g(n)&&n%1!=0},n.isFunc=A,n.isInt=function(n){return g(n)&&n%1==0},n.isLowerCase=un,n.isNonNegative=m,n.isNum=g,n.isObj=d,n.isPhone=function(n){if(!n||!C(n))return!1;return Boolean(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(n))&&n.replace(/\D/g,"").length<11},n.isSame=function(n,t){return n===t?0!==n||1/n==1/t:n!=n&&t!=t},n.isStr=C,n.isStrBool=P,n.isUpperCase=cn,n.isUrl=function(n){return Boolean(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(n))},n.isUuid=function(n){if(!n||!C(n))return!1;return Boolean(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(n))},n.isValidDate=function(n){return!isNaN((n instanceof Date&&n||new Date(n)).getTime())},n.isValidUrl=function(n){return/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(n)},n.jsonEqual=function(n,t){try{return JSON.stringify(n)===JSON.stringify(t)}catch(n){return!1}},n.keyMap=function(n,r){return t(n)&&n.reduce((function(n,t){if(!C(t))return n;var e=r&&t.toUpperCase()||t;return n[e]=e,n}),{})||{}},n.limbo=function(n){return n&&A(n.then)?n.then((function(n){return[null,n]})).catch((function(n){return[n,void 0]})):[new Error("A promise or thenable is required as the first argument!"),null]},n.logData=q,n.mapColl=function(n,r){return A(r)&&L(n)?Object.keys(n).map((function(t){return r(t,n[t],n)})):t(n)?[]:{}},n.mapEntries=Z,n.mapKeys=function(n,t){return d(n)&&A(t)?Z(n,(function(n,r){return[t(n),r]})):n},n.mapObj=function(n,t){return d(n)&&A(t)&&Object.entries(n).map((function(n){var r=f(n,2),e=r[0],o=r[1];return t(e,o)}))||n},n.mapString=on,n.match=V,n.memorize=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(!A(n)||t&&!A(t))return console.error("Error: Expected a function",n,t);var o=function(){var u=o.cache,i=t?t.apply(this,arguments):arguments[0];if(K(u,i))return u[i];var c=n.apply(this,arguments);return g(r)&&Object.keys(u).length<r?u[i]=c:o.cache=e({},i,c),c};return o.cache={},o.destroy=function(){t=void 0,o.cache=void 0,o.destroy=void 0,o=void 0},o},n.nth=function(n){if(!g(n)){if(!(n=z(n)))return"";if(n=H(n),v(n))return""}var t=n%100;if(t>=10&&t<=20)return"th";switch(n%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},n.objToQuery=function(n){var r;return Y(n,(function(n,e,o){if(!e)return o;var u=C(e)||g(e)||_(e)?e:L(e)?t(e)?e.join(","):JSON.stringify(e):null;return u?(o=r?"".concat(o,"&").concat(encodeURIComponent(n),"=").concat(encodeURIComponent(u)):"?".concat(encodeURIComponent(n),"=").concat(encodeURIComponent(u)),r=!0,o):o}),"")},n.omitKeys=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return d(n)&&Y(n,(function(r,e,o){return-1===t.indexOf(r)&&(o[r]=n[r]),o}),{})||{}},n.omitRange=function(n,r,e){if(!f(O({arr:n,startIndex:r,count:e},{arr:t,$default:m}),1)[0])return n;var o=l(n);return o.splice(r,e),o},n.parseJSON=function(n){try{return JSON.parse(n)}catch(n){return console.error(n.message),null}},n.pickKeys=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return d(n)&&t.reduce((function(t,r){return r in n&&(t[r]=n[r]),t}),{})||{}},n.pipeline=X,n.plural=function(n){return n&&n.length&&"s"!==n[n.length-1]?n+"s":n},n.promisify=tn,n.promisifyAll=function(n){if(!d(n))return n;en(n);var t=Object.getPrototypeOf(n);return t&&null!==Object.getPrototypeOf(t)&&en(t),n},n.queryToObj=function(n){var r={},e=n.split("?"),o=e[e.length-1];if(!o)return r;var u=o.split("&");return u.length&&u.map((function(n){var e=n.split("=");if(e.length<=1)return r;var o=[e.shift(),e.join("=")];if(2===o.length){var u=decodeURIComponent(o[1]).split(",");if(u&&u.length>1)r[o[0]]=u;else if(o[0]in r){var i=r[o[0]];r[o[0]]=t(i)?i.push(decodeURIComponent(o[1])):[i,decodeURIComponent(o[1])]}else r[o[0]]=decodeURIComponent(o[1])}})),r},n.randomArr=function(n,r){if(!t(n))return n;for(var e=r||1,o=[],u=0;u<e;u++)o.push(n[Math.floor(Math.random()*n.length)]);return r?o:o[0]},n.randomizeArr=function(n){return!t(n)&&n||n.sort((function(){return.5-Math.random()}))},n.reduceColl=function(n,r,e){return A(r)&&L(n)?Object.keys(n).reduce((function(t,e){return r(e,n[e],n,t)}),e):t(n)?[]:{}},n.reduceObj=Y,n.removeDot=ln,n.repeat=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(!t||t<=0)return[];if(!g(t))return console.error("Times argument must be a number"),[];for(var e=[],o=0;o<t;o++){var u=A(n)?n():r?U(n):n;e.push(u)}return e},n.resetLogs=function(){b=void 0,B="log",G="type"},n.sanitize=nn,n.sanitizeCopy=function(n){return JSON.parse(nn(JSON.stringify(n)))},n.set=T,n.setLogs=function(n,t,r){b=n,B=t||B||"log",G=r||G||"type"},n.shallowEqual=function(n,r,e){if(e&&(t(e)||C(e))&&(n=R(n,e),r=R(r,e)),n===r)return!0;if(!(n&&L(n)&&r&&L(r)))return!1;if(Object.keys(n).length!==Object.keys(r).length)return!1;for(var o in n)if(n[o]!==r[o])return!1;return!0},n.singular=function(n){return n&&n.length&&"s"===n[n.length-1]?n.slice(0,n.length-1):n},n.snakeCase=function(n){return an(n,"_").toLowerCase()},n.softFalsy=x,n.someEntry=function(n,t){return n?d(n)?A(t)?X(n,Object.entries,(function(n){return n.some((function(n){var r=f(n,2),e=r[0],o=r[1];return t(e,o)}))})):(console.error("Argument 'predicate' passed into someEntry must a function. Found: ".concat(t)),!1):(console.error("Argument obj ".concat(n," must be an object.")),!1):(console.error("someEntry expects argument obj [".concat(n,"] to be defined.")),!1)},n.strToType=J,n.styleCase=function(n){if(!C(n))return n;var t=pn(n);return"".concat(t[0].toLowerCase()).concat(t.slice(1))},n.template=function(n,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return t=L(t)&&t||{},C(n)&&n.replace(/\${([^{]+[^}])}/g,(function(n){var e=n.substr(2,n.length-3).trim(),o=R(t,e,r);return A(o)?o(t,e,r):o}))||n},n.throttle=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,r=!1;return function(){if(!r){r=!0;for(var e=arguments.length,o=new Array(e),u=0;u<e;u++)o[u]=arguments[u];return n.apply(this,o),setTimeout((function(){r=!1}),t)}}},n.throttleLast=function(n,t){var r,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:100;return function(){for(var o=this,u=arguments.length,i=new Array(u),c=0;c<u;c++)i[c]=arguments[c];r&&clearTimeout(r),r=setTimeout((function(){n.apply(o,i),clearTimeout(r)}),e),"function"==typeof t&&t()}},n.toBool=I,n.toFloat=function(n){return n&&!v(n)&&parseFloat(g(n)&&n||z(n))||0},n.toInt=function(n){return n&&!v(n)&&parseInt(g(n)&&n||z(n))||0},n.toNum=H,n.toObj=function(n,r,e){return t(n)?Object.keys(n).reduce((function(t,r){return t[r]=n[r],t}),{}):C(str)?(r=r||"=",e=e||"&",str.split(e).reduce((function(n,t){var e=t.split(r);return n[e[0].trim()]=J(e[1].trim()),n}),{})):{}},n.toStr=F,n.trainCase=function(n){return C(n)&&n.split(/(?=[A-Z])|[\s_-]/gm).join("-").toLowerCase()||n},n.trimStringFields=function(n){return Object.entries(n).reduce((function(n,t){var r=f(t,2),e=r[0],o=r[1];return n[e]=C(o)?o.trim():o,n}),n)},n.typeOf=M,n.uniqArr=function(n){return!t(n)&&n||n.filter((function(n,t,r){return r.indexOf(n)==t}))},n.unset=function(n,t){return D(n,t,"unset")},n.uuid=function n(t){return t?(t^16*Math.random()>>t/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,n)},n.validate=O,n.wait=function(n){return new Promise((function(t,r){return setTimeout((function(){return t(!0)}),n)}))},n.wordCaps=function(n){return C(n)?sn(n).split(" ").map((function(n){return n&&fn(n)||""})).join(" "):n}}));
