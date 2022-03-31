/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../builders/macroBuilder";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
export class DeployServiceMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectService().then(service => {
			if (service) {
				const terminal = vscode.window.createTerminal(`Deploy Service ${service}`);
				if (terminal) {
					const guid = Guid.newGuid();
					terminal.show(true);
					terminal.sendText("aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 822112283600.dkr.ecr.eu-west-1.amazonaws.com");
					terminal.sendText(`kubectl delete deployment   main-${service}`);
					terminal.sendText(`docker build -t 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${guid} .`);
					terminal.sendText(`docker push 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${guid} `);					
					terminal.sendText(`echo 'Macro finished'`);
				}
			}
		});		
	}
}