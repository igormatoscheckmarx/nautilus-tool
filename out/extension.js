'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const commandBuilder_1 = require("./builders/commandBuilder");
const macroBuilder_1 = require("./builders/macroBuilder");
const deployServiceMacro_1 = require("./macros/deployServiceMacro");
const variables_1 = require("./common/variables");
function activate(context) {
    const commandBuilder = new commandBuilder_1.CommandBuilder(context);
    const macroBuilder = new macroBuilder_1.MacroBuilder(context);
    const variables = new variables_1.Variables(context);
    //TerminalCluster Example
    const terminalCluster = new commandBuilder_1.TerminalCluster("astGrafanaPortFowarding");
    terminalCluster.Add("Grafana:3000", ["kubectl port-forward svc/kube-prometheus-stack-grafana 3000:80"], "Access Grafana in http://localhost:3000");
    terminalCluster.Add("Prometheus:9090", ["kubectl port-forward svc/kube-prometheus-stack-prometheus 9090"], "Access Prometheus in http://localhost:9090");
    commandBuilder.BuildCluster(terminalCluster);
    //Single Terminal Example
    commandBuilder.BuildTerminal("java", ["mvn clean install -DskipTests"], "", "mavenCompile");
    //Single Macro Example
    macroBuilder.BuildMacro(new deployServiceMacro_1.DeployServiceMacro(), "astDeployService");
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map