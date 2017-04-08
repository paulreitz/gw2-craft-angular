import { ItemModel } from './item.model';
import { RecipeModel } from './recipe.model';

export class NodeModel {
    item_id: number;
    children: Array<NodeModel>;
    id: string;
    item: ItemModel;

    constructor(item_id: number) {
        this.item_id = item_id;
        this.id = (parseInt(Math.random() * Math.pow(2, 34) + "" + 10)).toString(36).toUpperCase();
    }

    getItem(): ItemModel {
        return this.item;
    }

    setChildren(recipe: RecipeModel): void {
        this.item = recipe.items["item_" + this.item_id.toString(10)];
        this.item.name = this.item.name.replace("&lsquo;", "'");
        var node: {id: number, children?: Array<{item_id: number, count: number}>} = recipe.nodes["node_" + this.item_id.toString(10)];
        this.children = [];
        if (node.children) {
            node.children.forEach(child => {
                for (var i = 0; i < child.count; i++) {
                    var childNode: NodeModel = new NodeModel(child.item_id);
                    childNode.setChildren(recipe);
                    this.children.push(childNode);
                }
            });
        }
    }

    getBaseMaterials(items: {[key: string]: {item: ItemModel, count: number}}) {
        if (this.children && this.children.length) {
            this.children.forEach(child => { child.getBaseMaterials(items);});
        }
        else {
            if (items["item_" + this.item_id.toString(10)]) {
                var count = items["item_" + this.item_id.toString(10)].count;
                count++;
                items["item_" + this.item_id.toString(10)].count = count;
            }
            else {
                items["item_" + this.item_id.toString(10)] = {item: this.item, count: 1};
            }
        }
    }

    getDetails(parent?: string): any {
        var data: {id: string, item: ItemModel, width: number, parent?: string, children?: Array<any>} = 
        {
            id: this.id,
            item: this.item,
            width: this.item.name.replace("&lsquo;", "'").length * 8 + 40
        }
        if (parent) {
            data.parent = parent;
        }
        if (this.children && this.children.length) {
            data.children = [];
            this.children.forEach(child => {
                data.children.push(child.getDetails(this.id));
            })
        }
        return data;
    }

    getDepth(): number {
        var count = 1;
        if (this.children && this.children.length) {
            var innerCount:number = 0;
            this.children.forEach(child => {
                var i = child.getDepth();
                if (i > innerCount) {
                    innerCount = i;
                }
            });
            count += innerCount;
        }
        return count;
    }

    getBreadth(): number {
        var base: {[key:string]: {item: ItemModel, count: number}} = {};
        this.getBaseMaterials(base);
        var count:number = 0;
        for (var key in base) {
            count += base[key].count;
        }
        return count;
    }
}