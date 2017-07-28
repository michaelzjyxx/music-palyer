import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerDetail (id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    format: 'jsonp',
    outCharset: 'utf-8',
    order: 'listen',
    singermid: id,
    begin: 0,
    num: 100,
    songstatus: 1
  })
  return jsonp(url, data, options)
}
