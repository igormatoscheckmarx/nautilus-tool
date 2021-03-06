import { Service } from "./Service";
import * as fs from "fs";
import { parseJson } from "../common/parseJson";


/* eslint-disable @typescript-eslint/no-empty-function */
export class AppConfig{
	
	astPath: string;
	region: string;
	devName: string;
	teamName: string;
	services: Service[];
	clusters: string[];
	regions: string[];
	isWindows:boolean;
	private static instance: AppConfig


	constructor(){
		this.isWindows= !(process.env.COMMAND_MODE || "").includes('unix');
	}

	public static getInstance():AppConfig{
		if(this.instance == null){
			this.instance = this.getConfig();
			return this.instance;
		}
		return this.instance;
	} 

	private static getConfig(): AppConfig{
		const home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
		const path=`${home}/.nautilus/configFile.json`;
		if( fs.existsSync(path)) {            
			return parseJson<AppConfig>(fs.readFileSync(path).toString());  
		}
		return new AppConfig();
	}


}