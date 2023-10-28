interface RootObject {
  '?xml': string;
  pfsense: Pfsense;
}

interface Pfsense {
  version: number;
  lastchange: string;
  theme: string;
  sysctl: Sysctl;
  system: System;
  interfaces: Interfaces;
  staticroutes: string;
  dhcpd: Dhcpd;
  dnsmasq: Dnsmasq;
  snmpd: Snmpd;
  diag: Diag;
  bridge: string;
  syslog: Syslog;
  nat: Nat;
  filter: Filter;
  shaper: string;
  ipsec: Ipsec;
  aliases: Aliases;
  proxyarp: string;
  cron: Cron;
  wol: string;
  rrd: Rrd;
  load_balancer: string;
  widgets: Widgets;
  revision: Revision;
  openvpn: Openvpn;
  dnshaper: string;
  cert: Cert[];
  installedpackages: Installedpackages;
  ppps: string;
  gateways: Gateways;
  dyndnses: Dyndnses;
  ezshaper: Ezshaper;
  ca: Ca;
  ovpnserver: Ovpnserver;
  dhcrelay: string;
  crl: Crl;
  bridges: Bridges;
  dhcpdv6: string;
  dhcrelay6: string;
  ntpd: string;
}

interface Bridges {
  bridged: Bridged;
}

interface Bridged {
  members: string;
  descr: string;
  maxaddr: string;
  timeout: string;
  maxage: string;
  fwdelay: string;
  hellotime: string;
  priority: string;
  proto: string;
  holdcnt: string;
  ifpriority: string;
  ifpathcost: string;
  bridgeif: string;
}

interface Crl {
  refid: string;
  descr: string;
  caref: string;
  method: string;
  serial: number;
  lifetime: number;
  '#text': number;
}

interface Ovpnserver {
  step1: Step12;
  step6: Step6;
  step9: Step9;
  step10: Step10;
  step11: Step11;
}

interface Step11 {
  ovpnrule: string;
  ovpnallow: string;
}

interface Step10 {
  protocol: string;
  localport: number;
  descr: string;
  tlsauth: string;
  gentlskey: string;
  dhkey: number;
  crypto: string;
  engine: string;
  tunnelnet: string;
  localnet: string;
  dynip: string;
  addrpool: string;
  nbttype: number;
  interface: string;
  digest: string;
  advanced: string;
}

interface Step9 {
  certname: string;
  keylength: number;
  lifetime: number;
  country: string;
  state: string;
  city: string;
  organization: string;
  email: string;
  authcertname: string;
}

interface Step6 {
  authcertca: string;
}

interface Step12 {
  type: string;
}

interface Ca {
  refid: string;
  descr: string;
  crt: string;
  prv: string;
  serial: number;
}

interface Ezshaper {
  step1: Step1;
  step3: Step3;
  step5: Step5;
  step7: string;
  step2: Step2;
}

interface Step2 {
  downloadscheduler: string;
  conn0uploadscheduler: string;
  conn0upload: number;
  conn0uploadspeed: string;
  conn0download: number;
  conn0downloadspeed: string;
  conn0interface: string;
}

interface Step5 {
  enable: string;
  bandwidthunit: string;
  bittorrent: string;
}

interface Step3 {
  enable: string;
  provider: string;
  download: number;
  downloadspeed: string;
  conn0upload: number;
  conn0uploadspeed: string;
}

interface Step1 {
  numberofconnections: number;
}

interface Dyndnses {
  dyndns: Dyndns;
}

interface Dyndns {
  type: string;
  username: string;
  password: string;
  host: string;
  mx: string;
  verboselog: string;
  enable: string;
  interface: string;
  zoneid: string;
  ttl: string;
  updateurl: string;
  resultmatch: string;
  requestif: string;
  descr: string;
  id: number;
}

interface Gateways {
  gateway_item: Gatewayitem;
}

