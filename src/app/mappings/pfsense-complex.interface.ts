export interface pfRoot {
  pfsense?: Pfsense;
}

export interface Pfsense {
  version?: number;
  lastchange?: string;
  theme?: string;
  sysctl?: Sysctl;
  system?: System;
  interfaces?: Interfaces;
  staticroutes?: string;
  dhcpd?: Dhcpd;
  dnsmasq?: Dnsmasq;
  snmpd?: Snmpd;
  diag?: Diag;
  bridge?: string;
  syslog?: Syslog;
  nat?: Nat;
  filter?: Filter;
  shaper?: string;
  ipsec?: Ipsec;
  aliases?: Aliases;
  proxyarp?: string;
  cron?: Cron;
  wol?: string;
  rrd?: Rrd;
  load_balancer?: string;
  widgets?: Widgets;
  revision?: Revision;
  openvpn?: Openvpn;
  dnshaper?: string;
  cert?: Cert[];
  installedpackages?: Installedpackages;
  ppps?: string;
  gateways?: Gateways;
  dyndnses?: Dyndnses;
  ezshaper?: Ezshaper;
  ca?: Ca;
  ovpnserver?: Ovpnserver;
  dhcrelay?: string;
  crl?: Crl;
  bridges?: Bridges;
  dhcpdv6?: Dhcpd;
  dhcrelay6?: string;
  ntpd?: string;
  firewall: Firewall;
}

export interface Firewall {
  rule: Rule[];
}

export interface Bridges {
  bridged?: Bridged;
}

export interface Bridged {
  members?: string;
  descr?: string;
  maxaddr?: string;
  timeout?: string;
  maxage?: string;
  fwdelay?: string;
  hellotime?: string;
  priority?: string;
  proto?: string;
  holdcnt?: string;
  ifpriority?: string;
  ifpathcost?: string;
  bridgeif?: string;
}

export interface Crl {
  refid?: string;
  descr?: string;
  caref?: string;
  method?: string;
  serial?: number;
  lifetime?: number;
  '#text'?: number;
}

export interface Ovpnserver {
  step1?: Step12;
  step6?: Step6;
  step9?: Step9;
  step10?: Step10;
  step11?: Step11;
}

export interface Step11 {
  ovpnrule?: string;
  ovpnallow?: string;
}

export interface Step10 {
  protocol?: string;
  localport?: number;
  descr?: string;
  tlsauth?: string;
  gentlskey?: string;
  dhkey?: number;
  crypto?: string;
  engine?: string;
  tunnelnet?: string;
  localnet?: string;
  dynip?: string;
  addrpool?: string;
  nbttype?: number;
  interface?: string;
  digest?: string;
  advanced?: string;
}

export interface Step9 {
  certname?: string;
  keylength?: number;
  lifetime?: number;
  country?: string;
  state?: string;
  city?: string;
  organization?: string;
  email?: string;
  authcertname?: string;
}

export interface Step6 {
  authcertca?: string;
}

export interface Step12 {
  type?: string;
}

export interface Ca {
  refid?: string;
  descr?: string;
  crt?: string;
  prv?: string;
  serial?: number;
}

export interface Ezshaper {
  step1?: Step1;
  step3?: Step3;
  step5?: Step5;
  step7?: string;
  step2?: Step2;
}

export interface Step2 {
  downloadscheduler?: string;
  conn0uploadscheduler?: string;
  conn0upload?: number;
  conn0uploadspeed?: string;
  conn0download?: number;
  conn0downloadspeed?: string;
  conn0interface?: string;
}

export interface Step5 {
  enable?: string;
  bandwidthunit?: string;
  bittorrent?: string;
}

export interface Step3 {
  enable?: string;
  provider?: string;
  download?: number;
  downloadspeed?: string;
  conn0upload?: number;
  conn0uploadspeed?: string;
}

export interface Step1 {
  numberofconnections?: number;
}

