export interface pfRoot {
  '?xml': string;
  pfsense: Pfsense;
}

export interface Pfsense {
  version: string;
  lastchange: string;
  system: System;
  interfaces: Interfaces;
  nat: Nat;
  firewall: Firewall;
}

export interface Firewall {
  rule: Rule;
}

export interface Rule {
  [x: string]: any;
  if: string;
  descr: string;
  proto: string;
  src: string;
  dst: string;
  dstport: number;
}

export interface Nat {
  outbound: Outbound;
}

export interface Outbound {
  mode: string;
}

export interface Interfaces {
  lan: Lan;
  wan: Wan;
}

export interface Lan {
    enable: string;
    if: string;
    descr: string;
    spoofmac: string;
    ipaddr: string;
    subnet: number;
    gateway: string;
    ipaddrv6: string;
    subnetv6: string;
    gatewayv6: string;
}

export interface Wan {
    enable: string;
    if: string;
    descr: string;
    'alias-address': string;
    'alias-subnet': number;
    spoofmac: string;
    ipaddr: string;
    dhcphostname: string;
    dhcprejectfrom: string;
    adv_dhcp_pt_timeout: string;
    adv_dhcp_pt_retry: string;
    adv_dhcp_pt_select_timeout: string;
    adv_dhcp_pt_reboot: string;
    adv_dhcp_pt_backoff_cutoff: string;
    adv_dhcp_pt_initial_interval: string;
    adv_dhcp_pt_values: string;
    adv_dhcp_send_options: string;
    adv_dhcp_request_options: string;
    adv_dhcp_required_options: string;
    adv_dhcp_option_modifiers: string;
    adv_dhcp_config_advanced: string;
    adv_dhcp_config_file_override: string;
    adv_dhcp_config_file_override_path: string;
}

export interface System {
  hostname: string;
  domain: string;
  timezone: string;
  language: string;
}