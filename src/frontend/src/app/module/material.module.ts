import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule
  ],
})

export class  MaterialModule { }
