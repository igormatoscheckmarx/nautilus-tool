/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Outputs} from "../common/outputs";
export class DeleteServiceMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;	
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectService().then(service => {
			const terminal = Outputs.GetMainTerminal(); 
			if(service){
				
				terminal.show(true);
				terminal.sendText(`Deleting Service ${service}`);
				terminal.sendText(`kubectl delete deployment   main-${service}`);
			} else terminal.sendText(`Operation Canceled`);
		});		
	}
}