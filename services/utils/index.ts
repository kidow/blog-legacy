import * as cheerio from 'cheerio'

export const htmlToText = (html: string) => {
    const $ = cheerio.load(html)

    const content = $.text().trim()
    const description = content.substring(0, 140)
    const thumbnailUrl = $('img').attr('src') || ''

    return {
        content,
        description,
        thumbnailUrl
    }
}