export interface Dyndnses {
  dyndns?: Dyndns;
}

export interface Dyndns {
  type?: string;
  username?: string;
  password?: string;
  host?: string;
  mx?: string;
  verboselog?: string;
  enable?: string;
  interface?: string;
  zoneid?: string;
  ttl?: string;
  updateurl?: string;
  resultmatch?: string;
  requestif?: string;
  descr?: string;
  id?: number;
}

export interface Gateways {
  gateway_item?: Gatewayitem;
}

export interface Gatewayitem {
  interface?: string;
  gateway?: string;
  name?: string;
  weight?: number;
  ipprotocol?: string;
  descr?: string;
  monitor_disable?: string;
  defaultgw?: string;
}

export interface Installedpackages {
  squid?: Squid;
  squidcache?: Squidcache;
  squidguardgeneral?: Squidguardgeneral;
  squidguarddefault?: Squidguarddefault;
  miniupnpd?: Miniupnpd;
  freeradius?: Freeradius;
  freeradiusclients?: Freeradiusclients;
  bandwidthd?: Bandwidthd;
  lcdproc?: Lcdproc;
  lcdprocscreens?: Lcdprocscreens;
  darkstat?: Darkstat;
  snortglobal?: Snortglobal;
  package?: Package[];
  menu?: Menu[];
  service?: Service[];
  vpn_openvpn_export?: Vpnopenvpnexport;
}

export interface Vpnopenvpnexport {
  serverconfig?: Serverconfig;
  defaultsettings?: string;
}

export interface Serverconfig {
  item?: Item5;
}

export interface Item5 {
  pass?: string;
  proxypass?: string;
  server?: number;
  useaddr?: string;
  useaddr_hostname?: string;
  verifyservercn?: string;
  blockoutsidedns?: string;
  legacy?: string;
  randomlocalport?: string;
  usepkcs11?: string;
  pkcs11providers?: string;
  usetoken?: string;
  usepass?: string;
  useproxy?: string;
  useproxytype?: string;
  proxyaddr?: string;
  proxyport?: string;
  useproxypass?: string;
  proxyuser?: string;
  advancedoptions?: string;
}

export interface Service {
  name?: string;
  rcfile?: string;
  executable?: string;
  description?: string;
}

export interface Menu {
  name?: string;
  tooltiptext?: string;
  section?: string;
  url?: string;
}

export interface Package {
  name?: string;
  website?: string;
  descr?: string;
  version?: string;
  configurationfile?: string;
  tabs?: Tabs;
  include_file?: string;
  internal_name?: string;
  pkginfolink?: string;
  after_install_info?: string;
}

export interface Tabs {
  tab?: Tab[];
}

export interface Tab {
  text?: string;
  url?: string;
  active?: string;
  name?: string;
  tabgroup?: string;
}

export interface Snortglobal {
  snort_config_ver?: string;
  snortdownload?: string;
  snortcommunityrules?: string;
  emergingthreats?: string;
  emergingthreats_pro?: string;
  clearblocks?: string;
  oinkmastercode?: string;
  etpro_code?: string;
  rm_blocked?: string;
  autorulesupdate7?: string;
  rule_update_starttime?: string;
  forcekeepsettings?: string;
  last_rule_upd_status?: string;
  last_rule_upd_time?: number;
  whitelist?: string;
  suppress?: Suppress;
  dashboard_widget?: string;
  auto_manage_sids?: string;
  enable_log_mgmt?: string;
  alert_log_limit_size?: number;
  alert_log_retention?: number;
  appid_stats_log_limit_size?: number;
  appid_stats_log_retention?: number;
  event_pkts_log_limit_size?: number;
  event_pkts_log_retention?: number;
  sid_changes_log_limit_size?: number;
  sid_changes_log_retention?: number;
  stats_log_limit_size?: number;
  stats_log_retention?: number;
  verbose_logging?: string;
  openappid_detectors?: string;
}

