import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { flatten, unflatten } from 'flat'

const {XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');

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
        
        console.log(parsedXmlToJson)
        that.conversionAvailable$.next(true);

        let workingJson = that.mapPFtoOPN(parsedXmlToJson);

        subscriber.next(workingJson); // parsedXmlToJson object will be returned to the calling function
        subscriber.complete(); // Complete the subscriber
      };
    })
  }

  mapPFtoOPN(input: unknown) {
    const workingJson = flatten(input) as Record<string, string>;

    console.log(typeof workingJson)
    console.log(workingJson)
    
    //todo: map the json to the new format
    // workingJson...
    
    return this.jsonToXML(unflatten(workingJson));
  }

  jsonToXML(json: unknown) {
    const builder = new XMLBuilder();
    const xmlContent = builder.build(json);
    return xmlContent;
  }

}
