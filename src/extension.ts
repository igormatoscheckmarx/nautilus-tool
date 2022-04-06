'use strict';
import * as vscode from 'vscode';
import {CommandRegister,TerminalCluster} from "./registers/commandRegister";
import {MacroRegister} from "./registers/macroRegister";
import {DeployServiceMacro,} from "./macros/deployServiceMacro";
import {DeleteServiceMacro,} from "./macros/deleteServiceMacro";
import { DebugModeMacro } from './macros/debugModeMacro';
import {CreateClusterMacro,} from "./macros/CreateClusterMacro";
import {DeleteClusterMacro ,} from './macros/deleteClusterMacro';
import {AstUpgradeMacro ,} from './macros/AstUpgradeMacro';

export function activate(context: vscode.ExtensionContext) {
		
	const commandRegister = new CommandRegister(context);
	const macroRegister = new MacroRegister(context);
	
	//Commands
	const terminalCluster = new TerminalCluster("astGrafanaPortFowarding");
	terminalCluster.AddTerminal("Grafana:3000",["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"],"Access Grafana in http://localhost:3000");
	terminalCluster.AddTerminal("Prometheus:9090",["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"],"Access Prometheus in http://localhost:9090");	
	commandRegister.RegisterCluster(terminalCluster);
	
	commandRegister.Register("java",["mvn clean install -DskipTests"],"","mavenCompile");	

	//Macros
	macroRegister.Register(new DeployServiceMacro(),"astDeployService");
	macroRegister.Register(new DeleteServiceMacro(),"astDeleteService");
	macroRegister.Register(new DeleteClusterMacro(),"astDeleteCluster");
	macroRegister.Register(new DebugModeMacro(),"astDebugMode");
	macroRegister.Register(new CreateClusterMacro(),"astCreateCluster");
	macroRegister.Register(new AstUpgradeMacro(),"astUpgrade");
	
}