export interface Suppress {
  item?: Item4;
}

export interface Item4 {
  uuid?: string;
  name?: string;
  descr?: string;
  suppresspassthru?: string;
}

export interface Darkstat {
  config?: Config11;
}

export interface Config11 {
  interface_array?: string;
}

export interface Lcdprocscreens {
  config?: Config10;
}

export interface Config10 {
  scr_version?: string;
  scr_time?: string;
  scr_uptime?: string;
  scr_hostname?: string;
  scr_system?: string;
  scr_disk?: string;
  scr_load?: string;
  scr_states?: string;
  scr_carp?: string;
  scr_ipsec?: string;
  scr_slbd?: string;
  scr_interfaces?: string;
  scr_mbuf?: string;
  scr_cpufrequency?: string;
  scr_traffic?: string;
  scr_traffic_interface?: string;
}

export interface Lcdproc {
  config?: Config9;
}

export interface Config9 {
  enable?: string;
  comport?: string;
  size?: string;
  driver?: string;
  connection_type?: string;
  refresh_frequency?: number;
  port_speed?: number;
  brightness?: number;
  offbrightness?: number;
  contrast?: number;
  backlight?: string;
  outputleds?: string;
}

export interface Bandwidthd {
  config?: Config8;
}

export interface Config8 {
  enable?: string;
  active_interface?: string;
  skipintervals?: string;
  graphcutoff?: number;
  promiscuous?: string;
  outputcdf?: string;
  recovercdf?: string;
  outputpostgresql?: string;
  postgresqlhost?: string;
  postgresqldatabase?: string;
  postgresqlusername?: string;
  sensorid?: string;
  drawgraphs?: string;
  meta_refresh?: number;
  graph_log_info?: string;
  advfilter?: string;
  postgresqlpasswordenc?: string;
}

export interface Freeradiusclients {
  config?: Config7;
}

export interface Config7 {
  client?: string;
  shortname?: string;
  sharedsecret?: string;
  description?: string;
}

export interface Freeradius {
  config?: Config6;
}

export interface Config6 {
  username?: string;
  password?: string;
  ip?: string;
  multiconnet?: number;
  expiration?: string;
  sessiontime?: string;
  onlinetime?: string;
  description?: string;
  vlanid?: string;
  additionaloptions?: string;
}

export interface Miniupnpd {
  config?: Config5;
}

export interface Config5 {
  enable?: string;
  enable_upnp?: string;
  enable_natpmp?: string;
  iface_array?: string;
  download?: string;
  upload?: string;
  overridewanip?: string;
  upnpqueue?: string;
  logpackets?: string;
  sysuptime?: string;
  permdefault?: string;
}

export interface Squidguarddefault {
  config?: Config4;
}

export interface Config4 {
  dest?: string;
  notallowingip?: string;
  deniedmessage?: string;
  redirect_mode?: string;
  redirect?: string;
  safesearch?: string;
  rewrite?: string;
  enablelog?: string;
}

export interface Squidguardgeneral {
  config?: Config3;
}

export interface Config3 {
  squidguard_enable?: string;
  enable_guilog?: string;
  enable_log?: string;
  log_rotation?: string;
  blacklist?: string;
  blacklist_proxy?: string;
  blacklist_url?: string;
}

export interface Squidcache {
  config?: Config2;
}

export interface Config2 {
  harddisk_cache_size?: number;
  harddisk_cache_system?: string;
  harddisk_cache_location?: string;
  memory_cache_size?: number;
  minimum_object_size?: number;
  maximum_object_size?: number;
  level1_subdirs?: number;
  memory_replacement_policy?: string;
  cache_replacement_policy?: string;
  cache_swap_low?: number;
  cache_swap_high?: number;
  donotcache?: string;
  enable_offline?: string;
}

export interface Squid {
  config?: Config;
}

