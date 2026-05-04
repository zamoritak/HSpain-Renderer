import { INitroEvent } from '../../api';

export interface IRoomAreaSelectionManager
{
    startSelecting(): void;
    clearHighlight(): void;
    handleTileMouseEvent(event: INitroEvent): void;
    finishSelecting(): boolean;
    activate(callback: (rootX: number, rootY: number, width: number, height: number) => void, highlightType: string, objectId?: number, disableShift?: boolean): boolean;
    deactivate(): void;
    setHighlight(rootX: number, rootY: number, width: number, height: number): void;
    readonly areaSelectionState: number;
}
