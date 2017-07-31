export default class Song {
  constructor ({id, mid, singer, name, album, duration, img, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.img = img
    this.url = url
  }
}

export function createSong (musicdata) {
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: singer(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albumid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicdata.songid}.m4a?formtag=46`
  })
}

export function createDiss (musicdata) {
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: singer(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albumid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicdata.songid}.m4a?formtag=46`
  })
}

function singer (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
