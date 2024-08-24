import { Direction, PostData } from "../utils/types"
import config from "../../config.blog"

export function getMdDirection(data: PostData) {
    let dir: Direction = 'ltr'
    if (data.dir === undefined)
        dir = config.direction
    else
        dir = data.dir === 'rtl' ? 'rtl' : 'ltr'
    return dir
}

export function getMdLanguage(data: PostData) {
    return data.lang || config.lang
}

export function getMdAuthors(data: PostData) {
    if (data.author)
        return [data.author]
    else if (data.authors)
        return data.authors
    else if (config.author)
        return [config.author]
    else if (config.authors)
        return config.authors
    else return ""
}

export function getMdPostsList(data: PostData) {
    if (!data.posts_list) {
        return false
    }
    if (data.posts_list === true) {
        return config.posts_list
    }
    return { ...config.posts_list, ...data.posts_list }
}