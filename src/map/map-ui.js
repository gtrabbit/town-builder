

    export default function map(width, height, squareSize, screenWidth, screenHeight){
        const map = new PIXI.Container();
        map.interactive = true;
        setMapDragging();

        map.sortTiles = function(){
            this.getChildByName('tileLayer').children.sort((a, b)=>(a.sortOrder - b.sortOrder));
        }

        map.zoomToLocation = function(coords){
            this.position.set((coords[0] * -squareSize) - (this.pivot.x - (screenWidth / 2)) , (coords[1] * -squareSize) - (this.pivot.y - (screenHeight / 2)));
        }

        return map;
        
        function setMapDragging(){

            map
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

            function onDragStart(event) {
                this.data = event.data;
                let position = this.data.getLocalPosition(this);
                this.pivot.set(position.x, position.y)
                this.position.set(this.data.global.x, this.data.global.y)
                this.dragging = true;
            }

            function onDragEnd() {
                this.dragging = false;
                this.data = null;
            }

            function onDragMove() {
                if (this.dragging) {
                    let newPosition = this.data.getLocalPosition(this.parent);
                    let xBound = newPosition.x - this.pivot.x;
                    let yBound = newPosition.y - this.pivot.y;

                    if (xBound < 100 && xBound > ((screenWidth - 100) - (width * squareSize))) this.x = newPosition.x;
                    if (yBound < 100 && yBound > ((screenHeight - 100) - (height * squareSize))) this.y = newPosition.y;
                }
            }
        }

    }
    

