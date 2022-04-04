/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "./selectors";
import {Guid} from "./guid";
import {Outputs} from "./outputs";
import {Config}  from './readConfig';
import {AppConfig}  from '../models/AppConfig';
import {Service}  from '../models/Service';
import { parse, stringify } from 'yaml';

//import YAML from 'yaml'
export class ServicePortReader{

	conf: AppConfig = new Config().getConfig();
    constructor(){}

    Read (service:Service): void{
		const uri= `${this.conf.astPath}${service.chartPath}/values.yaml`;
		vscode.workspace.openTextDocument(uri).then((document) => {
			const text = document.getText();
			//potFoward here
			const serviceValues = parse(text);
			console.log(serviceValues.service.grpcPort);
		});
	}
}