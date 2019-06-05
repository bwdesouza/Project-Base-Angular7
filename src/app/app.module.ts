import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule, MatDialogModule, MatMenuModule, MatSelectModule, MatTableModule, MatAutocompleteModule, MatIconModule, MatRadioModule, MatNativeDateModule, MatDatepickerModule, MatProgressBarModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialog } from './components/alert-dialog/alert-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CookieService } from './services/cookie.service';
import { InterceptService } from './services/intercept.service';
import { LoginService } from './services/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenStorage } from './services/token-storage.service';

@NgModule({
  declarations: [
    AppComponent,
		LoginComponent,
		AlertDialog
  ],
  imports: [
    BrowserModule,
		FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
		MatInputModule,
		HttpClientModule,

		MatDialogModule,
		ReactiveFormsModule,
		MatMenuModule,
		MatSelectModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatTabsModule,
		MatTooltipModule,
	],
	entryComponents: [
		AlertDialog
	],
  providers: [
		CookieService,
		InterceptService,
		LoginService,
		TokenStorage,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
