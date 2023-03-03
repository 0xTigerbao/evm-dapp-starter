import {BigNumber, ethers} from "ethers"

export const rndInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const chunkArray = (array: any[], perChunk: number) => {
    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
}

export const strToHex = (str: string) => {
    let result = ""
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16)
    }
    return result
}

export const formatNumber = (number: BigNumber, decimals = 18, minPrecision = 2, maxPrecision = 2) => {
    try {
        const amount = ethers.utils.formatUnits(number, decimals)
        const options = {
            minimumFractionDigits: minPrecision,
            maximumFractionDigits: maxPrecision,
        }
        if (Number.isInteger(+amount)) {
            return parseInt(amount).toLocaleString("en", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
        } else {
            return parseFloat(amount).toLocaleString("en", options)
        }
    } catch (error) {
        console.log(error)
        return "0"
    }
}

export const beautifulNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
    const options = {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision,
    }
    if (Number.isInteger(number)) {
        return parseInt(number + "").toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })
    } else {
        return parseFloat(number + "").toLocaleString("en", options)
    }
}
