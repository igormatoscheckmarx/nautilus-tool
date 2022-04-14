/* eslint-disable @typescript-eslint/no-empty-function */
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';

export class PortoForwardMacro implements IMacro {

	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.selectService().then(service => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);

			if(service){	
				//if(service =="publisher")
				//var yml = open application.yaml <- parse yml 
				//foreach(var client = yml.grpc.client){
					//not client name but the VAR such "REPOS_MANAGER_GRPC_ADDR" and then get the address
				//this.portReader.Read(client.name).then((port) => { 
				//	console.log(port);
					//terminal.sendText(`kubectl port-forward svc/${client.name} ${port}`);
				//});
				//}
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}