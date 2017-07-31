import jsonp from '../common/js/jsonp'
import { commonParams, options1 } from './config'

export function getDissDetail (id) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: Number(id),
    format: 'jsonp',
    outCharset: 'utf-8',
    notice: 0
  })
  return jsonp(url, data, options1)
}
