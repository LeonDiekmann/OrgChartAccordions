const requestAnimationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || (cb => window.setTimeout(cb, 0));
export default requestAnimationFrame;



// this.setState({
//     open: this.state.open != 2 || this.state.show != 4 ? 2 : 0,
//     show: 4,
//     complex: 0
// });