export interface Config {
  active_interface?: string;
  allow_interface?: string;
  transparent_proxy?: string;
  private_subnet_proxy_off?: string;
  defined_ip_proxy_off?: string;
  defined_ip_proxy_off_dest?: string;
  log_enabled?: string;
  log_dir?: string;
  log_rotate?: number;
  proxy_port?: number;
  icp_port?: string;
  visible_hostname?: string;
  admin_email?: string;
  error_language?: string;
  disable_xforward?: string;
  disable_via?: string;
  uri_whitespace?: string;
  dns_nameservers?: string;
  disable_squidversion?: string;
  custom_options?: string;
}

export interface Cert {
  refid?: string;
  descr?: string;
  crt?: string;
  prv?: string;
  caref?: string;
  type?: string;
}

export interface Openvpn {
  'openvpn-server'?: Openvpnserver[];
  'openvpn-csc'?: Openvpncsc[];
}

export interface Openvpncsc {
  custom_options?: string;
  common_name?: string;
  block?: string;
  description?: string;
  tunnel_network?: string;
  local_network?: string;
  local_networkv6?: string;
  remote_network?: string;
  remote_networkv6?: string;
  gwredir?: string;
  push_reset?: string;
  netbios_enable?: string;
  netbios_ntype?: number;
  netbios_scope?: string;
}

export interface Openvpnserver {
  vpnid?: number;
  mode?: string;
  protocol?: string;
  dev_mode?: string;
  ipaddr?: string;
  interface?: string;
  local_port?: number;
  description?: string;
  custom_options?: string;
  tls?: string;
  caref?: string;
  crlref?: string;
  certref?: string;
  dh_length?: number;
  cert_depth?: number;
  crypto?: string;
  digest?: string;
  engine?: string;
  tunnel_network?: string;
  tunnel_networkv6?: string;
  remote_network?: string;
  remote_networkv6?: string;
  gwredir?: string;
  local_network?: string;
  local_networkv6?: string;
  maxclients?: number | string;
  compression?: string;
  passtos?: string;
  client2client?: string;
  dynamic_ip?: string;
  pool_enable?: string;
  topology?: string;
  serverbridge_dhcp?: string;
  serverbridge_interface?: string;
  serverbridge_dhcp_start?: string;
  serverbridge_dhcp_end?: string;
  netbios_enable?: string;
  netbios_ntype?: number;
  netbios_scope?: string;
  no_tun_ipv6?: string;
  verbosity_level?: number;
  topology_subnet?: string;
}

export interface Revision {
  time?: number;
  description?: string;
  username?: string;
}

export interface Widgets {
  sequence?: string;
  trafficgraphs?: string;
  traffic_graphs?: Trafficgraphs;
  'log-0'?: Log0;
}

export interface Log0 {
  filterlogentries?: number;
}

export interface Trafficgraphs {
  refreshinterval?: number;
  invert?: boolean;
  size?: number;
  backgroundupdate?: boolean;
  filter?: string;
}

export interface Rrd {
  enable?: string;
  category?: string;
  style?: string;
  period?: string;
}

export interface Cron {
  item?: Item3[];
}

export interface Item3 {
  minute?: number | string;
  hour?: number | string;
  mday?: number | string;
  month?: string;
  wday?: string;
  who?: string;
  command?: string;
}

export interface Aliases {
  alias?: Alias;
}

export interface Alias {
  name?: string;
  type?: string;
  descr?: string;
  address?: string;
  detail?: string;
}

export interface Ipsec {
  preferoldsa?: string;
  client?: Client;
  mobilekey?: Mobilekey;
  phase1?: Phase1;
  logging?: Logging;
}

export interface Logging {
  dmn?: number;
  mgr?: number;
  ike?: number;
  chd?: number;
  job?: number;
  cfg?: number;
  knl?: number;
  net?: number;
  asn?: number;
  enc?: number;
  imc?: number;
  imv?: number;
  pts?: number;
  tls?: number;
  esp?: number;
  lib?: number;
}

