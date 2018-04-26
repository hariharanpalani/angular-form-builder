import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});

/*


<div class="container-fluid">
  <div class="row">
    <div class="col-md-2">
      <p-panel >
        <p-header>
            Layout
        </p-header>
        <div class="btn btn-block btn-info" pDraggable="row">
          Row
        </div>
        <div class="btn btn-block btn-info" pDraggable="col">
            Column
        </div>         
      </p-panel>
      <br/>
      <p-panel >
        <p-header>
            Components
        </p-header>
        <div class="btn btn-block btn-info" pDraggable="ctrl">
            Text Field
        </div>
      </p-panel>
    </div>
    <div class="col-md-10">
      <form [formGroup]="form" (ngSubmit)="submit()" class="form-builder">
            <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form">
            </formly-form>
      </form>
      <div class="row">
        <div class="col-md-12 fill-builder drop-section" pDroppable="row" (onDrop)="onDrop($event, 'row')">
          <label>drop & drop row here</label>
        </div>
      </div>
    </div>
  </div>
</div>*/
