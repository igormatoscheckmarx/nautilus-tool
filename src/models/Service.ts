export class Service{

	name: string;
	path: string;
	chartPath:string;
	constructor(serviceName: string, servicePath: string){
		this.name = serviceName;
		this.path = servicePath;
		this.chartPath = "";
	}


}