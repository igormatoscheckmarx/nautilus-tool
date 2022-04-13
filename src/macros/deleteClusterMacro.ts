/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';
import { Service } from '../models/Service';
import * as readline from 'readline';

export class DeleteClusterMacro /*extends LambdaExecuterBase*/ implements IMacro {

	selectors : Selectors;
	conf: AppConfig = AppConfig.getInstance();
	portReader = new ServicePortReader();
    constructor(){		
		this.selectors = new Selectors();
	}

    Execute (): void{
		
		this.selectors.SelectCluster().then(cluster => {
			const terminal = Outputs.GetMainTerminal();
			terminal.show(true);
			
			if(cluster){			
				//string a = terminal.sendText("are you sure?");
				const rl = readline.createInterface({input: process.stdin,output: process.stdout	});
				rl.question('Is this example useful? [y/n] ', (answer) => {
				switch(answer.toLowerCase()) {
					case 'y':
					console.log('Super!');
					break;
					case 'n':
					console.log('Sorry! :(');
					break;
					default:
					console.log('Invalid answer!');
				}
				rl.close();
				});			
							
				//terminal.sendText(`Deleting Cluster ${cluster}`);
				terminal.sendText(`cd ${this.conf.astPath}/helm`);
				
				terminal.sendText("make uninstall");
				terminal.sendText(`$x=1; while ($x -ge 1 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be deleted"}}`);
				//terminal.sendText("make prom-down");
				terminal.sendText("make purge");
				//terminal.sendText("helm uninstall aws-ecr-credential");
				//terminal.sendText(`x=0;while [ $x -le 1 ];do sleep 2; x=$(kubectl get pods |  wc -l); if [ $x>0 ]; then echo "Waiting Pods to be deleted"; else x=2;  fi; done`);
				//terminal.sendText(`$x=1; while ($x -ge 1 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be deleted"}}`);
				
				//terminal.sendText(`eksctl delete cluster -n ${cluster} -r eu-west-1`);	
				terminal.sendText(`eksctl delete cluster -n ${cluster} -r eu-west-3`);							
				terminal.sendText(`'Macro finished'`);		
			} else terminal.sendText(`Operation Canceled`);
			
			
		});		
	}
}