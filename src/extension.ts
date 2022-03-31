'use strict';
import * as vscode from 'vscode';
import {CommandBuilder,XTerminalCluster} from "./builders/commandBuilder";

export function activate(context: vscode.ExtensionContext) {
	
	
	const commandBuilder = new CommandBuilder(context);
	const terminalCluster = new XTerminalCluster("FowardGrafana");
	terminalCluster.Add("Grafana:3000",["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"],"Access Grafana in http://localhost:3000");
	terminalCluster.Add("Prometheus:9090",["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"],"Access Prometheus in http://localhost:9090");	
	commandBuilder.BuildCluster(terminalCluster);

	commandBuilder.BuildTerminal("java",["mvn clean install -DskipTests"],"","MavenCompile");







	//console.log("Terminals: " + (<any>vscode.window).terminals.length);
	// vscode.window.onDidOpenTerminal
	/*vscode.window.onDidOpenTerminal(terminal => {
		console.log("Terminal opened. Total count: " + (<any>vscode.window).terminals.length);
	});*/
	/*vscode.window.onDidOpenTerminal((terminal: vscode.Terminal) => {
		vscode.window.showInformationMessage(`onDidOpenTerminal, name: ${terminal.name}`);
	});*/

	// vscode.window.onDidChangeActiveTerminal
	/*vscode.window.onDidChangeActiveTerminal(e => {
		console.log(`Active terminal changed, name=${e ? e.name : 'undefined'}`);
	});*/

	// vscode.window.createTerminal
	/*context.subscriptions.push(vscode.commands.registerCommand('terminalTest.createTerminal', () => {
		//vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);
		vscode.window.showInformationMessage('Hello World 2!');
	}));*/
	/*context.subscriptions.push(vscode.commands.registerCommand('terminalTest.createTerminalHideFromUser', () => {
		vscode.window.createTerminal({
			//name: `Ext Terminal #${NEXT_TERM_ID++}`,
			hideFromUser: true
		} as any);
	}));*/
	//context.subscriptions.push(vscode.commands.registerCommand('terminalTest.createAndSend', () => {
		/*const terminal = vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`);
		terminal.sendText("echo 'Sent text immediately after creating'");
		terminal.sendText("kubectl");*/
	//}));
	/*context.subscriptions.push(vscode.commands.registerCommand('terminalTest.createZshLoginShell', () => {
		//vscode.window.createTerminal(`Ext Terminal #${NEXT_TERM_ID++}`, '/bin/zsh', ['-l']);
	}));*/

	// Terminal.hide
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.PushPublisherImage', () => {
		if (ensureTerminalExists()) {
			selectService().then(service => {
				if (service) {
					const terminal = vscode.window.createTerminal(`Push Image`, '/bin/bash', ['-l']);
					if (terminal) {
						terminal.show(true);
						terminal.sendText("aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 822112283600.dkr.ecr.eu-west-1.amazonaws.com");
						terminal.sendText(`kubectl delete deployment   main-${service}`);
						//terminal.sendText(`docker build -t 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${NEXT_TERM_ID} .`);
						//terminal.sendText(`docker push 822112283600.dkr.ecr.eu-west-1.amazonaws.com/${service}:nautilus${NEXT_TERM_ID} `);
						//NEXT_TERM_ID++;
					
					}
				}
			});			
		}
	}));

	// Terminal.show

	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.showPreserveFocus', () => {
		if (ensureTerminalExists()) {
			selectTerminal().then(terminal => {
				if (terminal) {
					terminal.show(true);
				}
			});
		}
	}));

	// Terminal.sendText
	/*context.subscriptions.push(vscode.commands.registerCommand('terminalTest.Compile', () => {
		if (ensureTerminalExists()) {
			const terminal = vscode.window.createTerminal(`Maven`, '/bin/bash', ['-l']);
			terminal.show(true);
			//selectTerminal().then(terminal => {
				if (terminal) {
					terminal.sendText("echo 'Nautilus Maven Compiling'");
					terminal.sendText("mvn clean install -DskipTests");
				
					//vscode.
					
				}
			//});
		}
	}));*/
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.ForwardPublisherDependencies', () => {
		if (ensureTerminalExists()) {
			const terminal1 = vscode.window.createTerminal(`Rabbit:15672`, '/bin/bash', ['-l']);
			terminal1.show(true);
			if (terminal1) {terminal1.sendText("kubectl port-forward service/main-rabbitmq 5672 15672");}			

			const terminal2 = vscode.window.createTerminal(`Datastore:6010`, '/bin/bash', ['-l']);
			terminal2.show(true);
			if (terminal2) {terminal2.sendText("kubectl port-forward service/main-integrations-datastore 6010");}			

			const terminal3 = vscode.window.createTerminal(`SastResults:6500 26501 26503`, '/bin/bash', ['-l']);
			terminal3.show(true);
			if (terminal3) {terminal3.sendText("kubectl port-forward service/main-sast-results 26500 26501 26503");}	

			const terminal4 = vscode.window.createTerminal(`ReposManages:6001`, '/bin/bash', ['-l']);
			terminal4.show(true);
			if (terminal4) {terminal4.sendText("kubectl port-forward service/main-integrations-repos-manager 6001");}	
		}
	}));

	// Terminal.dispose
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.dispose', () => {
		if (ensureTerminalExists()) {
			selectTerminal().then(terminal => {
				if (terminal) {
					terminal.dispose();
				}
			});
		}
	}));

	// Terminal.processId
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.processId', () => {
		selectTerminal().then(terminal => {
			if (!terminal) {
				return;
			}
			terminal.processId.then((processId) => {
				if (processId) {
					vscode.window.showInformationMessage(`Terminal.processId: ${processId}`);
				} else {
					vscode.window.showInformationMessage('Terminal does not have a process ID');
				}
			});
		});
	}));

	// vscode.window.onDidCloseTerminal
	vscode.window.onDidCloseTerminal((terminal) => {
		vscode.window.showInformationMessage(`onDidCloseTerminal, name: ${terminal.name}`);
	});

	// vscode.window.terminals
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.terminals', () => {
		selectTerminal();
	}));

	// ExtensionContext.environmentVariableCollection
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.updateEnvironment', () => {
		const collection = context.environmentVariableCollection;
		collection.replace('FOO', 'BAR');
		collection.append('PATH', '/test/path');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.clearEnvironment', () => {
		context.environmentVariableCollection.clear();
	}));

	// vvv Proposed APIs below vvv

	// vscode.window.onDidWriteTerminalData
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.onDidWriteTerminalData', () => {
		(<any>vscode.window).onDidWriteTerminalData((e: any) => {
			vscode.window.showInformationMessage(`onDidWriteTerminalData listener attached, check the devtools console to see events`);
			console.log('onDidWriteData', e);
		});
	}));

	// vscode.window.onDidChangeTerminalDimensions
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.onDidChangeTerminalDimensions', () => {
		vscode.window.showInformationMessage(`Listening to onDidChangeTerminalDimensions, check the devtools console to see events`);
		(<any>vscode.window).onDidChangeTerminalDimensions((event: any) => {
			console.log(`onDidChangeTerminalDimensions: terminal:${event.terminal.name}, columns=${event.dimensions.columns}, rows=${event.dimensions.rows}`);
		});
	}));

	// vscode.window.registerTerminalLinkProvider
	context.subscriptions.push(vscode.commands.registerCommand('terminalTest.registerTerminalLinkProvider', () => {
		(<any>vscode.window).registerTerminalLinkProvider({
			provideTerminalLinks: (context: any, token: vscode.CancellationToken) => {
				// Detect the first instance of the word "link" if it exists and linkify it
				const startIndex = (context.line as string).indexOf('link');
				if (startIndex === -1) {
					return [];
				}
				return [
					{
						startIndex,
						length: 'link'.length,
						tooltip: 'Show a notification',
						// You can return data in this object to access inside handleTerminalLink
						data: 'Example data'
					}
				];
			},
			handleTerminalLink: (link: any) => {
				vscode.window.showInformationMessage(`Link activated (data = ${link.data})`);
			}
		});
	}));

	context.subscriptions.push(vscode.window.registerTerminalProfileProvider('terminalTest.terminal-profile', {
		provideTerminalProfile(token: vscode.CancellationToken): vscode.ProviderResult<vscode.TerminalProfile> {
			return {
				options: {
					name: 'Terminal API',
					shellPath: process.title || 'C:/Windows/System32/cmd.exe'
				}
			};
		}
	}));
}

