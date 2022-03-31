'use strict';
import * as vscode from 'vscode';
import {CommandBuilder,TerminalCluster} from "./builders/commandBuilder";
import {MacroBuilder} from "./builders/macroBuilder";
import {DeployServiceMacro} from "./macros/deployServiceMacro";

export function activate(context: vscode.ExtensionContext) {
	
	
	const commandBuilder = new CommandBuilder(context);
	const macroBuilder = new MacroBuilder(context);

	//TerminalCluster Example
	const terminalCluster = new TerminalCluster("astGrafanaPortFowarding");
	terminalCluster.Add("Grafana:3000",["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"],"Access Grafana in http://localhost:3000");
	terminalCluster.Add("Prometheus:9090",["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"],"Access Prometheus in http://localhost:9090");	
	commandBuilder.BuildCluster(terminalCluster);

	//Single Terminal Example
	commandBuilder.BuildTerminal("java",["mvn clean install -DskipTests"],"","mavenCompile");

	//Single Macro Example
	macroBuilder.BuildMacro(new DeployServiceMacro(),"astDeployService");
}
