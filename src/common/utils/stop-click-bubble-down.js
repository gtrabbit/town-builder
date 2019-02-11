export default function(target) {
    if (!target.listeners('click').find(a => a.name === 'stopClick')) {
        target.on('click', stopClick);
    }
}
   
function stopClick(event) {
    event.stopPropagation();
    event.reset();
}

