import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRoutesConfig } from '@angular/ssr';
import { AppComponent } from './app.component';
import { serverRoutes } from './app.routes.server';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [provideServerRoutesConfig(serverRoutes)],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
