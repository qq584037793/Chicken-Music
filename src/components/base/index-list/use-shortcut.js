import { ref, computed } from 'vue'

export default function useShortList (props, groupRef) {
  const ANCHOR_HEIGHT = 18 // 锚点高度
  const scrollRef = ref(null)
  // 取得shortcutList数据
  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  // 点击字母跳转到对应区域
  function onShortcutTouchStart (e) {
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.y1 = e.touches[0].pageY // 第一次触碰时的坐标
    touch.anchorIndex = anchorIndex
    scrollTo(anchorIndex)
  }
  // 滑动字母跳转到对应区域
  function onShortcutTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    const anchorIndex = touch.anchorIndex + delta
    scrollTo(anchorIndex)
  }
  // 滚动到指定index
  function scrollTo (index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))// 限制index高度
    const targetEl = groupRef.value.children[index] // 得到滚定dom
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
