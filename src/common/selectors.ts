/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';
import { Service } from '../models/Service';
import {List} from 'ts-generic-collections-linq';
import { AppConfig } from '../models/AppConfig';
export class Selectors{

	conf:AppConfig =  AppConfig.getInstance();
	
	constructor(){}

	SelectService(): Thenable<Service | undefined> {
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


	SelectCluster(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const clusters:string[] = this.conf.clusters;
	
		return vscode.window.showQuickPick(clusters).then(item => {
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
}
