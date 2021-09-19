const ws = new WebSlides()
// hljs.initHighlightingOnLoad()

const animate = document.getElementsByClassName('animate')
for (let i = 0; i < animate.length; i++) {
  let content = ''
  for (let x = 0; x < animate[i].textContent.length; x++) {
    let char = animate[i].textContent.charAt(x)
    if (char !== ' ') {
      content += `<span>${char}</span>`
    } else {
      content += `<span style="width:0.5%;height:4px">${char}</span>`
    }
  }
  animate[i].innerHTML = content
}

ws.el.addEventListener('ws:slide-change', function (slide) {
  if (slide.detail.currentSlide == 2) {
    var a = document.getElementById('social-media')
    setTimeout(() => {
      a.classList.add('animate')
      a.style.display = 'block'
    }, 1500)
  }
});
