!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7c9261ca-39c0-4137-a41c-66af430090dc",e._sentryDebugIdIdentifier="sentry-dbid-7c9261ca-39c0-4137-a41c-66af430090dc")}catch(e){}}(),(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3185],{25970:function(e){function n(e){var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}n.keys=function(){return[]},n.resolve=n,n.id=25970,e.exports=n},2636:function(){},99901:function(){},95540:function(e,n,t){Promise.resolve().then(t.t.bind(t,57849,23)),Promise.resolve().then(t.t.bind(t,95657,23)),Promise.resolve().then(t.t.bind(t,19239,23)),Promise.resolve().then(t.bind(t,30669)),Promise.resolve().then(t.bind(t,55399)),Promise.resolve().then(t.bind(t,61730)),Promise.resolve().then(t.bind(t,21279)),Promise.resolve().then(t.bind(t,93989)),Promise.resolve().then(t.bind(t,8612)),Promise.resolve().then(t.bind(t,73025)),Promise.resolve().then(t.bind(t,63068)),Promise.resolve().then(t.bind(t,13752)),Promise.resolve().then(t.bind(t,69710)),Promise.resolve().then(t.bind(t,813)),Promise.resolve().then(t.bind(t,16111)),Promise.resolve().then(t.bind(t,69323)),Promise.resolve().then(t.bind(t,29258)),Promise.resolve().then(t.bind(t,6733)),Promise.resolve().then(t.bind(t,6387)),Promise.resolve().then(t.bind(t,46592)),Promise.resolve().then(t.bind(t,19839)),Promise.resolve().then(t.bind(t,76131)),Promise.resolve().then(t.bind(t,97849)),Promise.resolve().then(t.bind(t,5418)),Promise.resolve().then(t.bind(t,28250)),Promise.resolve().then(t.bind(t,96343)),Promise.resolve().then(t.bind(t,47916)),Promise.resolve().then(t.bind(t,5504)),Promise.resolve().then(t.bind(t,56618)),Promise.resolve().then(t.bind(t,35892)),Promise.resolve().then(t.bind(t,22618)),Promise.resolve().then(t.bind(t,10091)),Promise.resolve().then(t.bind(t,32540)),Promise.resolve().then(t.bind(t,16739)),Promise.resolve().then(t.bind(t,75141)),Promise.resolve().then(t.bind(t,5582)),Promise.resolve().then(t.bind(t,71607)),Promise.resolve().then(t.bind(t,85909)),Promise.resolve().then(t.t.bind(t,47796,23)),Promise.resolve().then(t.t.bind(t,17608,23)),Promise.resolve().then(t.t.bind(t,40723,23)),Promise.resolve().then(t.t.bind(t,42613,23)),Promise.resolve().then(t.bind(t,46885)),Promise.resolve().then(t.bind(t,63680)),Promise.resolve().then(t.t.bind(t,5419,23)),Promise.resolve().then(t.bind(t,87656)),Promise.resolve().then(t.t.bind(t,89714,23)),Promise.resolve().then(t.bind(t,9320)),Promise.resolve().then(t.t.bind(t,65469,23)),Promise.resolve().then(t.t.bind(t,25327,23))},46885:function(e,n,t){"use strict";t.d(n,{default:function(){return a}});var o=t(27573),r=t(67754),i=t(33144),s=t(7653);function a(){return(0,o.jsx)(s.Suspense,{children:(0,o.jsx)(l,{})})}function l(){let e=(0,r.usePathname)(),n=(0,r.useSearchParams)(),t=(0,i.U0)();return(0,s.useEffect)(()=>{if(e&&t){let o=window.origin+e;(null==n?void 0:n.toString())&&(o="".concat(o,"?").concat(n.toString())),t.capture("$pageview",{$current_url:o})}},[e,n,t]),null}},63680:function(e,n,t){"use strict";t.d(n,{CSPostHogProvider:function(){return d}});var o=t(27573),r=t(20932),i=t(33144),s=t(7653),a=t(94976);let l=t.n(a)()({env:{doc:"The application environment",format:["test","production","development"],default:"development",env:"NODE_ENV"},stripe:{publicKey:{doc:"Stripe public key",format:String,env:"NEXT_PUBLIC_STRIPE_PUBLIC_KEY",default:"pk_test_U1kQrpzLtwujb55xQ9CVQLPZ"}},intercom:{app_id:{doc:"Intercom App Id",format:String,env:"NEXT_PUBLIC_INTERCOM_APP_ID",default:"nb5f8bpp"}},posthog:{key:{doc:"Posthog key",format:String,env:"phc_Rz9PZ5yG2hlehUd53tU58hS1JbLNe4B5c3uN6yMOvWL",default:"posthog_key"},host:{doc:"Posthog host",format:String,env:"/ingest",default:"https://example_posthog_url.com"}}}).validate({allowed:"strict"}).getProperties();function d(e){let{children:n}=e;return(0,s.useEffect)(()=>{r.ZP.init(l.posthog.key,{api_host:l.posthog.host,ui_host:"https://eu.posthog.com",person_profiles:"always",capture_pageview:!1,capture_pageleave:!0})},[]),(0,o.jsx)(i.zf,{client:r.ZP,children:n})}},87656:function(e,n,t){"use strict";t.d(n,{Header:function(){return N}});var o=t(27573),r=t(87659),i=t(67754),s=t(7653),a=t(21607),l=t(52596),d=t(19779),c=t(95657),h=t.n(c);let _=e=>"href"in e,m=e=>{let{mode:n="light",size:t="medium",label:i,icon:s,...a}=e,c="large"===t?"large":"medium",m={"aria-label":i,...a};return(m.className=(0,l.A)(h()["icon-btn"],h()["icon-btn--".concat(n)],h()["icon-btn--".concat(t)],m.className),_(m))?(0,o.jsx)(r.default,{...m,children:(0,o.jsx)(d.J,{icon:s,size:c})}):(0,o.jsx)("button",{...m,children:(0,o.jsx)(d.J,{icon:s,size:c})})};var u=t(65880),b=t(32874),f=t.n(b);let p=e=>"href"in e,v=e=>{let{label:n,icon:t,...i}=e,s={"aria-label":n,...i};return(s.className=(0,l.A)(f()["icon-btn"],s.className),p(s))?(0,o.jsx)(r.default,{...s,href:s.href,children:(0,o.jsx)(d.J,{icon:t})}):(0,o.jsx)("button",{...s,children:(0,o.jsx)(d.J,{icon:t})})};var g=t(27900),j=t.n(g);let x=e=>{let{children:n,href:t,...s}=e,a=(0,i.usePathname)(),d=!!a&&a.startsWith(t);return(0,o.jsx)(r.default,{href:t,className:(0,l.A)(j().navlink,{[j()["navlink--active"]]:d}),...s,children:n})};var P=t(49),C=t(32910),k=t(43457),H=t.n(k);function y(e){let{links:n,authLink:t,authLabel:a,content:d,mobileContent:c,emoji:h}=e,[_,m]=(0,s.useState)(!1),b=(0,i.usePathname)();return(0,s.useEffect)(()=>{m(!1)},[b]),(0,o.jsx)("header",{className:(0,l.A)(H().header,{[H()["header--open"]]:_}),children:(0,o.jsxs)(P.W,{children:[(0,o.jsxs)("section",{className:H().header__menu,children:[(0,o.jsxs)(r.default,{href:"/",className:(0,l.A)(H().brand,h&&H()["brand--withEmoji"]),"aria-label":"Codely",children:[(0,o.jsxs)("svg",{width:"140",height:"29",viewBox:"0 0 140 29",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",children:[(0,o.jsxs)("g",{className:H().brand__angleLeft,children:[(0,o.jsx)("path",{d:"M5.64838 11.2988H0V16.9472H5.64838V11.2988Z"}),(0,o.jsx)("path",{d:"M11.2968 5.65234H5.64844V11.3007H11.2968V5.65234Z"}),(0,o.jsx)("path",{d:"M11.2968 16.9473H5.64844V22.5957H11.2968V16.9473Z"}),(0,o.jsx)("path",{d:"M16.9433 0H11.2949V5.64837H16.9433V0Z"}),(0,o.jsx)("path",{d:"M16.9433 22.5938H11.2949V28.2421H16.9433V22.5938Z"})]}),(0,o.jsxs)("g",{className:"angle-right",children:[(0,o.jsx)("path",{d:"M33.8865 16.9473H39.5349V11.2989H33.8865V16.9473Z"}),(0,o.jsx)("path",{d:"M28.2384 22.5938H33.8867V16.9454H28.2384V22.5938Z"}),(0,o.jsx)("path",{d:"M28.2389 11.2988H33.8872V5.65046L28.2389 5.65046V11.2988Z"}),(0,o.jsx)("path",{d:"M28.2416 0H22.5933V5.64837H28.2416V0Z"}),(0,o.jsx)("path",{d:"M28.2416 22.5938H22.5933V28.2421H28.2416V22.5938Z"})]}),(0,o.jsxs)("g",{children:[(0,o.jsx)("path",{d:"M50.8342 14.3316C50.8342 10.8532 53.251 8.39209 56.5258 8.39209C59.0721 8.39209 61.3803 9.8147 61.7645 12.547H59.4618C59.1905 11.3724 58.1067 10.4015 56.5258 10.4015C54.533 10.4015 53.1148 12.0732 53.1148 14.3316C53.1148 16.4993 54.4245 18.1256 56.5468 18.1256C58.1056 18.1256 59.0765 17.3573 59.5049 16.1384H61.8088C61.4025 18.574 59.3477 20.135 56.5468 20.135C53.0705 20.135 50.8342 17.6507 50.8342 14.3316Z"}),(0,o.jsx)("path",{d:"M63.321 14.2641C63.321 10.8321 65.7564 8.39648 69.0774 8.39648C72.3983 8.39648 74.8813 10.8575 74.8813 14.2641C74.8813 17.6706 72.3972 20.1316 69.0774 20.1316C65.783 20.1361 63.321 17.6518 63.321 14.2641ZM72.602 14.2641C72.602 12.1418 71.1796 10.4025 69.0796 10.4025C66.9796 10.4025 65.6025 12.1418 65.6025 14.2641C65.6025 16.3675 66.9796 18.1267 69.0796 18.1267C71.1796 18.1267 72.6031 16.3653 72.6031 14.2641H72.602Z"}),(0,o.jsx)("path",{d:"M87.6449 3.875V19.909H85.7695L85.5669 18.3967H85.4086C84.844 19.1639 83.7369 20.1348 81.8405 20.1348C78.8137 20.1348 76.6006 17.8099 76.6006 14.2407C76.6006 10.6271 78.8823 8.39192 81.8405 8.39192C83.5797 8.39192 84.7532 9.18238 85.3411 9.92745V3.875H87.6449ZM85.3411 14.2407C85.3411 11.9601 84.0989 10.4013 82.1792 10.4013C80.2374 10.4013 78.9044 11.9601 78.9044 14.2407C78.9044 16.5656 80.233 18.1254 82.1792 18.1254C84.0989 18.1254 85.3411 16.5667 85.3411 14.2407V14.2407Z"}),(0,o.jsx)("path",{d:"M100.471 14.8477H92.1144C92.2251 16.857 93.4429 18.2575 95.4357 18.2575C96.8583 18.2575 97.8967 17.6708 98.2588 16.5183H100.473C99.998 18.7767 98.1016 20.1318 95.4368 20.1318C92.1842 20.1318 89.8582 17.8512 89.8582 14.3749C89.8582 10.6939 92.2749 8.39111 95.346 8.39111C98.1016 8.39111 100.518 10.22 100.518 14.1048C100.516 14.3284 100.493 14.5543 100.471 14.8477ZM92.1366 13.2214H98.2798C98.2577 11.4821 97.083 10.2632 95.3438 10.2632C93.5603 10.2632 92.3624 11.5729 92.1366 13.2214Z"}),(0,o.jsx)("path",{d:"M102.825 3.875H105.129V19.909H102.825V3.875Z"}),(0,o.jsx)("path",{d:"M107.561 24.4023V22.6631C107.953 22.7561 108.354 22.8091 108.757 22.8214C109.796 22.8214 110.722 22.3919 111.219 21.1951L111.715 19.9076H110.97L106.612 8.61523H109.005L112.348 17.5351H112.529L115.665 8.61634H118.059L113.361 21.5339C113.046 22.4605 112.233 24.6503 109.252 24.6503C108.68 24.6417 108.111 24.5583 107.561 24.4023Z"})]})]}),h&&(0,o.jsx)("span",{className:H().brand__emoji,children:(0,o.jsx)(u.default,{alt:"",role:"presentation",src:h,width:"49",height:"30",style:{maxWidth:"100%",height:"auto"}})})]}),(0,o.jsxs)("nav",{className:H().header__desktop,children:[n.map(e=>(0,o.jsx)(x,{href:e.url,children:e.label},e.url)),(0,o.jsx)("span",{className:H().header__separator}),d]}),(0,o.jsxs)("div",{className:H().header__mobile,children:[(0,o.jsx)(v,{rel:"nofollow",href:t,label:a,icon:"user"}),(0,o.jsx)(v,{onClick:()=>m(!_),label:_?"Cerrar men\xfa":"Abrir men\xfa",icon:_?"close":"menu"})]})]}),(0,o.jsxs)("section",{className:H().header__collapsible,children:[(0,o.jsx)("nav",{className:H().header__nav,children:(0,o.jsx)(C.b,{mode:"vertical",children:n.map(e=>(0,o.jsx)(r.default,{href:e.url,children:e.label},e.url))})}),c]})]})})}let w=[{name:"YouTube",icon:"youtube",href:"https://www.youtube.com/CodelyTV"},{name:"Twitch",icon:"twitch",href:"https://www.twitch.tv/CodelyTV"},{name:"Twitter",icon:"twitter",href:"https://twitter.com/CodelyTV"},{name:"LinkedIn",icon:"linkedin",href:"https://linkedin.com/company/codelytv"},{name:"TikTok",icon:"tiktok",href:"https://www.tiktok.com/@codelytv"},{name:"Instagram",icon:"instagram",href:"https://www.instagram.com/codelytv/"},{name:"GitHub",icon:"github",href:"https://github.com/CodelyTV"}];var V=t(49680),L=t.n(V);function N(){var e,n;let t=(null!==(e=(0,i.usePathname)())&&void 0!==e?e:"").split("/")[1],s={empresas:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.default,{href:"https://empresas.codely.com",rel:"nofollow",children:"Portal empresas"}),(0,o.jsx)(a.z,{rel:"nofollow",mode:"secondary",size:"small",href:"#pricing",children:"Suscr\xedbete"})]})};return(0,o.jsx)("div",{className:(0,l.A)(L().header,L()["header--".concat(t)]),children:(0,o.jsx)(y,{emoji:{empresas:"/img/emojis/empresas.png",cursos:"/img/emojis/cursos.png",blog:"/img/emojis/blog.png","tarjeta-regalo":"/img/emojis/tarjeta-regalo.png"}[t],links:[{label:"Cursos",url:"/cursos"},{label:"Empresas",url:"/empresas"},{label:"Blog",url:"/blog"},{label:"Tarjeta regalo",url:"/tarjeta-regalo"}],content:null!==(n=s[t])&&void 0!==n?n:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.default,{href:"https://pro.codely.com/auth/sign-in/",rel:"nofollow",children:"Inicia sesi\xf3n"}),(0,o.jsx)(a.z,{rel:"nofollow",mode:"secondary",size:"small",href:"#pricing",children:"Suscr\xedbete"})]}),authLabel:"Iniciar sesi\xf3n",authLink:"https://pro.codely.com/auth/sign-in/",mobileContent:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("section",{className:L().social,children:w.map(e=>(0,o.jsx)(m,{rel:"nofollow",icon:e.icon,href:e.href,label:e.name,mode:"light",size:"small"},e.name))}),(0,o.jsx)(a.z,{rel:"nofollow",mode:"primary",size:"large",href:"#pricing",children:"Suscr\xedbete"})]})})})}},9320:function(e,n,t){"use strict";t.d(n,{CookieBot:function(){return i},CookieBotDeclaration:function(){return s}});var o=t(27573),r=t(26863);function i(){return(0,o.jsx)(r.default,{id:"Cookiebot",src:"https://consent.cookiebot.com/uc.js","data-cbid":"c676d215-d6f6-4f97-b894-e90b5eda37bc","data-blockingmode":"auto"})}function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{id:"cookiebot-declaration"}),(0,o.jsx)(r.default,{id:"CookieDeclaration",src:"https://consent.cookiebot.com/c676d215-d6f6-4f97-b894-e90b5eda37bc/cd.js",async:!0,onLoad:()=>{setTimeout(()=>{let e=document.querySelector(".CookieDeclaration"),n=document.getElementById("cookiebot-declaration");e&&n&&n.appendChild(e)},1e3)}})]})}t(7653)},42613:function(){},89714:function(){},95657:function(e){e.exports={"icon-btn":"CircleIconButton_icon-btn__Shgrg","icon-btn--small":"CircleIconButton_icon-btn--small__jHfk9","icon-btn--medium":"CircleIconButton_icon-btn--medium__ITd71","icon-btn--large":"CircleIconButton_icon-btn--large__Wf4V_","icon-btn--light":"CircleIconButton_icon-btn--light__ij3If","icon-btn--dark":"CircleIconButton_icon-btn--dark__mUTx3"}},32874:function(e){e.exports={"icon-btn":"IconButton_icon-btn__7ynvy"}},19239:function(e){e.exports={link:"Link_link__lC0vf","link--primary":"Link_link--primary__gXodm","link--secondary":"Link_link--secondary__ey19l","link--tertiary":"Link_link--tertiary__j9x_l","link--inverted":"Link_link--inverted__xEY6O"}},27900:function(e){e.exports={navlink:"NavLink_navlink__x0wJe","navlink--active":"NavLink_navlink--active__hCJea"}},47796:function(e){e.exports={layout:"Layout_layout__gD1g2"}},43457:function(e){e.exports={header:"Header_header__7rPp5",header__menu:"Header_header__menu__T9eTp",header__mobile:"Header_header__mobile__rKZRO",header__desktop:"Header_header__desktop__yuk3C",header__separator:"Header_header__separator__7efXU","header__icon-btn":"Header_header__icon-btn__DkYHg",header__collapsible:"Header_header__collapsible__vAM0i","header--open":"Header_header--open__wWi0m",header__nav:"Header_header__nav__vysib",header__social:"Header_header__social__QoGsQ",brand:"Header_brand__HJ4qm",brand__emoji:"Header_brand__emoji__gxwXx",brand__angleLeft:"Header_brand__angleLeft__Lr1_R","brand--withEmoji":"Header_brand--withEmoji__DZ3dh"}},5419:function(e){e.exports={footer:"Footer_footer__bV0fn",footer__section:"Footer_footer__section__Ah8g8","footer__section--legal":"Footer_footer__section--legal__mLESJ"}},49680:function(e){e.exports={social:"Header_social__3jQpa"}}},function(e){e.O(0,[5049,3539,5294,3095,7152,7909,5658,5469,9723,7818,1293,5369,1744],function(){return e(e.s=95540)}),_N_E=e.O()}]);