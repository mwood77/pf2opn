import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  pfRoot, 
  Rule as pfRule, 
  Wan as pfWan, 
  Lan as pfLan 
} from '../mappings/pfsense-complex.interface';
import { 
  opnRoot,
  Interfaces as opnInterfaces, 
  Firewall as opnFirewall, 
  Rule as opnRule, 
  Opnsense, 
  Wan as opnWan, 
  Lan as opnLan, 
  System as opnSystem 
} from '../mappings/opnsense.interface';
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

    const reader = new FileReader();
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

    if (input.pfsense == null) return this.throwIncompatibleFileError('pfsense object is null');
    
    const pfSystem = input.pfsense.system;
    const wans: opnWan[] = [];
    const lans: opnLan[] = [];
    const rules: opnRule[] = [];
    const system: opnSystem = {
      hostname: '',
      domain: '',
      timezone: '',
      language: ''
    };
    
    const pfInterfacesIter = input.pfsense.interfaces;
    if (pfInterfacesIter) {

      for (const [key, value] of Object.entries(pfInterfacesIter)) {
        
        if (key === 'wan') {
          if (value instanceof Array) {
            value.forEach((wan: pfWan) => {
              wans.push({
                enable: wan.enable == null ? 0 : +wan.enable,
                ipaddr: wan.ipaddr as string,
                subnet: wan['alias-subnet'] == null ? 0 : +wan['alias-subnet'],
                gateway: wan['alias-address'] == null ? '' : wan['alias-address'],
                descr: wan.descr as string,
              });
          });
          } else {
            wans.push({
              enable: value.enable == null ? 0 : +value.enable,
              ipaddr: value.ipaddr as string,
              subnet: value['alias-subnet'] == null ? 0 : +value['alias-subnet'],
              gateway: value['alias-address'] == null ? '' : value['alias-address'],
              descr: value.descr as string,
            });
          }
        };

        if (key === 'lan') {
          if (value instanceof Array) {
            value.forEach((lan: pfLan) => {
              lans.push({
                enable: lan.enable == null ? 0 : +lan.enable,
                ipaddr: lan.ipaddr as string,
                subnet: lan.subnet as number,
                descr: lan.descr as string,
              });
            })
          } else {
            lans.push({
              enable: value.enable == null ? 0 : +value.enable,
              ipaddr: value.ipaddr as string,
              subnet: value.subnet as number,
              descr: value.descr as string,
            });
          }
        }
      }
    }

    const pfRuleIter = input.pfsense.firewall;
    if (pfRuleIter) {
      for (const [key, value] of Object.entries(pfRuleIter)) {
        if (key === 'rule') {
          if (value instanceof Array) {
            value.forEach((rule: pfRule) => {
              rules.push({
                uuid: uuidv1(),
                type: 'pass',
                enabled: 0,
                interface: 'lan',
                descr: 'generated-rule-from-pf2opn',
                protocol: rule.proto as string,
                source: {
                  any: rule.src === 'any' ? 1 : 0,
                },
                destination: {
                  address: rule.dst as string,
                  port: rule.dstport as number,
                },
              });
            });
          } else {
            rules.push({
              uuid: uuidv1(),
              type: 'pass',
              enabled: 0,
              interface: 'lan',
              descr: 'generated-rule-from-pf2opn',
              protocol: value.proto as string,
              source: {
                any: value.src === 'any' ? 1 : 0,
              },
              destination: {
                address: value.dst as string,
                port: value.dstport as number,
              },
            });
          }
        }
      }
    }

    if (pfSystem) {
      system.hostname = pfSystem.hostname as string;
      system.domain = pfSystem.domain as string;
      system.timezone = pfSystem.timezone as string;
      system.language = pfSystem.language as string;
    }

    const firewall: opnFirewall = {
      rules
    };

    const interfaces: opnInterfaces = {
      wan: (wans.length > 0) ? wans : [],
      lan: (lans.length > 0) ? lans : [],
    };

    const opnsense: Opnsense = {
      version: 1,
      'config-apply': {
        uuid: uuidv1(),
      },
      system,
      interfaces,
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
    let formatted = '', indent= '';
    tab = tab || '\t';
    xml.split(/>\s*</).forEach(function(node: string) {
        if (node.match( /^\/\w/ )) indent = indent.substring(tab.length); // decrease indent by one 'tab'
        formatted += indent + '<' + node + '>\r\n';
        if (node.match( /^<?\w[^>]*[^\/]$/ )) indent += tab;              // increase indent
    });
    return formatted.substring(1, formatted.length-3);
}

  private throwIncompatibleFileError(message: string): Error {
    return new Error('Incompatible file type\nMessage:  ' + message);
  }
}
