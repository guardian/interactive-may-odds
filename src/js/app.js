import * as d3 from 'd3'
import { $, round } from './util'
import odds from '../server/odds.json'
import moment from 'moment'

const parseSecs = str => {
    return moment(str, 'YYYY-MM-DD_HHmmss').format('X')
}

const format = str => moment(str, 'YYYY-MM-DD_HHmmss').format('hh:mm') + ' pm'

const drawOdds = () => {

    const svgEl = $('.tm-svg')

    const width = svgEl.getBoundingClientRect().width - 32
    const height = 300

    const padding = {
        top: 24,
        right: 0,
        bottom: 24,
        left: 0
    }

    const svg = d3.select(svgEl)
        .attr('width', width)
        .attr('height', height)
    
    
    const exactMax = d3.max(odds.map( t => t[1] ))

    const maxOdds = exactMax > 100 ? round(exactMax, -2) + 100 : round(exactMax, -1) + 10

    const yScale = d3.scaleLinear()
        .domain([ 1, maxOdds ])
        .range([height - padding.bottom, padding.top ])

    const minSecs = d3.min(odds.map( t => parseSecs(t[0]) ))
    const maxSecs = d3.max(odds.map( t => parseSecs(t[0]) ))

    console.log(minSecs, maxSecs)

    const xScale = d3.scaleLinear()
        .domain([ minSecs, maxSecs ])
        .range([ padding.left, width - padding.right ])

    const lineGen = d3.line()
        .x(d => xScale(parseSecs(d[0])))
        .y( d => yScale(d[1]) )


    const yGs = svg
        .selectAll('blah')
        .data([ 1, 10, 20, 100 ])
        .enter()
        .append('g')
        .attr('transform', d => `translate(0, ${yScale(d)})`)

    yGs
        .append('line')
        .attr('x1', padding.left )
        .attr('x2', width)
        .attr('class', d => d === 1 ? 'tm-yline tm-yline--base' : 'tm-yline')
    
    yGs
        .append('text')
        .text(d => d + '/1')
        .attr('x', padding.left - 4)
        .style('text-anchor', 'end')
        .attr('y', 5)
        .attr('class', 'tm-ylabel')

    const lineEl = svg
        .append('path')
        .datum(odds)
        .attr('d', lineGen)
        .attr('class', 'tm-odds')

    const labels = svg
        .selectAll('blah')
        .data([ odds[0], odds.slice(-1)[0] ])
        .enter()
        .append('text')

        .attr('x', d => xScale(parseSecs(d[0])))
        .attr('y', height - padding.bottom + 17)

        .text( d => format(d[0]) )
        .attr('class', 'tm-label')
        .style('text-anchor', (d, i) => i === 1 ? 'end' : 'start')


}

drawOdds()