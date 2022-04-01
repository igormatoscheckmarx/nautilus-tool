/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
export class DeployServiceMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectService().then(service => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			if(service){

				const guid = Guid.newGuid();				
				terminal.sendText(`Deploying Service ${service}`);
				terminal.sendText("aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 822112283600.dkr.ecr.eu-west-1.amazonaws.com");
				terminal.sendText(`kubectl delete deployment   main-${service}`);
				terminal.sendText(`docker build -t 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${guid} .`);
				terminal.sendText(`docker push 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${guid} `);					
				terminal.sendText(`'Macro finished'`);			
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}