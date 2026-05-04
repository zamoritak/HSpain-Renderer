export interface IRoomMapHoleData
{
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    on: boolean;
    invert: boolean;
    blockWalking: boolean;
    alphaHide: boolean;
    hideWallItems: boolean;
    invisibility: boolean;
}

export interface IRoomMapData
{
    width: number;
    height: number;
    wallHeight: number;
    fixedWallsHeight: number;
    tileMap: { height: number }[][];
    holeMap: IRoomMapHoleData[];
    doors: { x: number, y: number, z: number, dir: number }[];
    dimensions: { minX: number, maxX: number, minY: number, maxY: number };
    restrictsDragging: boolean;
    restrictsScaling: boolean;
    restrictedScale: number;
}
