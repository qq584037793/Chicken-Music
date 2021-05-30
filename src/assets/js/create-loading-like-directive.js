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
      const title = binding.arg
      if (typeof title !== 'undefined') {
        instance.setTitle(title)
      }

      if (binding.value) {
        append(el)
      }
    },
    updated (el, binding) {
      const title = binding.arg
      const name = Comp.name
      if (typeof title !== 'undefined') {
        el[name].instance.setTitle(title)
      }
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
