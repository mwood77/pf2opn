import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  pfRoot,
  Rule as pfRule,
  User as pfUser,
  Alias as pfAlias,
} from '../mappings/pfsense-complex.interface';
import {
  opnRoot,
  Rule as opnRule,
  Opnsense,
  System as opnSystem,
  Alias as opnAlias,
  User,
} from '../mappings/opnsense.interface';
import { v1 as uuidv1 } from 'uuid'
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import xmlFormat from 'xml-formatter';

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

  async convert(file: File, pretty?: boolean) {
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
          numberParseOptions: {hex: false, leadingZeros: true}
        }

        const parser = new XMLParser(parserOoptions);
        if (reader.result !== null) {
          const parsedXmlToJson = parser.parse(reader.result.toString());
          const opnJson = that.mapPFtoOPN(parsedXmlToJson);

          if (opnJson instanceof Error) {
            subscriber.next();
            subscriber.error(opnJson);  // bubble error message up to the calling method
          }

          const opnXml = that.jsonToXML(opnJson as opnRoot, pretty);

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
    let aliases = undefined;
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

    const pfAliases = input.pfsense.aliases;
    if (pfAliases) {
      let mappedAlias = Array<opnAlias>();

      for (const [key, value] of Object.entries(pfAliases)) {
        if (key === 'alias' && value instanceof Array) {
          value.forEach((alias: pfAlias) => {
            mappedAlias.push(this.mapAliasEntity(alias));
          });
        }
        if (key === 'alias' && !(value instanceof Array)) {
          mappedAlias.push(this.mapAliasEntity(value));
        }
      };

      aliases = mappedAlias
    }

    if (pfSystem) {
      system.hostname = pfSystem.hostname;
      system.domain = pfSystem.domain;
      system.timezone = pfSystem.timezone;
      let mappedUsers = Array<User>();

      const deDupeSystem = new Set(Object.values(system))
      for (const [key, value] of Object.entries(pfSystem)) {

        // Map over user(s)
        if (key == 'user') {
          Array.isArray(value) ?
            value.forEach((u: pfUser) => mappedUsers.push(this.mapUserEntity(u))) :
            mappedUsers.push(this.mapUserEntity(value));
        }

        if (!deDupeSystem.has(value)) {
          system[key] = value;
        }
      }

      // flatten users into distinct <user> elements
      system.user = mappedUsers.flatMap((u: User) => u);
    }

    // @ts-ignore
    const opnsense: Opnsense = {
      version: 1,
      ...input.pfsense,
      system,
      aliases
    }

    const opnsenseJson: opnRoot = {
      opnsense,
    }

    return opnsenseJson;
  }

  jsonToXmlCustomArray(array: Array<any>, nodeName: string) {
    const arrayBuilder = new XMLBuilder({
      format: true,
      arrayNodeName: nodeName,
    });

    return arrayBuilder.build(array);
  }

  jsonToXML(opnJson: opnRoot, pretty?: boolean) {

    const shouldPretty = 
      pretty != undefined ? 
        pretty : true;

    const builder = new XMLBuilder({
      format: shouldPretty,
      // Correctly encode handled CDATA tags
      cdataPropName: 'CDATA',
    });

    // This is a terrible hack because fast-xml-parser doesn't respect arrays...or I cannot
    // figure out how to make it respect them properly without destroying the entire XML response...
    if (opnJson.opnsense?.aliases) {
      const additionalArrays = this.jsonToXmlCustomArray(opnJson.opnsense.aliases, 'alias');

      delete opnJson.opnsense.aliases;
      const result = builder.build(opnJson);

      const split = result.toString().split("</system>");
      const splitWithAliases = [split[0]+'</system>', `<aliases>${additionalArrays}</aliases>`, split[1]];
      const concatenatedResult = splitWithAliases.join('');

      if (shouldPretty) {
        return xmlFormat(concatenatedResult, {});
      }
      return concatenatedResult.replaceAll('\n', '');
    }

    const result = builder.build(opnJson);
    return result;
  }

  private throwIncompatibleFileError(message: string): Error {
    return new Error('Incompatible file type\nMessage:  ' + message);
  }

  private mapUserEntity(u: pfUser): User {
      let user: User = {
        password: '',
        ...u
      }

      if (u['bcrypt-hash']) {
        user.password = u['bcrypt-hash'];
        delete user['bcrypt-hash'];
      }

      if (u['md5-hash']) {
        user.password = u['md5-hash'];
        delete user['md5-hash'];
      }

      if (u['sha512-hash']) {
        user.password = u['sha512-hash'];
        delete user['sha512-hash'];
      }

      return user;
  }

  private mapAliasEntity(a: pfAlias) {
    const modifiedAddress =
      a?.address != undefined
      ? a?.address.toString().replaceAll(' ', '\n')
      : '';

    const aElement = {
        enabled: a.enabled,
        name: a.name,
        type: a.type,
        proto: a.proto,
        interface: a.interface,
        counters: a.counters,
        updatefreq: a.updatefreq,
        content: modifiedAddress,
        categories: a.categories,
        description: a.descr,
        detail: a.detail
    }

      return aElement;
  }
}
