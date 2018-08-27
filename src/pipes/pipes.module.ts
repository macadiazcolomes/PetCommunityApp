import { NgModule } from '@angular/core';
import { GenderCodePipe } from './gender-code/gender-code';
@NgModule({
	declarations: [GenderCodePipe,
    GenderCodePipe],
	imports: [],
	exports: [GenderCodePipe,
    GenderCodePipe]
})
export class PipesModule {}
