/* eslint-disable @typescript-eslint/no-empty-function */
import * as config from '../configFile.json';
import { Services } from '../models/Services';

export class Config{	

	constructor() {}	

	getServices(): Services[] {
		return config.services;
	}

	getServicesName(): string[]{
		const services: Services[] = this.getServices();

		const servicesName: string[] = Array<string>();

		services.forEach(item => {
			servicesName.push(item.name);
		});
		
		return servicesName;
	}

}

/*
export function getServices(): Services[] {
	return config.services;
}
*/
