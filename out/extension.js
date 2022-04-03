'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const commandRegister_1 = require("./registers/commandRegister");
const macroRegister_1 = require("./registers/macroRegister");
const deployServiceMacro_1 = require("./macros/deployServiceMacro");
const deleteServiceMacro_1 = require("./macros/deleteServiceMacro");
const deleteClusterMacro_1 = require("./macros/deleteClusterMacro");
function activate(context) {
    const commandRegister = new commandRegister_1.CommandRegister(context);
    const macroRegister = new macroRegister_1.MacroRegister(context);
    //Commands
    const terminalCluster = new commandRegister_1.TerminalCluster("astGrafanaPortFowarding");
    terminalCluster.AddTerminal("Grafana:3000", ["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"], "Access Grafana in http://localhost:3000");
    terminalCluster.AddTerminal("Prometheus:9090", ["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"], "Access Prometheus in http://localhost:9090");
    commandRegister.RegisterCluster(terminalCluster);
    commandRegister.Register("java", ["mvn clean install -DskipTests"], "", "mavenCompile");
    //Macros
    macroRegister.Register(new deployServiceMacro_1.DeployServiceMacro(), "astDeployService");
    macroRegister.Register(new deleteServiceMacro_1.DeleteServiceMacro(), "astDeleteService");
    macroRegister.Register(new deleteClusterMacro_1.DeleteClusterMacro(), "astDeleteCluster");
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map