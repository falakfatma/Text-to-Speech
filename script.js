let button = document.querySelector('.btn')
let optionList = document.querySelector('#optionList')
let textArea = document.querySelector('textarea')
console.log(textArea)
let isSpeaking = true;
let synth = speechSynthesis
voices();
function voices(){
  for(let voice of synth.getVoices() ){
    // console.log(voice)
    let selected = voice.name === "Google US English"? "selected" : "";
    let option = ` <option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
    optionList.insertAdjacentHTML('beforeend',option)
  }
}
synth.addEventListener('voiceschanged',voices)
function textToSpeech(text){
  let speak = new SpeechSynthesisUtterance(text)
  for(let voice of synth.getVoices() ){
    if (voice.name === optionList.value){
      speak.voice = voice
      // console.log(voice)
    }
  }
  synth.speak(speak)

}
button.addEventListener('click',(e)=>{
  e.preventDefault()
  if(textArea.value !== ""){
    if(!synth.speaking){
      // console.log(`speeking`)
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