/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';
import  {Config}  from './readConfig';
import { Services } from '../models/Services';
export class Selectors{

	conf: Config = new Config();
	
	constructor(){}

	SelectService(): Thenable<string | undefined> {
		interface ServiceQuickPickItem extends vscode.QuickPickItem {
			service: string;
		}

		const servicesName:string[] = this.conf.getServicesName();
		
	
		/*
		const servicesName:string[] = [
			"ast-flow-publisher",
			"ast-flow-listener",
			"integrations-repos-manager",
			"integrations-datastore",
			"feedback-app"
			];
		*/
		return vscode.window.showQuickPick(servicesName).then(item => {
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