interface Gatewayitem {
  interface: string;
  gateway: string;
  name: string;
  weight: number;
  ipprotocol: string;
  descr: string;
  monitor_disable: string;
  defaultgw: string;
}

interface Installedpackages {
  squid: Squid;
  squidcache: Squidcache;
  squidguardgeneral: Squidguardgeneral;
  squidguarddefault: Squidguarddefault;
  miniupnpd: Miniupnpd;
  freeradius: Freeradius;
  freeradiusclients: Freeradiusclients;
  bandwidthd: Bandwidthd;
  lcdproc: Lcdproc;
  lcdprocscreens: Lcdprocscreens;
  darkstat: Darkstat;
  snortglobal: Snortglobal;
  package: Package[];
  menu: Menu[];
  service: Service[];
  vpn_openvpn_export: Vpnopenvpnexport;
}

interface Vpnopenvpnexport {
  serverconfig: Serverconfig;
  defaultsettings: string;
}

interface Serverconfig {
  item: Item5;
}

interface Item5 {
  pass: string;
  proxypass: string;
  server: number;
  useaddr: string;
  useaddr_hostname: string;
  verifyservercn: string;
  blockoutsidedns: string;
  legacy: string;
  randomlocalport: string;
  usepkcs11: string;
  pkcs11providers: string;
  usetoken: string;
  usepass: string;
  useproxy: string;
  useproxytype: string;
  proxyaddr: string;
  proxyport: string;
  useproxypass: string;
  proxyuser: string;
  advancedoptions: string;
}

interface Service {
  name: string;
  rcfile: string;
  executable: string;
  description: string;
}

interface Menu {
  name: string;
  tooltiptext: string;
  section: string;
  url: string;
}

interface Package {
  name: string;
  website?: string;
  descr: string;
  version: string;
  configurationfile: string;
  tabs?: Tabs;
  include_file: string;
  internal_name?: string;
  pkginfolink?: string;
  after_install_info?: string;
}

interface Tabs {
  tab: Tab[];
}

interface Tab {
  text?: string;
  url: string;
  active?: string;
  name?: string;
  tabgroup?: string;
}

interface Snortglobal {
  snort_config_ver: string;
  snortdownload: string;
  snortcommunityrules: string;
  emergingthreats: string;
  emergingthreats_pro: string;
  clearblocks: string;
  oinkmastercode: string;
  etpro_code: string;
  rm_blocked: string;
  autorulesupdate7: string;
  rule_update_starttime: string;
  forcekeepsettings: string;
  last_rule_upd_status: string;
  last_rule_upd_time: number;
  whitelist: string;
  suppress: Suppress;
  dashboard_widget: string;
  auto_manage_sids: string;
  enable_log_mgmt: string;
  alert_log_limit_size: number;
  alert_log_retention: number;
  appid_stats_log_limit_size: number;
  appid_stats_log_retention: number;
  event_pkts_log_limit_size: number;
  event_pkts_log_retention: number;
  sid_changes_log_limit_size: number;
  sid_changes_log_retention: number;
  stats_log_limit_size: number;
  stats_log_retention: number;
  verbose_logging: string;
  openappid_detectors: string;
}

interface Suppress {
  item: Item4;
}

interface Item4 {
  uuid: string;
  name: string;
  descr: string;
  suppresspassthru: string;
}

interface Darkstat {
  config: Config11;
}

interface Config11 {
  interface_array: string;
}

interface Lcdprocscreens {
  config: Config10;
}

interface Config10 {
  scr_version: string;
  scr_time: string;
  scr_uptime: string;
  scr_hostname: string;
  scr_system: string;
  scr_disk: string;
  scr_load: string;
  scr_states: string;
  scr_carp: string;
  scr_ipsec: string;
  scr_slbd: string;
  scr_interfaces: string;
  scr_mbuf: string;
  scr_cpufrequency: string;
  scr_traffic: string;
  scr_traffic_interface: string;
}

interface Lcdproc {
  config: Config9;
}

