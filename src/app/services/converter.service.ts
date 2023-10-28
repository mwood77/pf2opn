import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pfRoot, Interfaces as pfInterfaces, Rule as pfRule, Wan as pfWan, Lan as pfLan } from '../mappings/pfsense.interface';
import { opnRoot, Interfaces as opnInterfaces, Firewall as opnFirewall, Rules, Rule as opnRule, Opnsense, Wan as opnWan, Lan as opnLan } from '../mappings/opnsense.interface';
import { v1 as uuidv1 } from 'uuid'
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  displayConversionCard$ = new BehaviorSubject(false);
  conversionAvailable$ = new BehaviorSubject(false);

  constructor() { }

  cancel() {
    this.displayConversionCard$.next(false);
  }

  async convert(file: File) {
    this.displayConversionCard$.next(false);
    this.displayConversionCard$.next(true);
    
    this.conversionAvailable$.next(false);

    var reader = new FileReader();
    reader.readAsText(file);

    // bypass scope in FileReader.onload
    const that = this;

     return new Observable((subscriber: any) => {
      reader.onload = function (event) {

        const parser = new XMLParser();
        const parsedXmlToJson = parser.parse(reader.result);
        
        that.conversionAvailable$.next(true);

        const opnJson = that.mapPFtoOPN(parsedXmlToJson);
        
        if (opnJson instanceof Error) {
          subscriber.next();
          subscriber.error(opnJson);  // bubble error message up to the calling method
        }
        const opnXml = that.jsonToXML(opnJson as opnRoot);

        const prettiedXml = that.formatXml(opnXml, '  ');
        
        subscriber.next(prettiedXml);  // opnXml object will be returned to the calling method
        subscriber.complete();    // Complete the subscriber
      };
    })
  }

  mapPFtoOPN(input: pfRoot) {

    if (input.pfsense == null) return new Error('pfsense object is null');
    if (input.pfsense.interfaces == null) this.throwIncompatibleFileError(new Error('interfaces object is null'));
    
    if (input.pfsense.interfaces.wan == null) this.throwIncompatibleFileError(new Error('want object is null'));
    const wan: opnWan = {
      enable: input.pfsense?.interfaces.wan.enable == null ? 0 : +input.pfsense.interfaces.wan.enable,
      ipaddr: input.pfsense?.interfaces.wan.ipaddr,
      subnet: input.pfsense?.interfaces.wan['alias-subnet'] == null ? 0 : +input.pfsense.interfaces.wan['alias-subnet'],
      gateway: input.pfsense?.interfaces.wan['alias-address'] == null ? '' : input.pfsense.interfaces.wan['alias-address'],
      descr: input.pfsense?.interfaces.wan.descr,
    }

    if (input.pfsense.interfaces.lan == null) this.throwIncompatibleFileError(new Error('lan object is null'));
    const lan: opnLan = {
      enable: input.pfsense.interfaces.lan.enable == null ? 0 : +input.pfsense.interfaces.lan.enable,
      ipaddr: input.pfsense.interfaces.lan.ipaddr,
      subnet: input.pfsense.interfaces.lan.subnet,
      descr: input.pfsense.interfaces.lan.descr,
    }

    if (input.pfsense.firewall == null) this.throwIncompatibleFileError(new Error('firewall object is null'));
    if (input.pfsense.firewall?.rule == null) this.throwIncompatibleFileError(new Error('rule object is null'));
    const rule: opnRule = {
      uuid: uuidv1(),
      type: 'pass',
      enabled: 0,
      interface: 'lan',
      descr: 'generated-rule-from-pf2opn',
      protocol: input.pfsense.firewall?.rule?.proto,
      source: {
        any: input.pfsense.firewall?.rule?.src === 'any' ? 1 : 0,
      },
      destination: {
        address: input.pfsense.firewall?.rule?.dst,
        port: input.pfsense.firewall?.rule?.dstport,
      },
    };

    const firewall: opnFirewall = {
      rules: {
        rule: rule,
      }
    };

    const opnsense: Opnsense = {
      version: 1,
      'config-apply': {
        uuid: uuidv1(),
      },
      system: {
        hostname: input.pfsense.system.hostname,
        domain: input.pfsense.system.domain,
        timezone: input.pfsense.system.timezone,
        language: input.pfsense.system.language,
      },
      interfaces: {
        wan: wan,
        lan: lan,
      },
      firewall,  
    }
    
    const opnsenseJson: opnRoot = {
      opnsense,
    }
    
    return opnsenseJson;
  }

  jsonToXML(opnJson: opnRoot) {
    const builder = new XMLBuilder();
    return builder.build(opnJson);
  }

  formatXml(xml: any, tab: string) { // tab = optional indent value, default is tab (\t)
    var formatted = '', indent= '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function(node: string) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}

  private throwIncompatibleFileError(e: Error) {
    return new Error('Incompatible file type. Please upload pfsense config file. ' + e);
  }
}
