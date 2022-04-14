/* eslint-disable @typescript-eslint/no-empty-function */
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';

export class AstUpgradeMacro implements IMacro {
	
	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();

	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			terminal.sendText(`cd ${this.conf.astPath}/helm`);			
			terminal.sendText("helm dep up ast");
			terminal.sendText("helm upgrade main ast -f ./ast/values-customer.yaml -f ./ast/values-release-tags.yaml ");
			terminal.sendText(`'Macro finished'`);
		
	}
}