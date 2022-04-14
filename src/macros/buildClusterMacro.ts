/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';
import { Service } from '../models/Service';
export class BuildClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {
	

	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();

	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.selectCluster().then(cluster => {
			this.selectors.selectRegion().then(region => {
				const terminal = Outputs.GetMainTerminal();
				terminal.show(true);
				
				if(cluster && region){			
					terminal.sendText(`eksctl create cluster --name ${cluster} --region ${region} --node-type t3a.xlarge --nodes 2 --nodes-min 1 --nodes-max 3`);
					terminal.sendText(`cd ${this.conf.astPath}/helm`);
					terminal.sendText("make ecr");
					terminal.sendText("helm dep up ast");
					terminal.sendText("helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml --install");				
					terminal.sendText(`'Macro finished'`);		
				} else terminal.sendText(`Operation Canceled`);
				
				
			});		
		});		
	}
}