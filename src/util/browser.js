export const resize =({sizes,camera,renderer})=> window.addEventListener('resize',()=>{
   sizes.width = window.innerWidth // 800
   sizes.height = window.innerHeight // 600
   camera.aspect = sizes.width/sizes.height
   camera.updateProjectionMatrix()
   renderer.setSize(sizes.width,sizes.height)
})
   
export const getFullScreen =(canvas)=> window.addEventListener('dblclick',()=>{
   const fullScreen = document.fullscreenElement ||document.webkitFullscreenElement
   if(!fullScreen) canvas.requestFullscreen()
   else canvas.webkitExitFullscreen()
})