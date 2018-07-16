import { Injectable } from '@angular/core';

import { Config } from "../app.config";

@Injectable()
export class LocaleService {

  private static cache = {};

  constructor(private data: any ) {}

  public static loadInstance() {

    let jsonFile = Config.getInstance('assets/config/config.json').get("locale");
    console.log(jsonFile);

    return new Promise((resolve, reject) => {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', jsonFile, true);
      xobj.onreadystatechange = () => {
        if (xobj.readyState == 4) {
          if (xobj.status == 200) {

            this.cache[jsonFile] = new LocaleService(JSON.parse(xobj.responseText));

            resolve();
          }
          else {
            reject(`Locale:loadInstance> Could not load file '${jsonFile}': ${xobj.status}`);
          }
        }
      }
      xobj.send(null);
    });
  }

  public static getInstance() {
    
    let jsonFile = Config.getInstance('assets/config/config.json').get("locale");
    console.log(jsonFile);

    if (jsonFile in this.cache) {
      return this.cache[jsonFile];
    }
    throw `Could not find config '${jsonFile}', did you load it?`;
  }

  public get(key: string) {
    if (this.data == null) {
      return null;
    }
    if (key in this.data) {
      return this.data[key];
    }
    return null;
  }
}

export function getLocaleConfig() {
  return LocaleService.getInstance();
}

export const LOCALECONFIG_PROVIDERS: Array<any> = [
  { provide: LocaleService, useFactory: getLocaleConfig }
];