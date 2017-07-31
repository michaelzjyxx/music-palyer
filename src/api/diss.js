import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  // const url = ''
  const data = Object.assign({}, commonParams, {
    tpl: 'v12',
    page: 'list',
    format: 'jsonp',
    outCharset: 'utf-8',
    channel: 'singer',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  })
  return jsonp(url, data, options)
}
