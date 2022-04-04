/* eslint-disable @typescript-eslint/no-empty-function */
import * as config from '../configFile.json';
import { AppConfig } from '../models/AppConfig';
import { Service } from '../models/Service';
import { parseJson } from '../common/parseJson';
import * as fs from "fs";
export class Config{	

	constructor() {}	

	getServices(): Service[] {
		return config.services;
	}

	getServicesName(): string[]{
		const services: Service[] = this.getServices();

		const servicesName: string[] = Array<string>();

		services.forEach(item => {
			servicesName.push(item.name);
		});
		
		return servicesName;
	}

	getConfig(): AppConfig {
		const path="/Users/igormatos/.nautilus/configFile.json";
		if( fs.existsSync(path)) {            
			return parseJson<AppConfig>(fs.readFileSync(path).toString());  
		}
		return new AppConfig();
	}

}

/*
export function getServices(): Services[] {
	return config.services;
}
*/
