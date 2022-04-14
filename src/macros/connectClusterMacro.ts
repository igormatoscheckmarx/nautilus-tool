/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {ClusterConfigReader} from "../common/clusterVerifier";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';
import { Service } from '../models/Service';
import * as cp from 'child_process';
import {List} from 'ts-generic-collections-linq';

export class ConnectClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {
	

	selectors : Selectors;
	clusterConfigReader: ClusterConfigReader;
	conf: AppConfig = AppConfig.getInstance();

	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
		this.clusterConfigReader = new ClusterConfigReader();
	}

    Execute (): void{
		
		this.selectors.selectCluster().then(cluster => {
			this.selectors.selectRegion().then(region => {
				const terminal = Outputs.GetMainTerminal();
				terminal.show(true);
				if(cluster && region){			
						
					this.clusterConfigReader.FindCluster(cluster,region).then((c) => { 
						if(c){														
							terminal.sendText(`kubectl config delete-context ${c}`);							
						}
						
						terminal.sendText(`aws eks update-kubeconfig --region ${region} --name ${cluster}`);	
						this.clusterConfigReader.FindCluster(cluster,region).then((c) => { 
							if(c){		
								terminal.sendText(`kubectl config use-context ${c}`);
							}
						});	
						terminal.sendText(`kubectl config get-contexts`);
						
					});				
					
				} else terminal.sendText(`Operation Canceled`);
			});		
		});		
	}
}