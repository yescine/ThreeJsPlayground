import * as THREE from 'three'
import gasp from 'gsap'

const loadingBar = document.querySelector('.loading-bar')

export const loadingManager = new THREE.LoadingManager(
   ()=>{},
   (url,item,total)=>{
      gasp.delayedCall(0.25,
         ()=>{
         const progressRatio = item/total
         loadingBar.style.transform = `scale(${progressRatio},1)`
         if(progressRatio ===1)loadingBar.style.height='1px'
      })
   }
)