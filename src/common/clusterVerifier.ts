/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "./selectors";
import {Guid} from "./guid";
import {Outputs} from "./outputs";
import {AppConfig}  from '../models/AppConfig';
import {Service}  from '../models/Service';
import { parse, stringify } from 'yaml';
import * as cp from 'child_process';
import {List} from 'ts-generic-collections-linq';
//import YAML from 'yaml'
export class ClusterConfigReader{

	conf: AppConfig = AppConfig.getInstance();
    constructor(){}
	FindCluster = (cluster:string, region:string): Promise<any> =>{
		const cx = this.conf;
		return new Promise(function (resolve, reject){
			const verb = cx.isWindows?"findstr":"grep";
			
			cp.exec(`kubectl config get-contexts | ${verb} ${cluster}`, {cwd: vscode.workspace.rootPath, env: process.env}, (e, stdout) => {
				if (stdout) {
					const lines = stdout.split("\n");
					const line = new List(lines).firstOrDefault(x=> x.indexOf(region)>0 && x.indexOf(cluster)>0);
					if(line){
						const cols = line.split(" ");
						const newCluster = new List(cols).firstOrDefault(x=> x.indexOf(cluster)>0);
						if(newCluster)
							resolve(newCluster);	
						else resolve(null);	
					}else resolve(null);	
				}else resolve(null);		
			});
		});
	}
}
