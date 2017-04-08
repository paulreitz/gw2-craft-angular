import { ItemModel } from './item.model';

export class RecipeModel {
    root: number;
    nodes: {[key: string]: {id: number, children?: Array<{item_id: number, count: number}>}};
    items: {[key: string]: ItemModel};
}