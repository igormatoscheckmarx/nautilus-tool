export class Constants{
  
	public APP_NAME: string;
	public NAUTILUS_AWS: string;
	public NAUTILUS_KUBE: string;
	public NAUTILUS_AST: string;

	constructor(){

		this.NAUTILUS_AWS = "Nautilus AWS";
		this.NAUTILUS_KUBE = "Nautilus KUBERNETS";
		this.NAUTILUS_AST = "Nautilus AST";		
		this.APP_NAME = "cxDevTools";
	}
}
export const AppConstants = new Constants();
