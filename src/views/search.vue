<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="search-content">
      <div class="hot-keys">
        <h1 class="title">人気検索</h1>
        <ul>
          <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
            <span>{{item.key}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from '@/components/search/search-input'
import { ref } from 'vue'
import { getHotKeys } from '@/service/search'
export default {
  name: 'search',
  components: {
    SearchInput
  },
  setup () {
    const query = ref('')
    const hotKeys = ref([])

    getHotKeys().then((result) => {
      hotKeys.value = result.hotKeys
    })

    function addQuery (s) {
      query.value = s
    }

    // watch(query, (val) => {
    //   console.log(val)
    // })
    return {
      query,
      hotKeys,
      addQuery
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
  }
}
</style>
