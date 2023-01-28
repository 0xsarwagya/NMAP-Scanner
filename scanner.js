const Nmap = require("node-nmap");
const fs = require("fs");

class NmapScanner {
  constructor() {
    this.nmsc = new Nmap.NmapScan();
  }

  async nmapScan(host, port) {
    try {
      console.log(`Checking port ${port} ..........`);
      await this.nmsc.scan(host, port);

      // Command info
      console.log(`[*] Execuing command: ${this.nmsc.command}`);
      const state = this.nmsc.getPorts(port, "tcp", "open")[0].state;
      console.log(`[+] ${host} tcp/${port} ${state}`);
      const info = this.nmsc.getPorts(port, "tcp", "open")[0];
      console.log(info);
      const server = info.service.name;
      const version = info.service.version;
      console.log(`[+] ${server} ${version} tcp/${port}`);
    } catch (error) {
      console.error(`Error to connect with ${host} for port scanning`);
    }
  }

  async nmapScanJSONGenerate(host, ports) {
    try {
      console.log(`Checking ports ${ports} ..........`);
      await this.nmsc.scan(host, ports);

      // Command info
      console.log(`[*] Execuing command: ${this.nmsc.command}`);
      const results = {};

      const openPorts = this.nmsc.getPorts(ports, "tcp", "open");
      openPorts.forEach((port) => {
        const host = port.host;
        const proto = "tcp";
        const portNumber = port.port;
        const state = port.state;

        if (state === "open") {
          if (!results[host]) {
            results[host] = [];
          }
          results[host].push({ [proto]: portNumber });
        }
      });

      // Store info
      const fileInfo = `scan_${host}.json`;
      fs.writeFileSync(fileInfo, JSON.stringify(results));
      console.log(`[*] File '${fileInfo}' was generated with scan results`);
    } catch (error) {
      console.error(error);
      console.error(`Error to connect with ${host} for port scanning`);
    }
  }
}
