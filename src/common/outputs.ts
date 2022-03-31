

/* eslint-disable @typescript-eslint/no-empty-function */
'use strict';
import * as vscode from 'vscode';

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
}

