import * as vscode from 'vscode';

/* eslint-disable @typescript-eslint/no-empty-function */
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Outputs} from "../common/outputs";
import {AppConfig}  from '../models/AppConfig';
import {ServicePortReader}  from '../common/servicePortReader';

export class DeleteClusterMacro implements IMacro {

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
                    terminal.sendText(`clear`);
					terminal.sendText(` $name_cluster = Read-Host -Prompt 'To make sure you want to delete the cluster name  ${cluster} Please enter "delete cluster name  ${cluster}"' `,true );
                    terminal.sendText(`if ($name_cluster -ne "delete cluster name  ${cluster}") {exit}`);

                    terminal.sendText(`echo "Deleting Cluster ${cluster}"`);
                    terminal.sendText(`cd ${this.conf.astPath}/helm`);
                    terminal.sendText("make uninstall");
                    terminal.sendText("make prom-down");                
    
                    if(this.conf.isWindows){
                        terminal.sendText(`$x=1; while ($x -ge 1 ) {sleep 2 ;$x=kubectl get pods | Measure-Object | %{$_.Count}; if ($x -ge 1) {echo "Waiting Pods to be deleted"}}`);
                    }                       
                    else {
                        terminal.sendText(`x=0;while [ $x -le 1 ];do sleep 2; x=$(kubectl get pods |  wc -l); if [ $x>0 ]; then echo $x ' Waiting Pods to be deleted';x=2; else x=2; fi; done`);
                    }
                    
                    terminal.sendText("make purge");
                    terminal.sendText(`eksctl delete cluster -n ${cluster} -r  ${region}`);     
                
                                        
                    terminal.sendText(`'Macro finished'`);      
                } else terminal.sendText(`Operation Canceled`);
                
                
            });     
            
            
        });     
    }
}

