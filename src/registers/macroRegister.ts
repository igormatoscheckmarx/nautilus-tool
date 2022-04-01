/* eslint-disable @typescript-eslint/no-inferrable-types */
import * as vscode from 'vscode';
import * as constants from "../common/constants";
export class MacroRegister{
  
	public context: vscode.ExtensionContext;
    constructor(context: vscode.ExtensionContext){
		this.context = context;
	}

	Register(macro:IMacro, commandCaller:string) : void {
		this.context.subscriptions.push(vscode.commands.registerCommand(`${constants.AppConstants.APP_NAME}.${commandCaller}`, () => {													
			macro.Execute();					
		}));
    }

	RegisterCluster(macroCluster:MacroCluster) : void {
		this.context.subscriptions.push(vscode.commands.registerCommand(`${constants.AppConstants.APP_NAME}.${macroCluster.commandCaller}`, () => {			
			macroCluster.GetMacros().forEach(element => {								
				element.Execute();		
			});		
		}));
    }
}


export interface IMacro{
	
	Execute (): void;
}

export class MacroCluster{
  
	macros : IMacro[];
	public commandCaller : string;
    constructor(commandCaller:string){
		this.macros = [];
		this.commandCaller = commandCaller;
	}

    Add(macro:IMacro) : void {
		this.macros.push(macro);
    }

	GetMacros():IMacro[]{
		return this.macros;
	}
}