interface Config9 {
  enable: string;
  comport: string;
  size: string;
  driver: string;
  connection_type: string;
  refresh_frequency: number;
  port_speed: number;
  brightness: number;
  offbrightness: number;
  contrast: number;
  backlight: string;
  outputleds: string;
}

interface Bandwidthd {
  config: Config8;
}

interface Config8 {
  enable: string;
  active_interface: string;
  skipintervals: string;
  graphcutoff: number;
  promiscuous: string;
  outputcdf: string;
  recovercdf: string;
  outputpostgresql: string;
  postgresqlhost: string;
  postgresqldatabase: string;
  postgresqlusername: string;
  sensorid: string;
  drawgraphs: string;
  meta_refresh: number;
  graph_log_info: string;
  advfilter: string;
  postgresqlpasswordenc: string;
}

interface Freeradiusclients {
  config: Config7;
}

interface Config7 {
  client: string;
  shortname: string;
  sharedsecret: string;
  description: string;
}

interface Freeradius {
  config: Config6;
}

interface Config6 {
  username: string;
  password: string;
  ip: string;
  multiconnet: number;
  expiration: string;
  sessiontime: string;
  onlinetime: string;
  description: string;
  vlanid: string;
  additionaloptions: string;
}

interface Miniupnpd {
  config: Config5;
}

interface Config5 {
  enable: string;
  enable_upnp: string;
  enable_natpmp: string;
  iface_array: string;
  download: string;
  upload: string;
  overridewanip: string;
  upnpqueue: string;
  logpackets: string;
  sysuptime: string;
  permdefault: string;
}

interface Squidguarddefault {
  config: Config4;
}

interface Config4 {
  dest: string;
  notallowingip: string;
  deniedmessage: string;
  redirect_mode: string;
  redirect: string;
  safesearch: string;
  rewrite: string;
  enablelog: string;
}

interface Squidguardgeneral {
  config: Config3;
}

interface Config3 {
  squidguard_enable: string;
  enable_guilog: string;
  enable_log: string;
  log_rotation: string;
  blacklist: string;
  blacklist_proxy: string;
  blacklist_url: string;
}

interface Squidcache {
  config: Config2;
}

interface Config2 {
  harddisk_cache_size: number;
  harddisk_cache_system: string;
  harddisk_cache_location: string;
  memory_cache_size: number;
  minimum_object_size: number;
  maximum_object_size: number;
  level1_subdirs: number;
  memory_replacement_policy: string;
  cache_replacement_policy: string;
  cache_swap_low: number;
  cache_swap_high: number;
  donotcache: string;
  enable_offline: string;
}

interface Squid {
  config: Config;
}

interface Config {
  active_interface: string;
  allow_interface: string;
  transparent_proxy: string;
  private_subnet_proxy_off: string;
  defined_ip_proxy_off: string;
  defined_ip_proxy_off_dest: string;
  log_enabled: string;
  log_dir: string;
  log_rotate: number;
  proxy_port: number;
  icp_port: string;
  visible_hostname: string;
  admin_email: string;
  error_language: string;
  disable_xforward: string;
  disable_via: string;
  uri_whitespace: string;
  dns_nameservers: string;
  disable_squidversion: string;
  custom_options: string;
}

interface Cert {
  refid: string;
  descr: string;
  crt: string;
  prv: string;
  caref?: string;
  type?: string;
}

interface Openvpn {
  'openvpn-server': Openvpnserver[];
  'openvpn-csc': Openvpncsc[];
}

interface Openvpncsc {
  custom_options: string;
  common_name: string;
  block: string;
  description: string;
  tunnel_network: string;
  local_network?: string;
  local_networkv6?: string;
  remote_network?: string;
  remote_networkv6?: string;
  gwredir: string;
  push_reset: string;
  netbios_enable: string;
  netbios_ntype: number;
  netbios_scope: string;
}

