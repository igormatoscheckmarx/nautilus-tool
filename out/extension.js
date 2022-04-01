'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const commandRegister_1 = require("./registers/commandRegister");
const macroRegister_1 = require("./registers/macroRegister");
const deployServiceMacro_1 = require("./macros/deployServiceMacro");
function activate(context) {
    const commandRegister = new commandRegister_1.CommandRegister(context);
    const macroRegister = new macroRegister_1.MacroRegister(context);
    //const variables = new Variables(context);
    //TerminalCluster Example
    const terminalCluster = new commandRegister_1.TerminalCluster("astGrafanaPortFowarding");
    terminalCluster.Add("Grafana:3000", ["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"], "Access Grafana in http://localhost:3000");
    terminalCluster.Add("Prometheus:9090", ["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"], "Access Prometheus in http://localhost:9090");
    commandRegister.RegisterCluster(terminalCluster);
    //Single Terminal Example
    commandRegister.Register("java", ["mvn clean install -DskipTests"], "", "mavenCompile");
    //Single Macro Example
    macroRegister.Register(new deployServiceMacro_1.DeployServiceMacro(), "astDeployService");
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map