/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';
import {List} from 'ts-generic-collections-linq';
export class Outputs{
	
	constructor(){}

	ColorText(text: string): string {
		let output = '';
		let colorIndex = 1;
		for (let i = 0; i < text.length; i++) {
			const char = text.charAt(i);
			if (char === ' ' || char === '\r' || char === '\n') {
				output += char;
			} else {
				output += `\x1b[3${colorIndex++}m${text.charAt(i)}\x1b[0m`;
				if (colorIndex > 6) {
					colorIndex = 1;
				}
			}
		}
		return output;
	}

	Log(message: string){
		vscode.window.showInformationMessage(message);
	}

	EnsureTerminalExists(): boolean {
		if ((<any>vscode.window).terminals.length === 0) {
			vscode.window.showErrorMessage('No active terminals');
			return false;
		}
		return true;
	}

	public static GetMainTerminal(): vscode.Terminal {
		const list = new List((<any>vscode.window).terminals);
		let mainTerminal = list.firstOrDefault((item: any)=>(item as vscode.Terminal).name=="Main terminal");
		if(mainTerminal==null){
			return vscode.window.createTerminal("Main terminal");						
		} else return mainTerminal as vscode.Terminal;
	}

	public static GetNewTerminal(name:string): vscode.Terminal {
		return vscode.window.createTerminal(name);	
	}
}

