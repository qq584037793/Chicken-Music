import { get } from './base'

export function processSongs (songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    })
  }).then((result) => {
    const map = result.map
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter((song) => {
      return song.url.indexOf('vkey') > -1
    })
  })
}

const lyricMap = {}

export function getLyric (song) {
  // 有lyric直接返回
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  // lyricMap有mid
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }
  // 从没请求过
  return get('/api/getLyric', {
    mid
  }).then((result) => {
    const lyric = result ? result.lyric : '[00: 00: 00]この曲の歌詞は利用できません'
    lyricMap[mid] = lyric
    return lyric
  })
}
