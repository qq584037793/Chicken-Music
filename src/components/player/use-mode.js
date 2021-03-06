import { useStore } from 'vuex'
import { PLAY_MODE } from '@/assets/js/constant'
import { computed } from 'vue'

export default function useMode () {
  const store = useStore()
  const playMode = computed(() => store.state.playMode)
  const modeIcon = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence ? 'icon-sequence'
      : playModeVal === PLAY_MODE.random ? 'icon-random' : 'icon-loop'
  })

  const modeText = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.sequence ? '順番再生'
      : playModeVal === PLAY_MODE.random ? 'シャッフル再生' : 'サイクル再生'
  })

  function changeMode () {
    const mode = (playMode.value + 1) % 3
    store.dispatch('changeMode', mode)
  }

  return {
    modeIcon,
    modeText,
    changeMode
  }
}
