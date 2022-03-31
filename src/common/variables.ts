/* eslint-disable prefer-const */
import * as vscode from 'vscode';
export class Variables {

  public context: vscode.ExtensionContext;
    constructor(context: vscode.ExtensionContext){
		this.context = context;
	}

  Replace(variable:string, value:string) : void {
		const collection = this.context.environmentVariableCollection;
		collection.replace(variable,value);
  }

  Add(variable:string, value:string) : void {
		const collection = this.context.environmentVariableCollection;
    collection.append(variable,value);
  }

  Clear(){
    this.context.environmentVariableCollection.clear();    
  }
}