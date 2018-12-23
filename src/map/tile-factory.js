import Civic from 'tiles/Civic';
import Square from 'tiles/Square';
import Wilds from 'tiles/Wilds';

        export default function(type, x, y, grid, terrain, growthRate){
            let tile;
            switch(type){
                case 'wilds':
                    tile = new Wilds(x, y, grid, terrain, growthRate);
                    break;

                case 'civic':
                    tile = new Civic(x, y, grid, terrain);
                    break;

                case 'square':
                default:
                    tile = new Square(x, y, grid, terrain);
                    break;
            }

            return tile;
        }
