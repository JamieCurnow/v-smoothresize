import Vue from 'vue'

Vue.directive('smoothresize', {
  update (el, binding, vnode) {
    el.style.height = 'auto'
    let transitionTime = (binding.value && binding.value.transition) || 300
    let delay = (binding.value && binding.value.delay) || 100
    let oldHeight = `${el.clientHeight}px`
    // set the transition and overflow styles.
    el.style.transition = `all ${transitionTime}ms cubic-bezier(0.25, 0.8, 0.5, 1)`
    el.style.overflow = 'hidden'
    // wait for nextTick to get new height
    vnode.context.$nextTick(() => {
      let newHeight = `${el.clientHeight}px`
      // set the height of the element to the old height
      // this should happen before any visible changes
      el.style.height = oldHeight
      // use setTimeout to delay setting the element's height to the new height
      setTimeout(() => {
        el.style.height = newHeight
      }, delay)
    })
  }
})