interface Openvpnserver {
  vpnid: number;
  mode: string;
  protocol: string;
  dev_mode: string;
  ipaddr: string;
  interface: string;
  local_port: number;
  description: string;
  custom_options: string;
  tls: string;
  caref: string;
  crlref: string;
  certref: string;
  dh_length: number;
  cert_depth: number;
  crypto: string;
  digest: string;
  engine: string;
  tunnel_network: string;
  tunnel_networkv6: string;
  remote_network: string;
  remote_networkv6: string;
  gwredir: string;
  local_network: string;
  local_networkv6: string;
  maxclients: number | string;
  compression: string;
  passtos: string;
  client2client: string;
  dynamic_ip: string;
  pool_enable: string;
  topology: string;
  serverbridge_dhcp: string;
  serverbridge_interface: string;
  serverbridge_dhcp_start: string;
  serverbridge_dhcp_end: string;
  netbios_enable: string;
  netbios_ntype: number;
  netbios_scope: string;
  no_tun_ipv6: string;
  verbosity_level: number;
  topology_subnet?: string;
}

interface Revision {
  time: number;
  description: string;
  username: string;
}

interface Widgets {
  sequence: string;
  trafficgraphs: string;
  traffic_graphs: Trafficgraphs;
  'log-0': Log0;
}

interface Log0 {
  filterlogentries: number;
}

interface Trafficgraphs {
  refreshinterval: number;
  invert: boolean;
  size: number;
  backgroundupdate: boolean;
  filter: string;
}

interface Rrd {
  enable: string;
  category: string;
  style: string;
  period: string;
}

interface Cron {
  item: Item3[];
}

interface Item3 {
  minute: number | string;
  hour: number | string;
  mday: number | string;
  month: string;
  wday: string;
  who: string;
  command: string;
}

interface Aliases {
  alias: Alias;
}

interface Alias {
  name: string;
  type: string;
  descr: string;
  address: string;
  detail: string;
}

interface Ipsec {
  preferoldsa: string;
  client: Client;
  mobilekey: Mobilekey;
  phase1: Phase1;
  logging: Logging;
}

interface Logging {
  dmn: number;
  mgr: number;
  ike: number;
  chd: number;
  job: number;
  cfg: number;
  knl: number;
  net: number;
  asn: number;
  enc: number;
  imc: number;
  imv: number;
  pts: number;
  tls: number;
  esp: number;
  lib: number;
}

interface Phase1 {
  disabled: string;
  encryption: Encryption;
}

interface Encryption {
  item: Item2;
}

interface Item2 {
  'encryption-algorithm': string;
  'hash-algorithm': string;
  dhgroup: string;
}

interface Mobilekey {
  ident: string;
  'pre-shared-key': string;
}

interface Client {
  user_source: string;
  group_source: string;
}

interface Filter {
  rule: Rule2[];
}

interface Rule2 {
  id?: string;
  type?: string;
  interface: string;
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
  source: Source2;
  destination: Destination2;
  descr: string;
  tracker: number;
  'associated-rule-id'?: string;
  disabled?: string;
  ipprotocol?: string;
  updated?: Updated;
  created?: Updated;
  enabled?: string;
}

interface Destination2 {
  address?: string;
  port?: number | string;
  any?: string;
}

interface Source2 {
  any?: string;
  network?: string;
}

interface Nat {
  rule: Rule[];
  outbound: Outbound;
  separator: string;
}

interface Outbound {
  mode: string;
}

interface Rule {
  source: Source;
  destination: Destination;
  protocol: string;
  target: string;
  'local-port': number;
  interface: string;
  descr: string;
  'associated-rule-id': string;
  updated?: Updated;
  created?: Updated;
  tracker?: number;
  disabled?: string;
}

interface Updated {
  time: number;
  username: string;
}

interface Destination {
  network: string;
  port: number | string;
}

interface Source {
  any: string;
}

interface Syslog {
  nentries: number;
  sourceip: string;
  ipproto: string;
  reverse: string;
}