export interface Phase1 {
  disabled?: string;
  encryption?: Encryption;
}

export interface Encryption {
  item?: Item2;
}

export interface Item2 {
  'encryption-algorithm'?: string;
  'hash-algorithm'?: string;
  dhgroup?: string;
}

export interface Mobilekey {
  ident?: string;
  'pre-shared-key'?: string;
}

export interface Client {
  user_source?: string;
  group_source?: string;
}

export interface Filter {
  rule?: Rule2[];
}

export interface Rule2 {
  id?: string;
  type?: string;
  interface?: string;
  tag?: string;
  tagged?: string;
  max?: string;
  'max-src-nodes'?: string;
  'max-src-conn'?: string;
  'max-src-states'?: string;
  statetimeout?: string;
  statetype?: string;
  os?: string;
  protocol?: string;
  source?: Source2;
  destination?: Destination2;
  descr?: string;
  tracker?: number;
  'associated-rule-id'?: string;
  disabled?: string;
  ipprotocol?: string;
  updated?: Updated;
  created?: Updated;
  enabled?: string;
}

export interface Destination2 {
  address?: string;
  port?: number | string;
  any?: string;
}

export interface Source2 {
  any?: string;
  network?: string;
}

export interface Nat {
  rule?: Rule[];
  outbound?: Outbound;
  separator?: string;
}

export interface Outbound {
  mode?: string;
}

export interface Rule {
  source?: Source;
  destination?: Destination;
  protocol?: string;
  target?: string;
  'local-port'?: number;
  interface?: string;
  descr?: string;
  'associated-rule-id'?: string;
  updated?: Updated;
  created?: Updated;
  tracker?: number;
  disabled?: string;
  proto?: string;
  src?: string;
  dst?: string;
  dstport?: number;
}

export interface Updated {
  time?: number;
  username?: string;
}

export interface Destination {
  network?: string;
  port?: number | string;
  address?: string;
}

export interface Source {
  any?: string | number | undefined;
}

export interface Syslog {
  nentries?: number;
  sourceip?: string;
  ipproto?: string;
  reverse?: string;
}

export interface Diag {
  ipv6nat?: string;
}

export interface Snmpd {
  syslocation?: string;
  syscontact?: string;
  rocommunity?: string;
  modules?: Modules;
  pollport?: number;
  trapserver?: string;
  trapserverport?: string;
  trapstring?: string;
  bindip?: string;
  enable?: string;
}

export interface Modules {
  mibii?: string;
  netgraph?: string;
  pf?: string;
  hostres?: string;
  ucd?: string;
  regex?: string;
}

export interface Dnsmasq {
  hosts?: Host[];
  custom_options?: string;
  regdhcp?: string;
  regdhcpstatic?: string;
  dhcpfirst?: string;
  enable?: string;
  interface?: string;
  no_private_reverse?: string;
}

export interface Host {
  host?: string;
  domain?: string;
  ip?: string;
  descr?: string;
  aliases?: string;
}

export interface Dhcpd {
  lan?: Lan2;
}

export interface Lan2 {
  range?: Range;
  defaultleasetime?: string;
  maxleasetime?: string;
  netmask?: string;
  failover_peerip?: string;
  gateway?: string;
  domain?: string;
  domainsearchlist?: string;
  ddnsdomain?: string;
  tftp?: string;
  ldap?: string;
  filename?: string;
  rootpath?: string;
  numberoptions?: string;
  netboot?: string;
  winsserver?: string;
  dnsserver?: string[];
  nextserver?: string;
  staticmap?: Staticmap;
}

export interface Staticmap {
  mac?: string;
  cid?: string;
  ipaddr?: string;
  hostname?: string;
  descr?: string;
  filename?: string;
  rootpath?: string;
  defaultleasetime?: string;
  maxleasetime?: string;
  gateway?: string;
  domain?: string;
  domainsearchlist?: string;
  ddnsdomain?: string;
  ddnsdomainprimary?: string;
  ddnsdomainkeyname?: string;
  ddnsdomainkey?: string;
  tftp?: string;
  ldap?: string;
}

