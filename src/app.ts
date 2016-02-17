import {bootstrap} from 'angular2/platform/browser';
import {DomRenderer, DomRootRenderer} from 'angular2/src/platform/dom/dom_renderer';
import {Angular2RenderTestingApp} from './app/angular2-render-testing';

import {Renderer, RenderComponentType, RootRenderer} from 'angular2/core';

import {EventManager} from 'angular2/src/platform/dom/events/event_manager';
import {DomSharedStylesHost} from 'angular2/src/platform/dom/shared_styles_host';

import {provide, Inject, Injectable} from 'angular2/core';
import {DOCUMENT} from 'angular2/platform/browser';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {isBlank, isPresent} from 'angular2/src/facade/lang';

import {ChangeDetectorGenConfig} from 'angular2/src/core/change_detection/interfaces';

@Injectable()
class CanvasRootRenderer extends DomRootRenderer {
  constructor(@Inject(DOCUMENT) _document: any, _eventManager: EventManager,
              sharedStylesHost: DomSharedStylesHost, animate: AnimationBuilder) {
    super(_document, _eventManager, sharedStylesHost, animate);
  }

  renderComponent(componentProto: RenderComponentType): Renderer {
    var renderer = this['_registeredComponents'].get(componentProto.id);
    if (isBlank(renderer)) {
      renderer = new CanvasRenderer(this, componentProto);
      this['_registeredComponents'].set(componentProto.id, renderer);
    }
    return renderer;
  }
}

class CanvasContainer {
  elm: HTMLElement;
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  marginX: number = 30;
  marginY: number = 30;

  nodeTree = new Map<Node, number>();
  instructions = [];
  drawId: number = 0;

  constructor(parent) {
    this.elm = document.createElement('canvas'); 
    parent.appendChild(this.elm);
    this.width = this.elm.offsetWidth;
    this.height = this.elm.offsetHeight;
    this.elm.setAttribute('width', this.width + 'px');
    this.elm.setAttribute('height', this.height + 'px');
    this.y += this.marginY;

    this.nodeTree[parent] = 0;
  }

  get ctx() {
    return this.elm['getContext']('2d');
  }

  renderElement(element, parent) {
    var exists = !!this.nodeTree.get(element);
    var count = this.nodeTree.get(parent) || 0;
    count++;
    this.nodeTree.set(element, count);
    if (exists) return;
    this.instructions.push(element);
    if (this.drawId) {
      window.cancelAnimationFrame(this.drawId);
    }
    this.drawId = window.requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.instructions.forEach((elm) => {
      if (elm.nodeType == 3) {
        if (elm.nodeValue.trim().length == 0) return;
      }

      var name = this.generateNodeName(elm);
      var count = this.nodeTree.get(elm) || 0;
      var height = 40;
      var margin = count * this.marginX;
      var x = margin + this.x;
      this.ctx.strokeRect(x, this.y, this.width - margin - this.marginX, height);
      this.ctx.font = "30px Monospace";
      this.ctx.fillText(name,x + 20,this.y + (height * 0.66));
      this.y += height;
    });
  }

  generateNodeName(element) {
    if (element.nodeType == 1) {
      var name = element.nodeName.toLowerCase();
      if (element.className) {
        name += '.' + element.className;
      }
      return '<' + name + '>';
    }
    return element.nodeName + ': ' + element.nodeValue.trim();
  }

  getElement() {
    return this.elm;
  }
}

class CanvasRenderer extends DomRenderer {
  private canvas: CanvasContainer;
  private tempSiblingMap = new Map<Node, Node>();

  constructor(_rootRenderer: CanvasRootRenderer, componentProto: RenderComponentType) {
    super(_rootRenderer, componentProto);
  }

  createElement(parent: Element, name: string): Node {
    var elm = super.createElement(null, name);
    this.canvas.renderElement(elm, parent);
    return elm;
  }

  createViewRoot(hostElement: any): any {
    this.canvas = new CanvasContainer(hostElement);
    return super.createViewRoot(hostElement);
  }

  createText(parentElement: any, value: string): any {
    var node = document.createTextNode(value);
    if (isPresent(parentElement)) {
      parentElement.appendChild(node);
      this.canvas.renderElement(node, parentElement);
    }
    return node;
  }

  setText(renderNode: any, text: string): void {
    renderNode.nodeValue = text;
    if (text.length > 0) {
      this.canvas.renderElement(renderNode, renderNode.parentElement);
    }
  }

  attachViewAfter(node: any, viewRootNodes: any[]) {
    var parent;
    if (node.nodeType == 1) {
      parent = this.tempSiblingMap.get(node);
    } else {
      parent = node.parentNode;
    }

    for (let i = 0; i < viewRootNodes.length; i++) {
      let n = viewRootNodes[i];
      this.tempSiblingMap.set(n, parent);
      this.canvas.renderElement(n, parent);
    }
  }
}

bootstrap(Angular2RenderTestingApp, [
  provide(RootRenderer, { useClass: CanvasRootRenderer }),
  provide(ChangeDetectorGenConfig, { useValue: new ChangeDetectorGenConfig(true, false, false)})
]);