function colorText(text: string): string {
	let output = '';
	let colorIndex = 1;
	for (let i = 0; i < text.length; i++) {
		const char = text.charAt(i);
		if (char === ' ' || char === '\r' || char === '\n') {
			output += char;
		} else {
			output += `\x1b[3${colorIndex++}m${text.charAt(i)}\x1b[0m`;
			if (colorIndex > 6) {
				colorIndex = 1;
			}
		}
	}
	return output;
}

function selectTerminal(): Thenable<vscode.Terminal | undefined> {
	interface TerminalQuickPickItem extends vscode.QuickPickItem {
		terminal: vscode.Terminal;
	}
	const terminals = <vscode.Terminal[]>(<any>vscode.window).terminals;
	const items: TerminalQuickPickItem[] = terminals.map(t => {
		return {
			label: `name: ${t.name}`,
			terminal: t
		};
	});
	return vscode.window.showQuickPick(items).then(item => {
		return item ? item.terminal : undefined;
	});
}


function selectService(): Thenable<string | undefined> {
	interface ServiceQuickPickItem extends vscode.QuickPickItem {
		service: string;
	}
	const services:string[] = ["ast-flow-publisher","ast-flow-listener","integrations-repos-manager","feedback-app"];
	
	return vscode.window.showQuickPick(services).then(item => {
		return item ? item : undefined;
	});
}

function ensureTerminalExists(): boolean {
	if ((<any>vscode.window).terminals.length === 0) {
		vscode.window.showErrorMessage('No active terminals');
		return false;
	}
	return true;
}