export interface Range {
  from?: string;
  to?: string;
}

export interface Interfaces {
  wan?: NetworkController[];
  lan?: NetworkController[];
  opt?: NetworkController;
}



export interface Lan {
  enable?: string;
  if?: string;
  descr?: string;
  spoofmac?: string;
  ipaddr?: string;
  subnet?: number;
  gateway?: string;
  ipaddrv6?: string;
  subnetv6?: string;
  gatewayv6?: string;
}

export interface NetworkController {
  enable?: string;
  if?: string;
  descr?: string;
  'alias-address'?: string;
  'alias-subnet'?: number;
  spoofmac?: string;
  ipaddr?: string;
  subnet?: number;
  gateway?: string;
  ipaddrv6?: string;
  subnetv6?: string;
  gatewayv6?: string;
  dhcphostname?: string;
  dhcprejectfrom?: string;
  adv_dhcp_pt_timeout?: string;
  adv_dhcp_pt_retry?: string;
  adv_dhcp_pt_select_timeout?: string;
  adv_dhcp_pt_reboot?: string;
  adv_dhcp_pt_backoff_cutoff?: string;
  adv_dhcp_pt_initial_interval?: string;
  adv_dhcp_pt_values?: string;
  adv_dhcp_send_options?: string;
  adv_dhcp_request_options?: string;
  adv_dhcp_required_options?: string;
  adv_dhcp_option_modifiers?: string;
  adv_dhcp_config_advanced?: string;
  adv_dhcp_config_file_override?: string;
  adv_dhcp_config_file_override_path?: string;
}

export interface System {
  optimization?: string;
  hostname?: string;
  domain?: string;
  group?: Group[];
  user?: User;
  nextuid?: number;
  nextgid?: number;
  timezone?: string;
  'time-update-interval'?: string;
  timeservers?: string;
  webgui?: Webgui;
  disablenatreflection?: string;
  disablesegmentationoffloading?: string;
  disablelargereceiveoffloading?: string;
  ipv6allow?: string;
  ssh?: Ssh;
  maximumstates?: string;
  maximumtableentries?: string;
  reflectiontimeout?: string;
  enablesshd?: string;
  dns1gwint?: string;
  dns2gwint?: string;
  dns3gwint?: string;
  dns4gwint?: string;
  firmware?: Firmware;
  gitsync?: Gitsync;
  language?: string;
  dns1gw?: string;
  dns2gw?: string;
  dns3gw?: string;
  dns4gw?: string;
  dnsserver?: string[];
  disablechecksumoffloading?: string;
  already_run_config_upgrade?: string;
  crypto_hardware?: string;
}

export interface Gitsync {
  repositoryurl?: string;
  branch?: string;
}

export interface Firmware {
  alturl?: Alturl;
}

export interface Alturl {
  enable?: string;
  firmwareurl?: string;
}

export interface Ssh {
  port?: number;
}

export interface Webgui {
  protocol?: string;
  'ssl-certref'?: string;
  port?: string;
  max_procs?: number;
  loginautocomplete?: string;
  dashboardcolumns?: number;
}

export interface User {
  name?: string;
  descr?: string;
  scope?: string;
  groupname?: string;
  password?: string;
  uid?: number;
  priv?: string;
  'md5-hash'?: string;
  expires?: string;
  authorizedkeys?: string;
  ipsecpsk?: string;
  'bcrypt-hash'?: string;
}

export interface Group {
  name?: string;
  description?: string;
  scope?: string;
  gid?: number;
  member?: number;
  priv?: string;
}

export interface Sysctl {
  item?: Item[];
}

export interface Item {
  descr?: string;
  tunable?: string;
  value?: string;
}