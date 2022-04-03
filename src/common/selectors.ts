/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';
import  {Config}  from './readConfig';
import { Service } from '../models/Service';
export class Selectors{

	conf: Config = new Config();
	
	constructor(){}

	SelectService(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const servicesName:string[] = this.conf.getServicesName();
	
		return vscode.window.showQuickPick(servicesName).then(item => {
			return item ? item : undefined;
		});
	}


	SelectCluster(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const clusters:string[] = this.conf.getConfig().clusters;
	
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
