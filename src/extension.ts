'use strict';
import * as vscode from 'vscode';
import {CommandRegister,TerminalCluster} from "./registers/commandRegister";
import {MacroRegister} from "./registers/macroRegister";
import {DeployServiceMacro} from "./macros/deployServiceMacro";
import {Variables} from "./common/variables";

export function activate(context: vscode.ExtensionContext) {
		
	const commandRegister = new CommandRegister(context);
	const macroRegister = new MacroRegister(context);
	//const variables = new Variables(context);

	//TerminalCluster Example
	const terminalCluster = new TerminalCluster("astGrafanaPortFowarding");
	terminalCluster.Add("Grafana:3000",["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"],"Access Grafana in http://localhost:3000");
	terminalCluster.Add("Prometheus:9090",["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"],"Access Prometheus in http://localhost:9090");	
	commandRegister.RegisterCluster(terminalCluster);

	//Single Terminal Example
	commandRegister.Register("java",["mvn clean install -DskipTests"],"","mavenCompile");

	//Single Macro Example
	macroRegister.Register(new DeployServiceMacro(),"astDeployService");

	
}
