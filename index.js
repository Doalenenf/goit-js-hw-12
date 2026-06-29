import{a as F,S as E,i as c}from"./assets/vendor-CucEYOFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const w="56498737-33d961619fd960a0fb32ba01a",S="https://pixabay.com/api/";async function g(e,r=1){return(await F.get(S,{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}const q=new E(".gallery a",{captionsData:"alt",captionDelay:250});function P({webformatURL:e,largeImageURL:r,tags:i,likes:n,views:t,comments:o,downloads:a}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img class="gallery-image" src="${e}" alt="${i}" />
      </a>
      <div class="info-box">
        <div class="info-item">
          <b>Likes</b>
          <span>${n}</span>
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
          <span>${a}</span>
        </div>
      </div>
    </li>
  `}function h(e){const r=document.querySelector("#gallery");if(!r)return;const i=e.map(P).join("");r.insertAdjacentHTML("beforeend",i),q.refresh()}function M(){const e=document.querySelector("#gallery");e&&(e.innerHTML="")}function y(){const e=document.querySelector("#loader");e&&e.classList.add("is-active")}function p(){const e=document.querySelector("#loader");e&&e.classList.remove("is-active")}function b(){const e=document.querySelector("#load-more-btn");e&&e.classList.add("is-active")}function l(){const e=document.querySelector("#load-more-btn");e&&e.classList.remove("is-active")}const u=document.querySelector("#search-form"),f=document.querySelector("#load-more-btn"),d=document.querySelector("#end-message");let m="",s=1;const v=15;u&&u.addEventListener("submit",x);f&&f.addEventListener("click",A);function C(){d&&d.classList.add("is-hidden")}function L(){d&&d.classList.remove("is-hidden")}async function x(e){e.preventDefault();const i=e.currentTarget.elements["search-text"].value.trim();if(i===""){c.warning({title:"Caution",message:"Please enter a search query.",position:"topRight"});return}m=i,s=1,M(),l(),C(),y();try{const n=await g(m,s);if(!n||!n.hits||n.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#EF5350",messageColor:"#FFFFFF",iconColor:"#FFFFFF",closeColor:"#FFFFFF",maxWidth:432});return}h(n.hits),u.reset(),s*v>=n.totalHits?(l(),L()):b()}catch(n){console.error("API Error:",n),c.error({title:"Error",message:"Something went wrong while fetching images. Please try again!",position:"topRight"})}finally{p()}}async function A(){s+=1,l(),y();try{const e=await g(m,s);h(e.hits);const r=document.querySelector(".gallery-item");if(r){const i=r.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}s*v>=e.totalHits?(l(),L()):b()}catch(e){console.error("API Error:",e),c.error({title:"Error",message:"Something went wrong while fetching more images. Please try again!",position:"topRight"})}finally{p()}}
//# sourceMappingURL=index.js.map
