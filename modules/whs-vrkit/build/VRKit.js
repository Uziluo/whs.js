!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("whs")):"function"==typeof define&&define.amd?define(["whs"],t):"object"==typeof exports?exports.VRKit=t(require("whs")):e.VRKit=t(e.WHS)}(this,function(e){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.VRControls=function(e,t){function n(e){r=e,e.length>0?i=e[0]:t&&t("VR input not available.")}var i,r,s=this,o=new THREE.Matrix4,a=null;"VRFrameData"in window&&(a=new VRFrameData),navigator.getVRDisplays&&navigator.getVRDisplays().then(n).catch(function(){console.warn("THREE.VRControls: Unable to get VR Displays")}),this.scale=1,this.standing=!1,this.userHeight=1.6,this.getVRDisplay=function(){return i},this.setVRDisplay=function(e){i=e},this.getVRDisplays=function(){return console.warn("THREE.VRControls: getVRDisplays() is being deprecated."),r},this.getStandingMatrix=function(){return o},this.update=function(){if(i){var t;i.getFrameData?(i.getFrameData(a),t=a.pose):i.getPose&&(t=i.getPose()),null!==t.orientation&&e.quaternion.fromArray(t.orientation),null!==t.position?e.position.fromArray(t.position):e.position.set(0,0,0),this.standing&&(i.stageParameters?(e.updateMatrix(),o.fromArray(i.stageParameters.sittingToStandingTransform),e.applyMatrix(o)):e.position.setY(e.position.y+this.userHeight)),e.position.multiplyScalar(s.scale)}},this.dispose=function(){i=null}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.VREffect=function(e,t){function n(e){l=e,e.length>0?a=e[0]:t&&t("HMD not available")}function i(){var t=p.isPresenting;if(p.isPresenting=void 0!==a&&a.isPresenting,p.isPresenting){var n=a.getEyeParameters("left"),i=n.renderWidth,r=n.renderHeight;t||(m=e.getPixelRatio(),g=e.getSize(),e.setPixelRatio(1),e.setSize(2*i,r,!1))}else t&&(e.setPixelRatio(m),e.setSize(g.width,g.height,y))}function r(e){var t=2/(e.leftTan+e.rightTan),n=(e.leftTan-e.rightTan)*t*.5,i=2/(e.upTan+e.downTan);return{scale:[t,i],offset:[n,(e.upTan-e.downTan)*i*.5]}}function s(e,t,n,i){t=void 0===t||t,n=void 0===n?.01:n,i=void 0===i?1e4:i;var s=t?-1:1,o=new THREE.Matrix4,a=o.elements,l=r(e);return a[0]=l.scale[0],a[1]=0,a[2]=l.offset[0]*s,a[3]=0,a[4]=0,a[5]=l.scale[1],a[6]=-l.offset[1]*s,a[7]=0,a[8]=0,a[9]=0,a[10]=i/(n-i)*-s,a[11]=i*n/(n-i),a[12]=0,a[13]=0,a[14]=s,a[15]=0,o.transpose(),o}function o(e,t,n,i){var r=Math.PI/180;return s({upTan:Math.tan(e.upDegrees*r),downTan:Math.tan(e.downDegrees*r),leftTan:Math.tan(e.leftDegrees*r),rightTan:Math.tan(e.rightDegrees*r)},t,n,i)}var a,l,u,c,f=new THREE.Vector3,d=new THREE.Vector3,h=null;"VRFrameData"in window&&(h=new VRFrameData),navigator.getVRDisplays&&navigator.getVRDisplays().then(n).catch(function(){console.warn("THREE.VREffect: Unable to get VR Displays")}),this.isPresenting=!1,this.scale=1;var p=this,g=e.getSize(),y=!1,m=e.getPixelRatio();this.getVRDisplay=function(){return a},this.setVRDisplay=function(e){a=e},this.getVRDisplays=function(){return console.warn("THREE.VREffect: getVRDisplays() is being deprecated."),l},this.setSize=function(t,n,i){if(g={width:t,height:n},y=i,p.isPresenting){var r=a.getEyeParameters("left");e.setPixelRatio(1),e.setSize(2*r.renderWidth,r.renderHeight,!1)}else e.setPixelRatio(m),e.setSize(t,n,i)};var v=e.domElement,R=[0,0,.5,1],w=[.5,0,.5,1];window.addEventListener("vrdisplaypresentchange",i,!1),this.setFullScreen=function(e){return new Promise(function(t,n){return void 0===a?void n(new Error("No VR hardware found.")):p.isPresenting===e?void t():void t(e?a.requestPresent([{source:v}]):a.exitPresent())})},this.requestPresent=function(){return this.setFullScreen(!0)},this.exitPresent=function(){return this.setFullScreen(!1)},this.requestAnimationFrame=function(e){return void 0!==a?a.requestAnimationFrame(e):window.requestAnimationFrame(e)},this.cancelAnimationFrame=function(e){void 0!==a?a.cancelAnimationFrame(e):window.cancelAnimationFrame(e)},this.submitFrame=function(){void 0!==a&&p.isPresenting&&a.submitFrame()},this.autoSubmitFrame=!0;var b=new THREE.PerspectiveCamera;b.layers.enable(1);var V=new THREE.PerspectiveCamera;V.layers.enable(2),this.render=function(t,n,i,r){if(a&&p.isPresenting){var s=t.autoUpdate;s&&(t.updateMatrixWorld(),t.autoUpdate=!1);var l=a.getEyeParameters("left"),g=a.getEyeParameters("right");f.fromArray(l.offset),d.fromArray(g.offset),Array.isArray(t)&&(console.warn("THREE.VREffect.render() no longer supports arrays. Use object.layers instead."),t=t[0]);var y,m,v=e.getSize(),x=a.getLayers();if(x.length){var E=x[0];y=null!==E.leftBounds&&4===E.leftBounds.length?E.leftBounds:R,m=null!==E.rightBounds&&4===E.rightBounds.length?E.rightBounds:w}else y=R,m=w;u={x:Math.round(v.width*y[0]),y:Math.round(v.height*y[1]),width:Math.round(v.width*y[2]),height:Math.round(v.height*y[3])},c={x:Math.round(v.width*m[0]),y:Math.round(v.height*m[1]),width:Math.round(v.width*m[2]),height:Math.round(v.height*m[3])},i?(e.setRenderTarget(i),i.scissorTest=!0):(e.setRenderTarget(null),e.setScissorTest(!0)),(e.autoClear||r)&&e.clear(),null===n.parent&&n.updateMatrixWorld(),n.matrixWorld.decompose(b.position,b.quaternion,b.scale),n.matrixWorld.decompose(V.position,V.quaternion,V.scale);var P=this.scale;return b.translateOnAxis(f,P),V.translateOnAxis(d,P),a.getFrameData?(a.depthNear=n.near,a.depthFar=n.far,a.getFrameData(h),b.projectionMatrix.elements=h.leftProjectionMatrix,V.projectionMatrix.elements=h.rightProjectionMatrix):(b.projectionMatrix=o(l.fieldOfView,!0,n.near,n.far),V.projectionMatrix=o(g.fieldOfView,!0,n.near,n.far)),i?(i.viewport.set(u.x,u.y,u.width,u.height),i.scissor.set(u.x,u.y,u.width,u.height)):(e.setViewport(u.x,u.y,u.width,u.height),e.setScissor(u.x,u.y,u.width,u.height)),e.render(t,b,i,r),i?(i.viewport.set(c.x,c.y,c.width,c.height),i.scissor.set(c.x,c.y,c.width,c.height)):(e.setViewport(c.x,c.y,c.width,c.height),e.setScissor(c.x,c.y,c.width,c.height)),e.render(t,V,i,r),i?(i.viewport.set(0,0,v.width,v.height),i.scissor.set(0,0,v.width,v.height),i.scissorTest=!1,e.setRenderTarget(null)):(e.setViewport(0,0,v.width,v.height),e.setScissorTest(!1)),s&&(t.autoUpdate=!0),void(p.autoSubmitFrame&&p.submitFrame())}e.render(t,n,i,r)},this.dispose=function(){window.removeEventListener("vrdisplaypresentchange",i,!1)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.WEBVR={isAvailable:function(){return console.warn("WEBVR: isAvailable() is being deprecated. Use .checkAvailability() instead."),void 0!==navigator.getVRDisplays},checkAvailability:function(){return new Promise(function(e,t){void 0!==navigator.getVRDisplays?navigator.getVRDisplays().then(function(n){0===n.length?t("WebVR supported, but no VRDisplays found."):e()}):t('Your browser does not support WebVR. See <a href="https://webvr.info">webvr.info</a> for assistance.')})},getVRDisplay:function(e){"getVRDisplays"in navigator&&navigator.getVRDisplays().then(function(t){e(t[0])})},getMessage:function(){console.warn("WEBVR: getMessage() is being deprecated. Use .getMessageContainer( message ) instead.");var e;if(navigator.getVRDisplays?navigator.getVRDisplays().then(function(t){0===t.length&&(e="WebVR supported, but no VRDisplays found.")}):e='Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.',void 0!==e){var t=document.createElement("div");t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.right="0",t.style.zIndex="999",t.align="center";var n=document.createElement("div");return n.style.fontFamily="sans-serif",n.style.fontSize="16px",n.style.fontStyle="normal",n.style.lineHeight="26px",n.style.backgroundColor="#fff",n.style.color="#000",n.style.padding="10px 20px",n.style.margin="50px",n.style.display="inline-block",n.innerHTML=e,t.appendChild(n),t}},getMessageContainer:function(e){var t=document.createElement("div");t.style.position="absolute",t.style.left="0",t.style.top="0",t.style.right="0",t.style.zIndex="999",t.align="center";var n=document.createElement("div");return n.style.fontFamily="sans-serif",n.style.fontSize="16px",n.style.fontStyle="normal",n.style.lineHeight="26px",n.style.backgroundColor="#fff",n.style.color="#000",n.style.padding="10px 20px",n.style.margin="50px",n.style.display="inline-block",n.innerHTML=e,t.appendChild(n),t},getButton:function(e,t){if("VREffect"in THREE&&e instanceof THREE.VREffect)return console.error("WebVR.getButton() now expects a VRDisplay."),document.createElement("button");var n=document.createElement("button");return n.style.position="absolute",n.style.left="calc(50% - 50px)",n.style.bottom="20px",n.style.width="100px",n.style.border="0",n.style.padding="8px",n.style.cursor="pointer",n.style.backgroundColor="#000",n.style.color="#fff",n.style.fontFamily="sans-serif",n.style.fontSize="13px",n.style.fontStyle="normal",n.style.textAlign="center",n.style.zIndex="999",e?(n.textContent="ENTER VR",n.onclick=function(){e.isPresenting?e.exitPresent():e.requestPresent([{source:t}])},window.addEventListener("vrdisplaypresentchange",function(){n.textContent=e.isPresenting?"EXIT VR":"ENTER VR"},!1)):n.textContent="NO VR DISPLAY",n}}},function(t,n){t.exports=e},function(e,t,n){"use strict";function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.VRControls=t.VRModule=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(3),l=n(1),u=n(0),c=n(2),f=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,e),this.params=Object.assign(t,{message:!0,button:!0}),this.scene=null,this.camera=null,this.effect=null}return o(e,[{key:"manager",value:function(e){var t=this;e.define("vr");var n=e.use("rendering"),i=e.get("renderer"),r=e.use("resize");this.effect=new l.VREffect(i),this.scene=e.get("scene"),this.camera=e.get("camera"),n.effect(this.effect),r.addCallback(function(e,n){t.effect.setSize(+e,+n)});var s=this.params,o=s.message,a=s.button;o&&c.WEBVR.checkAvailability().catch(function(e){document.body.appendChild(c.WEBVR.getMessageContainer(e))}),a&&c.WEBVR.getVRDisplay(function(e){document.body.appendChild(c.WEBVR.getButton(e,i.domElement))})}}]),e}();t.VRModule=f;t.VRControls=function(e){function t(e){var n=e.object,r=e.onError,o=e.intensity;s(this,t);var a=new u.VRControls(n.native,r);return a.standing=!0,a.scale=o,i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{controls:a}))}return r(t,e),t}(a.ControlsModule)}])});