/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {Config}  from '../common/readConfig';
import {AppConfig}  from '../models/AppConfig';
export class DeleteClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
	conf: AppConfig = new Config().getConfig();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectCluster().then(cluster => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			if(cluster){

				terminal.sendText(`Deleting Cluster ${cluster}`);
				terminal.sendText(`cd ${this.conf.astPath}`);
				terminal.sendText("make uninstall");
				terminal.sendText("make prom-down");
				terminal.sendText("helm uninstall aws-ecr-credential");
				terminal.sendText(`eksctl delete cluster -n ${cluster} -r eu-west-1`);				
				terminal.sendText(`'Macro finished'`);			
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}