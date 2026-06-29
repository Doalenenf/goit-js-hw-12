import{a as v,S as F,i as s}from"./assets/vendor-CucEYOFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const L="56498737-33d961619fd960a0fb32ba01a",w="https://pixabay.com/api/";async function f(e,r=1){return(await v.get(w,{params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const E=new F(".gallery a",{captionsData:"alt",captionDelay:250});function S({webformatURL:e,largeImageURL:r,tags:n,likes:i,views:t,comments:o,downloads:c}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${e}" alt="${n}" />
      </a>
      <div class="info-box">
        <div class="info-item">
          <b>Likes</b>
          <span>${i}</span>
        </div>
        <div class="info-item">
          <b>Views</b>
          <span>${t}</span>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <span>${o}</span>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <span>${c}</span>
        </div>
      </div>
    </li>
  `}function g(e){const r=document.querySelector("#gallery");if(!r)return;const n=e.map(S).join("");r.insertAdjacentHTML("beforeend",n),E.refresh()}function q(){const e=document.querySelector("#gallery");e&&(e.innerHTML="")}function h(){const e=document.querySelector("#loader");e&&e.classList.add("is-active")}function y(){const e=document.querySelector("#loader");e&&e.classList.remove("is-active")}function p(){const e=document.querySelector("#load-more-btn");e&&e.classList.add("is-active")}function l(){const e=document.querySelector("#load-more-btn");e&&e.classList.remove("is-active")}const u=document.querySelector("#search-form"),m=document.querySelector("#load-more-btn");let d="",a=1;const b=15;u&&u.addEventListener("submit",P);m&&m.addEventListener("click",C);async function P(e){e.preventDefault();const n=e.currentTarget.elements["search-text"].value.trim();if(n===""){s.warning({title:"Caution",message:"Please enter a search query.",position:"topRight"});return}d=n,a=1,q(),l(),h();try{const i=await f(d,a);if(!i||!i.hits||i.hits.length===0){s.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF5350",messageColor:"#FFFFFF",iconColor:"#FFFFFF",closeColor:"#FFFFFF",maxWidth:432});return}g(i.hits),u.reset(),a*b>=i.totalHits?(l(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):p()}catch(i){console.error("API Error:",i),s.error({title:"Error",message:"Something went wrong while fetching images. Please try again!",position:"topRight"})}finally{y()}}async function C(){a+=1,l(),h();try{const e=await f(d,a);g(e.hits);const r=document.querySelector(".gallery-item");if(r){const n=r.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}a*b>=e.totalHits?(l(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):p()}catch(e){console.error("API Error:",e),s.error({title:"Error",message:"Something went wrong while fetching more images. Please try again!",position:"topRight"})}finally{y()}}
//# sourceMappingURL=index.js.map
