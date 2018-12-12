import templateHTML from "./src/templates/main.html!text"

export async function render() {
    // this function just has to return a string of HTML
    // you can generate this using js, e.g. using Mustache.js

    return `
    
    <h2 class='tm-title'>Theresa May to be Tory leader at the Next General Election</h2>
    
    <svg class='tm-svg'></svg>
    
    <span class='tm-source'>Source: Paddy Power / Guardian analysis</span>

    `
}