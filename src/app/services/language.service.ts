import { Injectable } from '@angular/core';

// Currently completely unsure how this would be localized.
// For the time being just abstracting away a list of key value pairs.

@Injectable()
export class LanguageService {
    private resx = {
        "app-title": "GW2 Craft Utility",
        "nav-home":"search",
        "nav-about":"about",
        "search-filter":"Search Filters",
        "search-type": "Type",
        "search-subType": "Subtype",
        "search-rarity":"Rarity",
        "search-level":"Minimum Level",
        "search-label":"Search",
        "display-empty":"No search results available",
        "pager-items":"Items {0} to {1} of {2}"
    }

    getString(key: string): string {
        return this.resx[key] || "";
    }

    getFormatedString(key:string, args: Array<any>):string {
        return (this.resx[key] || "").replace(/{(\d+)}/g, (match:string, index:number) => {
            return !!args[index]
                ? args[index]
                : match;
        });
    }
}