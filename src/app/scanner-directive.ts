import { Directive, OnInit, ElementRef, Renderer2, Input, OnChanges,  } from "@angular/core";
import { AnimationBuilder, keyframes, AnimationPlayer, style, animate, transition } from "@angular/animations";

@Directive({
    selector: '[scanner]'
})
export class ScannerDirective implements OnChanges {
    @Input() visible = false;
    scanElement: any;
    private actualHeight: any;
    private player: AnimationPlayer;

    constructor(private element: ElementRef, private renderer: Renderer2, private builder: AnimationBuilder) {
        this.scanElement = this.renderer.createElement('div');
        this.renderer.addClass(this.scanElement, "child");
        this.renderer.setStyle(this.scanElement, 'display', 'none');
        this.renderer.appendChild(this.element.nativeElement, this.scanElement);
    }

    ngOnChanges() {
        if(this.visible) {
            this.actualHeight = this.element.nativeElement.offsetHeight;
            this.renderer.setStyle(this.scanElement, 'display', 'block');
            this.renderer.setStyle(this.scanElement, 'width', this.element.nativeElement.offsetWidth + 'px');

          /*  const factory = this.builder.build([
                animate('5s',keyframes([
                    style({ top: '0px' }),
                    style({ top: this.actualHeight + 'px' })
                ])),
            ]);

            this.player = factory.create(this.scanElement, {});
            this.player.play();*/
        } else {
            this.renderer.setStyle(this.scanElement, 'display', 'none');
        }
    }
}
