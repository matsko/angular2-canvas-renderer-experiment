import {Injector, Renderer, RenderComponentType} from 'angular2/core';

export class RenderDebugInfo {
  constructor(public injector: Injector, public component: any, public providerTokens: any[],
              public locals: Map<string, any>) {}
}

export class CanvasRenderer extends Renderer {
  renderComponent(componentType: RenderComponentType): Renderer {
    console.log(1, arguments);  
    return null;
  }

  selectRootElement(selector: string): any {
    console.log(2, arguments);  
    return null;
  }

  createElement(parentElement: any, name: string): any {
    console.log(3, arguments);  
    return null;
  }

  createViewRoot(hostElement: any): any {
    console.log(4, arguments);  
    return null;
  }

  createTemplateAnchor(parentElement: any): any {
    console.log(5, arguments);  
    return null;
  }

  createText(parentElement: any, value: string): any {
    console.log(6, arguments);  
    return null;
  }

  projectNodes(parentElement: any, nodes: any[]) {
    console.log(7, arguments);  
    return null;
  }

  attachViewAfter(node: any, viewRootNodes: any[]) {
    console.log(8, arguments);  
    return null;
  }

  detachView(viewRootNodes: any[]) {
    console.log(9, arguments);  
    return null;
  }

  destroyView(hostElement: any, viewAllNodes: any[]) {
    console.log(10, arguments);  
    return null;
  }

  listen(renderElement: any, name: string, callback: Function): Function {
    console.log(11, arguments);  
    return null;
  }

  listenGlobal(target: string, name: string, callback: Function): Function {
    console.log(12, arguments);  
    return null;
  }

  setElementProperty(renderElement: any, propertyName: string, propertyValue: any) {
    console.log(13, arguments);  
    return null;
  }

  setElementAttribute(renderElement: any, attributeName: string, attributeValue: string) {
    console.log(14, arguments);  
    return null;
  }

  setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string) {
    console.log(15, arguments);  
    return null;
  }

  setElementDebugInfo(renderElement: any, info: RenderDebugInfo) {
    console.log(16, arguments);  
    return null;
  }

  setElementClass(renderElement: any, className: string, isAdd: boolean) {
    console.log(17, arguments);  
    return null;
  }

  setElementStyle(renderElement: any, styleName: string, styleValue: string) {
    console.log(18, arguments);  
    return null;
  }

  invokeElementMethod(renderElement: any, methodName: string, args: any[]) {
    console.log(19, arguments);  
    return null;
  }

  setText(renderNode: any, text: string) {
    console.log(20, arguments);  
    return null;
  }
}
