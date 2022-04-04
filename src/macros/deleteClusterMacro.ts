/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {Config}  from '../common/readConfig';
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';
import { Service } from '../models/Service';
export class DeleteClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
	conf: AppConfig = new Config().getConfig();
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectService().then(cluster => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			if(cluster){

				this.portReader.Read(cluster);
			/*	terminal.sendText(`Deleting Cluster ${cluster}`);
				terminal.sendText(`cd ${this.conf.astPath}/helm`);
				terminal.sendText("make uninstall");
				terminal.sendText("make prom-down");
				terminal.sendText("helm uninstall aws-ecr-credential");
				terminal.sendText(`x=0;while [ $x -le 1 ];do sleep 2; x=$(kubectl get pods |  wc -l); if [ $x>0 ]; then echo "Waiting Pods to be deleted"; else x=2;  fi; done`);
				terminal.sendText(`eksctl delete cluster -n ${cluster} -r eu-west-1`);				
				terminal.sendText(`'Macro finished'`);	*/		
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}