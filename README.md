# NmapScanner

A Node.js module to automate network scanning using Nmap. This module provides simple methods to scan a single port or multiple ports and generate results in JSON format.

## Requirements
* Node.js
* Nmap

## Installation
To install the NmapScanner module, run the following command in your terminal:

```js
npm install nmapscanner
```

## Usage
To use NmapScanner, simply require it in your Node.js project and create a new instance of the class.

```js
const NmapScanner = require('nmapscanner');
const scanner = new NmapScanner();
```

### Scanning a Single Port
The nmapScan method can be used to scan a single port on a host. Simply pass the host and port as arguments.
```js
scanner.nmapScan('hostname', 'port');
```

### Scanning Multiple Ports
The nmapScanJSONGenerate method can be used to scan multiple ports on a host and generate a JSON file with the results. Simply pass the host and a string of comma-separated ports as arguments.

```js
scanner.nmapScanJSONGenerate('hostname', 'port1,port2,port3');
```

The generated JSON file will be named scan_hostname.json and will be saved in the current directory.