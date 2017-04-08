export class TypesModel {
    public static baseTypes: Array<string> = ["Armor","Back","Bag","Consumable","Container","CraftingMaterial","Gathering","Gizmo","Trinket","Trophy","UpgradeComponent","Weapon"];
    public static baseRarities: Array<string> = ["Junk","Basic","Fine","Masterwork","Rare","Exotic","Ascended","Legendary"];

    public static subTypes:{[key:string]: Array<{type:string, value: number}>} = {
        "Armor": [
            {type: "Boots", value: 3},
            {type: "Coat", value: 4},
            {type: "Gloves", value: 11},
            {type: "Helm", value: 14},
            {type: "Aquatic Helm", value: 15},
            {type: "leggings", value: 16},
            {type: "Shoulders", value: 26}
        ],
        "Back": [

        ],
        "Bag": [

        ],
        "Consumable": [
            {type: "Food", value: 8},
            {type: "Generic", value: 10},
            {type: "Utility", value: 33}
        ],
        "Container": [
            {type: "Default", value: 6},
            {type: "GiftBox", value: 35}
        ],
        "CraftingMaterial": [

        ],
        "Gathering": [
            {type: "Mining", value: 36}
        ],
        "Gizmo": [
            {type: "Default", value: 6}
        ],
        "Trinket": [
            {type: "Accessory", value: 0},
            {type: "Amulet", value: 1},
            {type: "Ring", value:21}
        ],
        "Trophy": [

        ],
        "UpgradeComponent": [
            {type: "Default", value: 6},
            {type: "Gem", value: 9},
            {type: "Rune", value: 23},
            {type: "Sigil", value: 27}
        ],
        "Weapon": [
            {type: "Axe", value: 2},
            {type: "Dagger", value: 5},
            {type: "Focus", value: 7},
            {type: "Greatsword", value: 12},
            {type: "Hammer", value: 13},
            {type: "Longbow", value: 17},
            {type: "Mace", value: 18},
            {type: "Pistol", value: 19},
            {type: "Rifle", value: 20},
            {type: "Sceptor", value: 24},
            {type: "Shield", value: 25},
            {type: "Speargun", value: 28},
            {type: "Staff", value: 29},
            {type: "Sword", value: 30},
            {type: "Torch", value: 31},
            {type: "Trident", value: 32},
            {type: "Warhorn", value: 34}
        ]
    }
}