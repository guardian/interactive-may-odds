import fs from 'fs'

const parseOdds = str => {

    const dividend = Number(str.split('/')[0])
    const divisor = Number(str.split('/')[1])
    
    return dividend/divisor

}

const data = fs.readdirSync('src/server/data/data')
    .filter( fn => fn.startsWith('may') )
    .map( fn => {


        return [ fn.slice(4, -5), JSON.parse(fs.readFileSync('./src/server/data/data/' + fn)) ]

    } )
    .map( t => {

        const odds = parseOdds(t[1][1])

        return [ t[0], odds ]

    } )

    console.log(`${data.length} files found`)


fs.writeFileSync('./src/server/odds.json', JSON.stringify(data))