/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';


export class OpenActuatorMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.selectActuator().then(actuator => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);

			if(actuator){					
				this.portReader.Read("/helm/charts/"+actuator).then((port) => { 			
					terminal.sendText(`kubectl port-forward svc/main-${actuator} ${port}`);
					vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${port}/actuator/prometheus`));
				});				
			} else terminal.sendText(`Operation Canceled`);
		});		
	}
}