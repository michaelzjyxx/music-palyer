import jsonp from '../common/js/jsonp'
import {commonParam, options} from "./config"

export function getRecommend() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    tpl: 'v12',
    page: 'other',
    callback: 'GetRecomListCallback24630601474804048',
    rnd: '24630601474804048',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
