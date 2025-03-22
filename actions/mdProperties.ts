import { Direction, PostData } from "../types"
import config from "@/config"

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
    else return [""]
}