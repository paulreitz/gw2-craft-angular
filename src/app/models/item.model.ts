export class ItemModel {
    id: string;
    name: string;
    type: string;
    level: number;
    rarity: string;
    vendor_value: number;
    default_skin: number;
    game_types: Array<string>;
    flags: Array<string>;
    restrictions: Array<string>;
    chat_link: string;
    icon: string;
    details: Object;
}