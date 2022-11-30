import Vue from 'vue';



const applyDirectives = () => {

  // font-size
  Vue.directive('font-size', (el, binding) => {
    el.style.fontSize = binding.value + 'px'
  })

}

export default applyDirectives