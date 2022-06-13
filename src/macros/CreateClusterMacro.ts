/* eslint-disable @typescript-eslint/no-empty-function */
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {ClusterConfigReader} from "../common/clusterVerifier";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';

export class CreateClusterMacro implements IMacro {
	
	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();
	clusterConfigReader: ClusterConfigReader;
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
		this.clusterConfigReader = new ClusterConfigReader();
	}

    Execute (): void{
		
		this.selectors.selectCluster().then(cluster => {
			this.selectors.selectRegion().then(region => {
				const terminal = Outputs.GetMainTerminal();
				if(cluster && region){						
					terminal.show(true);				
					this.clusterConfigReader.findCluster(cluster||"",region||"").then((c) => { 
						if(c){		
							terminal.sendText(`kubectl config delete-context ${c}`);		
							terminal.sendText(`echo "${c}" already exist in your contexts`);
							terminal.sendText(`echo Context "${c}" deleted`);
							
						}
						terminal.sendText(` echo "Start Creating Cluster"`);
						terminal.sendText(`eksctl create cluster --name ${cluster} --region ${region} --node-type t3.xlarge --nodes 2 --nodes-min 1 --nodes-max 3`);
							
						terminal.sendText(`cd ${this.conf.astPath}/helm`);
						terminal.sendText("make ecr");
						terminal.sendText("helm dep up ast");
						terminal.sendText("helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml --install");
						terminal.sendText(`$x=1; while ($x -lt 60 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -lt 60) {echo "Waiting Pods to be created"}}`);
						terminal.sendText(`'Macro finished'`);		
								
						
					});	
				} else terminal.sendText(`Operation Canceled`);
			});		
		});		
	}
}