interface Diag {
  ipv6nat: string;
}

interface Snmpd {
  syslocation: string;
  syscontact: string;
  rocommunity: string;
  modules: Modules;
  pollport: number;
  trapserver: string;
  trapserverport: string;
  trapstring: string;
  bindip: string;
  enable: string;
}

interface Modules {
  mibii: string;
  netgraph: string;
  pf: string;
  hostres: string;
  ucd: string;
  regex: string;
}

interface Dnsmasq {
  hosts: Host[];
  custom_options: string;
  regdhcp: string;
  regdhcpstatic: string;
  dhcpfirst: string;
  enable: string;
  interface: string;
  no_private_reverse: string;
}

interface Host {
  host: string;
  domain: string;
  ip: string;
  descr: string;
  aliases?: string;
}

interface Dhcpd {
  lan: Lan2;
}

interface Lan2 {
  range: Range;
  defaultleasetime: string;
  maxleasetime: string;
  netmask: string;
  failover_peerip: string;
  gateway: string;
  domain: string;
  domainsearchlist: string;
  ddnsdomain: string;
  tftp: string;
  ldap: string;
  filename: string;
  rootpath: string;
  numberoptions: string;
  netboot: string;
  winsserver: string;
  dnsserver: string[];
  nextserver: string;
  staticmap: Staticmap;
}

interface Staticmap {
  mac: string;
  cid: string;
  ipaddr: string;
  hostname: string;
  descr: string;
  filename: string;
  rootpath: string;
  defaultleasetime: string;
  maxleasetime: string;
  gateway: string;
  domain: string;
  domainsearchlist: string;
  ddnsdomain: string;
  ddnsdomainprimary: string;
  ddnsdomainkeyname: string;
  ddnsdomainkey: string;
  tftp: string;
  ldap: string;
}

interface Range {
  from: string;
  to: string;
}

interface Interfaces {
  wan: Wan;
  lan: Lan;
  opt1: Opt1;
}

interface Opt1 {
  descr: string;
  if: string;
  spoofmac: string;
}

interface Lan {
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

interface Wan {
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

interface System {
  optimization: string;
  hostname: string;
  domain: string;
  group: Group[];
  user: User;
  nextuid: number;
  nextgid: number;
  timezone: string;
  'time-update-interval': string;
  timeservers: string;
  webgui: Webgui;
  disablenatreflection: string;
  disablesegmentationoffloading: string;
  disablelargereceiveoffloading: string;
  ipv6allow: string;
  ssh: Ssh;
  maximumstates: string;
  maximumtableentries: string;
  reflectiontimeout: string;
  enablesshd: string;
  dns1gwint: string;
  dns2gwint: string;
  dns3gwint: string;
  dns4gwint: string;
  firmware: Firmware;
  gitsync: Gitsync;
  language: string;
  dns1gw: string;
  dns2gw: string;
  dns3gw: string;
  dns4gw: string;
  dnsserver: string[];
  disablechecksumoffloading: string;
  already_run_config_upgrade: string;
  crypto_hardware: string;
}

interface Gitsync {
  repositoryurl: string;
  branch: string;
}

interface Firmware {
  alturl: Alturl;
}

interface Alturl {
  enable: string;
  firmwareurl: string;
}

interface Ssh {
  port: number;
}

interface Webgui {
  protocol: string;
  'ssl-certref': string;
  port: string;
  max_procs: number;
  loginautocomplete: string;
  dashboardcolumns: number;
}

interface User {
  name: string;
  descr: string;
  scope: string;
  groupname: string;
  password: string;
  uid: number;
  priv: string;
  'md5-hash': string;
  expires: string;
  authorizedkeys: string;
  ipsecpsk: string;
}

interface Group {
  name: string;
  description: string;
  scope: string;
  gid: number;
  member?: number;
  priv?: string;
}

interface Sysctl {
  item: Item[];
}

interface Item {
  descr: string;
  tunable: string;
  value: string;
}