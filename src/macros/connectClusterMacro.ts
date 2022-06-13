/* eslint-disable @typescript-eslint/no-empty-function */
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {ClusterConfigReader} from "../common/clusterVerifier";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';

export class pMacro implements IMacro {
	
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
						
					this.clusterConfigReader.findCluster(cluster,region).then((c) => { 
						if(c){														
							terminal.sendText(` $kubectl config delete-context{c}`);							
						}
						
						terminal.sendText(`aws eks update-kubeconfig --region ${region} --name ${cluster}`);	
						this.clusterConfigReader.findCluster(cluster,region).then((c) => { 
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