/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as vscode from 'vscode';
import * as constants from "../common/constants";
import {Outputs} from "../common/outputs";
export class CommandRegister{
  
	public context: vscode.ExtensionContext;
    constructor(context: vscode.ExtensionContext){
		this.context = context;
	}

    Register(terminalTitle: string, commands: string[], finalLog:string, commandCaller:string, useDefaultTerminal:boolean=true) : void {
		this.context.subscriptions.push(vscode.commands.registerCommand(`${constants.AppConstants.APP_NAME}.${commandCaller}`, () => {
			const terminal = useDefaultTerminal?Outputs.GetMainTerminal():vscode.window.createTerminal(terminalTitle);
			if (terminal) {

				commands.forEach(element => {
					terminal.sendText(element);
				});	
	
				if(finalLog!="")					
						terminal.sendText(`echo '${finalLog}'`);				

				terminal.show();
			}			
		}));
    }

	RegisterCluster(terminalCluster:TerminalCluster) : void {
		this.context.subscriptions.push(vscode.commands.registerCommand(`${constants.AppConstants.APP_NAME}.${terminalCluster.commandCaller}`, () => {			
			terminalCluster.GetTerminals().forEach(element => {
				
				const terminal = vscode.window.createTerminal(element.terminalTitle);
				if (terminal) {

					element.commands.forEach(cmd => {					
						terminal.sendText(cmd);					
					});	

					if(element.finalLog!="")					
						terminal.sendText(`echo '${element.finalLog}'`);	
					
					terminal.show();
				}		
			});		
		}));
    }
}

export class XTerminal {
	constructor(terminalTitle: string, commands: string[], finalLog:string=""){
		this.terminalTitle = terminalTitle;
		this.commands = commands;
		this.finalLog = finalLog;
	}
	commands: string[];
	terminalTitle: string;
	public finalLog:string;
}

export class TerminalCluster{
  
	terminals : XTerminal[];
	public commandCaller : string;
    constructor(commandCaller:string){
		this.terminals = [];
		this.commandCaller = commandCaller;
	}

    AddTerminal(terminalTitle: string, commands: string[],finalLog:string) : void {
		this.terminals.push(new XTerminal(terminalTitle,commands,finalLog));
    }

	GetTerminals():XTerminal[]{
		return this.terminals;
	}
}