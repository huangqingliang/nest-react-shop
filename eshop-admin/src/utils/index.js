import { cloneDeep, isString, flow, curry } from 'lodash'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import moment from 'moment'
import 'moment/locale/zh-cn'
import classnames from 'classnames'

import config from './config'
import request from './request'
import { Color } from './theme'


const { i18n } = config
export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)

export function queryArray(array, key, value) {
  if (!Array.isArray(array)) return
  return array.find(_ => _[key] === value)
}

export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })
  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export const langFromPath = curry(
  (languages, defaultLanguage, pathname) => {
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return item
      }
    }
    return defaultLanguage
  }
)(languages)(defaultLanguage)

export const deLangPrefix = curry(
  (languages, pathname) => {
    if (!pathname) return
    for (const item of languages) {
      if (pathname.startsWith(`/${item}/`)) {
        return pathname.replace(`/${item}/`, '/')
      }
    }
    return pathname
  }
)(languages)

export function addLangPrefix(pathname) {
  const prefix = langFromPath(window.location.pathname)
  return `/${prefix}${deLangPrefix(pathname)}`
}

const routerAddLangPrefix = params => {
  if (isString(params)) {
    params = addLangPrefix(params)
  } else {
    params.pathname = addLangPrefix(params.pathname)
  }
  return params
}

const myRouter = { ...umiRouter }

myRouter.push = flow(
  routerAddLangPrefix,
  umiRouter.push
)

myRouter.replace = flow(
  routerAddLangPrefix,
  myRouter.replace
)

export const router = myRouter

export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(deLangPrefix(pathname))
}

export function queryPathKeys(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))
  const getPath = current => {
    const currentParentId = hashMap.get(current)[parentId]
    if (currentParentId) {
      result.push(currentParentId)
      getPath(currentParentId)
    }
  }
  getPath(current)
  return result
}

export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current]
  const hashMap = new Map()
  array.forEach(item => hashMap.set(item[id], item))
  const getPath = current => {
    const currentParentId = hashMap.get(current[id])[parentId]
    if (currentParentId) {
      result.push(hashMap.get(currentParentId))
      getPath(hashMap.get(currentParentId))
    }
  }
  getPath(current)
  return result
}

export function queryLayout(layouts, pathname) {
  let result = 'public'
  const isMatch = regexp => regexp instanceof RegExp ? regexp.test(pathname) : pathMatchRegexp(regexp, pathname)
  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regexp of item.include) {
        if (isMatch(regexp)) {
          include = true
          break
        }
      }
    }
    if (include && item.exclude) {
      for (const regexp of item.exclude) {
        if (isMatch(regexp)) {
          exclude = true
          break
        }
      }
    }
    if (include && !exclude) {
      result = item.name
      break
    }
  }
  return result
}

export function getLocale() {
  return langFromPath(window.location.pathname)
}

export function setLocale(language) {
  if (getLocale() !== language) {
    moment.locale(language === 'zh' ? 'zh-cn' : language)
    umiRouter.push({
      pathname: `/${language}${deLangPrefix(window.location.pathname)}`,
      search: window.location.search
    })
  }
}

export {
  classnames,
  config,
  request,
  Color
}
