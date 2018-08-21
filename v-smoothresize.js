import Vue from 'vue'

const checkHeightForChangeAndUpdate = (el, oldHeight, delay, transitionTime, fineTune) => {
  // Set the max amount of times to check for new height just before browser repaint.
  let maxCheck = fineTune
  // keep track of the current check number
  let currentCheck = 0
  // function to check and loop until currentCheck === maxCheck
  const check = () => {
    // check to see if this should run and return if not
    if (currentCheck === maxCheck) { return false }
    // clock up currentCheck
    currentCheck++
    // get the newHeight (height is changed just before browser repaint)
    let newHeight = `${el.clientHeight}px`
    // check to see if newHeight is the same as oldHeight, if so, vue is still adding
    // or removing a child element and the parent has not changed height yet.
    if (newHeight === oldHeight) {
      // If heights are the same, loop this function just before each browser repaint.
      // NUXT/SSR warning, make sure this directive only runs browserside, or
      // wrap the following line in an if (process.browser) { // here }
      window.requestAnimationFrame(check)
    } else {
      // Otherwise, the height has changed and we're in limbo before browser has visualised the changes.
      // So let's catch that and set the element's height to the old height before the change.
      el.style.height = oldHeight
      // Then we'll delay setting the new height as per the user's delay setting
      setTimeout(() => {
        // when the delay is finished, set the height of the element to the new height
        el.style.height = newHeight
        // wait until the height change transition has finished as per the user's transition setting.
        setTimeout(() => {
          // change the element's height back to 'auto' so that
          // it's height will change again the next time a child is added or removed.
          el.style.height = 'auto'
        }, transitionTime)
      }, delay)
    }
  }
  // start the looping function
  check()
}

const smoothResize = (el, binding, vnode) => {
  // first things first, set the element's height to auto so that
  // it's height will change the next time a child is added or removed.
  el.style.height = 'auto'
  // transitionTime is the amount of time in ms that the transition should take.
  let transitionTime = (binding.value && binding.value.transition) || 300
  transitionTime = parseInt(transitionTime)
  // fineTune is to adjust how many browser repaints to loop for in checkHeightForChangeAndUpdate()
  let fineTune = (binding.value && binding.value.fineTune) || 20
  fineTune = parseInt(fineTune)
  // delay is to delay the setting of the newHeight
  let delay = (binding.value && binding.value.delay) || 0
  delay = parseInt(delay)
  // get the old height
  let oldHeight = `${el.clientHeight}px`
  // set the transition and overflow styles.
  el.style.transition = `height ${transitionTime}ms cubic-bezier(0.25, 0.8, 0.5, 1)`
  el.style.overflow = 'hidden'
  // Run the function to check for height change and adjust accordingly
  checkHeightForChangeAndUpdate(el, oldHeight, delay, transitionTime, fineTune)
}

Vue.directive('smooth-resize', {
  componentUpdated (el, binding, vnode) {
    smoothResize(el, binding, vnode)
  },
  updated (el, binding, vnode) {
    smoothResize(el, binding, vnode)
  }
})
