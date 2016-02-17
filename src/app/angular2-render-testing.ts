import {Component} from 'angular2/core';


@Component({
  selector: 'angular2-render-testing-app',
  providers: [],
  templateUrl: 'app/angular2-render-testing.html',
  directives: [],
  pipes: []
})
export class Angular2RenderTestingApp {
  expression = true;
  items = [1,2,3];
}
