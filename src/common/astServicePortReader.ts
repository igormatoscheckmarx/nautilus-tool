/* eslint-disable @typescript-eslint/no-empty-function */
import * as vscode from 'vscode';
import {IMacro} from "../registers/macroRegister";
import {Selectors} from "../common/selectors";
import {Guid} from "../common/guid";
import {Outputs} from "../common/outputs";
import {Config}  from '../common/readConfig';
import {AppConfig}  from '../models/AppConfig';
import {Service}  from '../models/Service';
export class astServicePortReader{

	conf: AppConfig = new Config().getConfig();
    constructor(){}

    Read (service:Service): void{
		const uri= `${service.chartParth}`;
		vscode.workspace.openTextDocument(uri).then((document) => {
			const text = document.getText();
			//potFoward here
		});
	}
}