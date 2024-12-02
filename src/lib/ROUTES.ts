/* eslint-disable */
/**
 * This file was generated by 'vite-plugin-kit-routes'
 *
 *      >> DO NOT EDIT THIS FILE MANUALLY <<
 */

/**
 * PAGES
 */
const PAGES = {
  "/blog": `/blog`,
  "/blog/[link_under_blog]": (params: { link_under_blog: (string | number) }) => {
    return `/blog/${params.link_under_blog}`
  },
  "/blog/[pds]/[repo]/[collection]/[rkey]": (params: { pds: (string | number), repo: (string | number), collection: (string | number), rkey: (string | number) }) => {
    return `/blog/${params.pds}/${params.repo}/${params.collection}/${params.rkey}`
  },
  "/sql/admin": `/sql/admin`,
  "/stats": `/stats`,
  "/stats/login": `/stats/login`,
  "/stats/[handle]": (params: { handle: (string | number), skip_follow?: ("true" | "false") }) => {
    return `/stats/${params.handle}${appendSp({ skip_follow: params.skip_follow })}`
  },
  "/stats/[handle]/extra": (params: { handle: (string | number) }) => {
    return `/stats/${params.handle}/extra`
  },
  "/stats/[handle]/squirrels": (params: { handle: (string | number) }) => {
    return `/stats/${params.handle}/squirrels`
  },
  "/stats/whale": `/stats/whale`,
  "/stats/wolf": `/stats/wolf`,
  "/thumb-meta": `/thumb-meta`,
  "/thumb-meta/[videoId]": (params: { videoId: (string | number) }) => {
    return `/thumb-meta/${params.videoId}`
  }
}

/**
 * SERVERS
 */
const SERVERS = {
  "GET /api/healthz": `/api/healthz`,
  "GET /stats/plc/[did]": (params: { did: (string | number) }) => {
    return `/stats/plc/${params.did}`
  },
  "GET /stats/plc/[pos=int]": (params: { pos: (Parameters<typeof import('../params/int.ts').match>[0]) }) => {
    return `/stats/plc/${params.pos}`
  },
  "GET /stats/plc/at/last": `/stats/plc/at/last`,
  "GET /stats/plc/check/[page]": (params: { page: (string | number) }) => {
    return `/stats/plc/check/${params.page}`
  },
  "GET /stats/plc/last": `/stats/plc/last`,
  "GET /stats/plc/sync": `/stats/plc/sync`
}

/**
 * ACTIONS
 */
const ACTIONS = {
  "login /stats/login": `/stats/login?/login`
}

/**
 * LINKS
 */
const LINKS = {
  "bsky_profile": (params: { handle: (string | number) }) => {
    return `https://bsky.app/profile/${params.handle}`
  },
  "bsky_hashtag": (params: { hashtag: (string | number) }) => {
    return `https://bsky.app/hashtag/${params.hashtag}`
  },
  "bsky_starter_pack": (params: { creator_handle: (string | number), rkey: (string | number) }) => {
    return `https://bsky.app/starter-pack/${params.creator_handle}/${params.rkey}`
  }
}

type ParamValue = string | number | undefined

/**
 * Append search params to a string
 */
export const appendSp = (sp?: Record<string, ParamValue | ParamValue[]>, prefix: '?' | '&' = '?') => {
  if (sp === undefined) return ''

  const params = new URLSearchParams()
  const append = (n: string, v: ParamValue) => {
    if (v !== undefined) {
      params.append(n, String(v))
    }
  }

  for (const [name, val] of Object.entries(sp)) {
    if (Array.isArray(val)) {
      for (const v of val) {
        append(name, v)
      }
    } else {
      append(name, val)
    }
  }

  const formatted = params.toString()
  if (formatted) {
    return `${prefix}${formatted}`
  }
  return ''
}

/**
 * get the current search params
 * 
 * Could be use like this:
 * ```
 * route("/cities", { page: 2 }, { ...currentSP() })
 * ```
 */ 
export const currentSp = () => {
  const params = new URLSearchParams(window.location.search)
  const record: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    record[key] = value
  }
  return record
}

// route function helpers
type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T]
type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
type FunctionParams<T> = T extends (...args: infer P) => any ? P : never

const AllObjs = { ...PAGES, ...ACTIONS, ...SERVERS, ...LINKS }
type AllTypes = typeof AllObjs

export type Routes = keyof AllTypes extends `${string}/${infer Route}` ? `/${Route}` : keyof AllTypes
export const routes = [
	...new Set(Object.keys(AllObjs).map((route) => /^\/.*|[^ ]?\/.*$/.exec(route)?.[0] ?? route)),
] as Routes[]

/**
 * To be used like this: 
 * ```ts
 * import { route } from './ROUTES'
 * 
 * route('site_id', { id: 1 })
 * ```
 */
export function route<T extends FunctionKeys<AllTypes>>(key: T, ...params: FunctionParams<AllTypes[T]>): string
export function route<T extends NonFunctionKeys<AllTypes>>(key: T): string
export function route<T extends keyof AllTypes>(key: T, ...params: any[]): string {
  if (AllObjs[key] as any instanceof Function) {
    const element = (AllObjs as any)[key] as (...args: any[]) => string
    return element(...params)
  } else {
    return AllObjs[key] as string
  }
}

/**
* Add this type as a generic of the vite plugin `kitRoutes<KIT_ROUTES>`.
*
* Full example:
* ```ts
* import type { KIT_ROUTES } from './ROUTES'
* import { kitRoutes } from 'vite-plugin-kit-routes'
*
* kitRoutes<KIT_ROUTES>({
*  PAGES: {
*    // here, key of object will be typed!
*  }
* })
* ```
*/
export type KIT_ROUTES = {
  PAGES: { '/blog': never, '/blog/[link_under_blog]': 'link_under_blog', '/blog/[pds]/[repo]/[collection]/[rkey]': 'pds' | 'repo' | 'collection' | 'rkey', '/sql/admin': never, '/stats': never, '/stats/login': never, '/stats/[handle]': 'handle', '/stats/[handle]/extra': 'handle', '/stats/[handle]/squirrels': 'handle', '/stats/whale': never, '/stats/wolf': never, '/thumb-meta': never, '/thumb-meta/[videoId]': 'videoId' }
  SERVERS: { 'GET /api/healthz': never, 'GET /stats/plc/[did]': 'did', 'GET /stats/plc/[pos=int]': 'pos', 'GET /stats/plc/at/last': never, 'GET /stats/plc/check/[page]': 'page', 'GET /stats/plc/last': never, 'GET /stats/plc/sync': never }
  ACTIONS: { 'login /stats/login': never }
  LINKS: { 'bsky_profile': 'handle', 'bsky_hashtag': 'hashtag', 'bsky_starter_pack': 'creator_handle' | 'rkey' }
  Params: { link_under_blog: never, pds: never, repo: never, collection: never, rkey: never, handle: never, skip_follow: never, videoId: never, did: never, pos: never, page: never, hashtag: never, creator_handle: never }
}
