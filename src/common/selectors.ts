/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';
import { Service } from '../models/Service';
import {List} from 'ts-generic-collections-linq';
import { AppConfig } from '../models/AppConfig';
import * as fs from "fs";
import { parse, parseAllDocuments, stringify } from 'yaml';
export class Selectors{

	conf:AppConfig =  AppConfig.getInstance();
	
	constructor(){}

	selectService(): Thenable<Service | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: Service;
		}

		const servicesName = new List(this.conf.services).select(x=> x.name);
	
		return vscode.window.showQuickPick(servicesName.toArray()).then(item => {
			const services = new List(this.conf.services);
			const service = services.firstOrDefault(x=>x.name==item);
			return service ? service : undefined;
		});
	}


	selectCluster(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const clusters:string[] = this.conf.clusters;
	
		return vscode.window.showQuickPick(clusters).then(item => {
			return item ? item : undefined;
		});
	}

	selectRegion(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const regions:string[] = this.conf.regions;
	
		return vscode.window.showQuickPick(regions).then(item => {
			return item ? item : undefined;
		});
	}

	selectTerminal(): Thenable<vscode.Terminal | undefined> {
		interface TerminalQuickPickItem extends vscode.QuickPickItem {
			terminal: vscode.Terminal;
		}
		const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
		const items: TerminalQuickPickItem[] = terminals.map(t => {
			return {
				label: `name: ${t.name}`,
				terminal: t
			};
		});
		return vscode.window.showQuickPick(items).then(item => {
			return item ? item.terminal : undefined;
		});
	}

	selectActuator(): Thenable<string | undefined> {
		const path= `${this.conf.astPath}/helm/managemnt/servicemonitor.yaml`;
		const actuators:string[] = [];
		if( fs.existsSync(path)) {            
			const text =  fs.readFileSync(path).toString();  
			const ymlActuators:any[] = parseAllDocuments(text);
			
			ymlActuators.forEach(element => {
				actuators.push(element.toJSON().metadata.labels["k8s-app"]);
			});
		}
				
		
	
		return vscode.window.showQuickPick(actuators).then(item => {
			return item ? item : undefined;
		});
	}

}
