import { createApp } from 'vue'

export default function createLoadingLikeDirective (Comp) {
  return {
    mounted (el, binding) {
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      const name = Comp.name
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance

      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }

  function append (el) {
    const name = Comp.name
    el.appendChild(el[name].instance.$el)
  }

  function remove (el) {
    const name = Comp.name
    el.removeChild(el[name].instance.$el)
  }
}
