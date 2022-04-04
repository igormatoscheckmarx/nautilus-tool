/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "./selectors";
import {Guid} from "./guid";
import {Outputs} from "./outputs";
import {AppConfig}  from '../models/AppConfig';
import {Service}  from '../models/Service';
import { parse, stringify } from 'yaml';

//import YAML from 'yaml'
export class ServicePortReader{

	conf: AppConfig = AppConfig.getInstance();
    constructor(){}

    Read = (service:Service): Promise<any> =>{
		const cx = this.conf;
		return new Promise(function (resolve, reject){
			const uri= `${cx.astPath}${service.chartPath}/values.yaml`;
			vscode.workspace.openTextDocument(uri).then((document) => {
				const text = document.getText();
				//potFoward here
				const serviceValues = parse(text);			
				resolve(serviceValues.service.grpcPort);				
			});
		});
	}
}