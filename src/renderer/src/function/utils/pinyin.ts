export type PinYinData = {
    main: string[]
    short: string[]
}

/* eslint-disable no-console */

export function getPinyin(name: string): PinYinData {
    if (typeof window === 'undefined' || !window.pinyin) {
        return {
            main: [],
            short: []
        }
    }

    try {
        const pinyinLib = window.pinyin
        return {
            main: pinyinLib.pinyin(name, {
                heteronym: true,
                compact: true,
                style: 'normal',
            }).map((item: string[]) => item.join('').toLowerCase()),
            short: pinyinLib.pinyin(name, {
                heteronym: true,
                compact: true,
                style: 'first_letter',
            }).map((item: string[]) => item.join('').toLowerCase()),
        }
    } catch (error) {
        console.warn('拼音转换失败:', error)
        return {
            main: [],
            short: []
        }
    }
}

export function matchPinyin(
    pinyinData: PinYinData,
    matchStr: string
): boolean {
    const str = matchStr.toLowerCase()
    for (const py of pinyinData.main) {
        if (py.includes(str)) return true
    }
    for (const pyShort of pinyinData.short) {
        if (pyShort.includes(str)) return true
    }
    return false
}
