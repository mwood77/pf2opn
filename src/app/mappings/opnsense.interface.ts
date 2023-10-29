export interface opnRoot {
  opnsense: Opnsense;
}

export interface Opnsense {
  version: number;
  'config-apply': Configapply;
  system: System;
  interfaces: Interfaces;
  firewall: Firewall;
}

export interface Firewall {
  rules: Rule[];
}

// export interface Rules {
//   rule: Rule[];
// }

export interface Rule {
  uuid: string;
  type: string;
  enabled: number;
  interface: string;
  descr: string;
  protocol: string;
  source: Source;
  destination: Destination;
}

export interface Destination {
  address: string;
  port: number;
}

export interface Source {
  any: number;
}

export interface Interfaces {
  lan: Lan[];
  wan: Wan[];
}

export interface Wan {
  enable: number;
  ipaddr: string;
  subnet: number;
  gateway: string;
  descr: string;
}

export interface Lan {
  enable: number;
  ipaddr: string;
  subnet: number;
  descr: string;
}

export interface System {
  hostname: string;
  domain: string;
  timezone: string;
  language: string;
}

export interface Configapply {
  uuid: string;
}