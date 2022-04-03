export class Service{

	name: string;
	path: string;
	chartParth:string;
	constructor(serviceName: string, servicePath: string){
		this.name = serviceName;
		this.path = servicePath;
		this.chartParth = "";
	}


}