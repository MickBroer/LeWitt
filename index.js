let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffers = [];
let currentSource = null;
let currentElement = null;  
let i = 1;
const title = ["Sol LeWitt ",
    "Sol LeWit t",
    "Sol LeWi tt",
    "Sol LeW itt",
    "Sol Le Witt",
    "Sol L eWitt",
    "Sol  LeWitt",
    "So l LeWitt",
    "S ol LeWitt",
    " Sol LeWitt",
    "S ol LeWitt",
    "So l LeWitt",
    "Sol  LeWitt",
    "Sol L eWitt",
    "Sol Le Witt",
    "Sol LeW itt",
    "Sol LeWi tt",
    "Sol LeWit t"
]
const logo = document.getElementById("jck");
const MJ = document.getElementById("MJ");
const JU = document.getElementById("JU");
const JY = document.getElementById("JY");

logo.onmouseover = function(){
  logo.style.cursor = "pointer";
}

logo.onmouseout = function(){
  logo.style.cursor = "default";
}

MJ.onmouseover = function(){
  MJ.style.cursor = "pointer";
}

MJ.onmouseout = function(){
  MJ.style.cursor = "default";

}

JU.onmouseover = function(){
  JU.style.cursor = "pointer";
}

JU.onmouseout = function(){
  JU.style.cursor = "default";

}

JY.onmouseover = function(){
  JY.style.cursor = "pointer";
}

JU.onmouseout = function(){
  JY.style.cursor = "default";

}


function redirect(link){
  window.location.href = link;
}

function loadAudioFiles() {
  const audioFiles = ['Walldrawing_391.mp3', 'Walldrawing_780.mp3', 'Walldrawing_852_853.mp3'];
  
  audioFiles.forEach((file, index) => {
    fetch(`audio/${file}`)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        audioBuffers[index] = audioBuffer;
      })
      .catch(error => console.error('Error fetching or decoding audio:', error));
  });
}

function animateTitle() {
    i >= title.length - 1 ? (i = 0) : i++,
    (document.title = title[i]),
    setTimeout("animateTitle()", 200);
    
}

function playAudio(audioIndex, element) {
    const innerShape = element.querySelector('.inner-shape');
    
    // If the same button is clicked while playing, stop the audio
    if (currentElement === element && currentSource) {
      currentSource.stop();
      currentSource = null;
      currentElement = null;
      innerShape.classList.remove('square');
      innerShape.classList.add('triangle');
      return;  // Exit the function early
    }
  
    // Reset the previous element to a triangle if a new element is clicked
    if (currentElement && currentElement !== element) {
      const previousInnerShape = currentElement.querySelector('.inner-shape');
      previousInnerShape.classList.remove('square');
      previousInnerShape.classList.add('triangle');
    }
  
    if (currentSource) {
      currentSource.stop();
    }
  
    if (audioBuffers[audioIndex]) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffers[audioIndex];
      source.loop = true;  // Loop the audio
      source.connect(audioContext.destination);
      audioContext.resume().then(() => {
        source.start();
      });
      currentSource = source;
      currentElement = element;  // Update the current element
      innerShape.classList.remove('triangle');
      innerShape.classList.add('square');
    } else {
      console.log(`Audio buffer for index ${audioIndex} is not loaded yet.`);
    }
  }
  
// Load audio files when the page loads
loadAudioFiles();
animateTitle();