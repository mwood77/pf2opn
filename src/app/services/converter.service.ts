import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  pfRoot, 
  Rule as pfRule, 
} from '../mappings/pfsense-complex.interface';
import { 
  opnRoot,
  Rule as opnRule, 
  Opnsense, 
  System as opnSystem,
  User,
} from '../mappings/opnsense.interface';
import { v1 as uuidv1 } from 'uuid'
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

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

        // Correctly handle CDATA tags
        const parserOoptions = {
          cdataPropName: "CDATA"
        }

        const parser = new XMLParser(parserOoptions);
        if (reader.result !== null) {
          const parsedXmlToJson = parser.parse(reader.result.toString());
          const opnJson = that.mapPFtoOPN(parsedXmlToJson);
          
          if (opnJson instanceof Error) {
            subscriber.next();
            subscriber.error(opnJson);  // bubble error message up to the calling method
          }

          const opnXml = that.jsonToXML(opnJson as opnRoot);
          
          that.conversionAvailable$.next(true);
          subscriber.next(opnXml);  // opnXml object will be returned to the calling method
          subscriber.complete();    // Complete the subscriber
        } else {
          subscriber.error(new Error('File is empty'));
        }
      };
    })
  }

  mapPFtoOPN(input: pfRoot) {

    if (input.pfsense == null) return this.throwIncompatibleFileError('pfsense object is null');
    
    const pfSystem = input.pfsense.system;
    const rules: opnRule[] = [];
    const system: opnSystem = {
      hostname: '',
      domain: '',
      timezone: '',
      language: ''
    };

    // @todo - unsure if custom mapping of rules are needed
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
                  address: rule.dst,
                  port: rule.dstport,
                },
                ...rule
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
      system.hostname = pfSystem.hostname;
      system.domain = pfSystem.domain;
      system.timezone = pfSystem.timezone;

      system.user = {
        ...pfSystem.user
      }
      
      // Map bcrypt-hash, md5-hash, sha512-hash tags to password tag
      if (pfSystem.user?.['bcrypt-hash']) { 
        system.user.password = pfSystem.user['bcrypt-hash'];
        delete system.user['bcrypt-hash'];

      }
      if (pfSystem.user?.['md5-hash']) {
        system.user.password = pfSystem.user['md5-hash'];
        delete system.user['md5-hash'];
      }
      if (pfSystem.user?.['sha512-hash']) {
        system.user.password = pfSystem.user['sha512-hash'];
        delete system.user['sha512-hash'];
      }
      
      // dedupe pfSense.system.user
      delete input.pfsense.system?.user;

      // dedupe pfSense.system against manual opnSense.system mappings
      const deDupeSystem = new Set(Object.values(system))
      for (const [key, value] of Object.entries(pfSystem)) {
        if (!deDupeSystem.has(value)) {
          system[key] = value;
        }
      }
    }

    // @ts-ignore
    const opnsense: Opnsense = {
      version: 1,
      'config-apply': {
        uuid: uuidv1(),
      },
      ...input.pfsense,
      system,
    }
    
    const opnsenseJson: opnRoot = {
      opnsense,
    }
    
    return opnsenseJson;
  }

  jsonToXML(opnJson: opnRoot) {

    const builder = new XMLBuilder({
      format: true,
      // Correctly encode handled CDATA tags
      cdataPropName: 'CDATA'
      
      // oneListGroup:true
    });
    return builder.build(opnJson);
  }

  private throwIncompatibleFileError(message: string): Error {
    return new Error('Incompatible file type\nMessage:  ' + message);
  }
}
