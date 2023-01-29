let button = document.querySelector('.btn')
let optionList = document.querySelector('select')
let textArea = document.querySelector('textarea')
// console.log(textArea)
let isSpeaking = true;
let synth = speechSynthesis
function voices(){
  for(let voice of synth.getVoices() ){
    // console.log(voice)
    let selected = voice.name === "Google US English"? "selected" : ""
    let option = ` <option value="${voice.name}" ${selected}>${voice.name} ${voice.lang}</option>`
    optionList.insertAdjacentHTML('beforeend',option)
  }
}
synth.addEventListener('voiceschanged',voices)
function textToSpeech(text){
  let speak = new SpeechSynthesisUtterance(text)
  for(let voice of synth.getVoices() ){
    if (voice.name === optionList.value){
      speak.voice = voice
    }
  }
  synth.speak(speak)

}
button.addEventListener('click',()=>{
  if(textArea.value !== ""){
    if(!synth.speaking){
    textToSpeech(textArea.value)
    }
    if(textArea.value.length > 80){   
    if(isSpeaking){
      synth.resume();
      isSpeaking = false
      button.innerText = `Paused Speech`
    }else{
      synth.pause();
      isSpeaking = true
      button.innerText = `Resume Speech`
    }
      setInterval(()=>{
        if(!synth.speaking && !isSpeaking){
          isSpeaking = true
          button.innerText = `Convert Text Into Speech `
        }
      })
    }else{
        button.innerText = `Convert Text Into Speech `
    }
  }
})