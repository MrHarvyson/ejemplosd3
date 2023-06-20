
// const rect = svg.append('rect')
//     .attr('width', 200)
//     .attr('height',100)
//     .attr('x',100)
//     .attr('y',200)
//     .style('fill','pink')
//     .style('stroke-width',2)
//     .style('stroke','#000000')

//datos
const data = [
    { day: "lunes", pasos: 1000 },
    { day: "martes", pasos: 2000 },
    { day: "miercoles", pasos: 3000 },
    { day: "jueves", pasos: 4000 },
    { day: "viernes", pasos: 2000 },
    { day: "sabado", pasos: 1000 },
    { day: "domingo", pasos: 1000 },
]


const margin = { top: 20, right: 20, botton: 20, left: 50 }

const svgWidth = 400
const svgHeight = 400

const chartWidth = svgWidth-margin.left - margin.right
const chartHeight = svgHeight-margin.left - margin.right

const scaleX = d3.scaleLinear()
    .domain([0,d3.max(data, d=>d.pasos)])
    .range([0,chartWidth])

const scaleY = d3.scaleBand()
    .range([0,chartHeight])
    .domain(data.map(d=>d.day).reverse())
    .padding(.1)

const axisX = d3.axisBottom(scaleX)
const axisY = d3.axisLeft(scaleY)

//console.log('dominio escala x', scaleX.domain())
//console.log('dominio escala y', scaleY.domain())

const svg = d3.select('#grafica')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

const g = svg.append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`)

    //ejeX
svg.append('g')
    .attr('transform',`translate(${margin.left},${margin.top + chartHeight})`)
    .call(axisX)

svg.append('g')
    .attr('transform',`translate(${margin.left},${margin.top})`)
    .call(axisY)

//axisX(axisXContainer)
    

// barras
g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('width', d=>scaleX(d.pasos))
    .attr('height',scaleY.bandwidth())
    .attr('x',0)
    .attr('y',d=>scaleY(d.day))
    .style('fill','blue')

