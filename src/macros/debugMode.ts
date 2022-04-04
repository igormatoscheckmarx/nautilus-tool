/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';
import { Service } from '../models/Service';
export class DeleteClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectService().then(service => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			if(service){				
				this.portReader.Read(service).then((port) => { 
					console.log(port);
					terminal.sendText(`kubectl port-forward svc/${service.name} ${port}`);
				});
		
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}