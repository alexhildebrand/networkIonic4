import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';

import { Subscription } from 'rxjs';


@Injectable()
export class AppService {

  private networkActive: boolean;

  private subscriptionChangeNetwork: Subscription
  private subscriptionConnectNetwork: Subscription
  private subscriptionDisconnectNetwork: Subscription

  constructor(
    private network: Network) {

    console.log("Service Constructor")
    console.log(this.network.type)
    this.subscriptionDisconnectNetwork = this.network.onDisconnect().subscribe(() => {
      this.networkActive = false;
      console.log('network was disconnected :-(');
    }, (error) => {
      console.log("subscriptionDisconnectNetwork error")
      console.warn(error);

    });

    this.subscriptionChangeNetwork = this.network.onchange().subscribe(() => {
      this.networkActive = true;
      console.log('network changed :)');
    }, (error) => {
      console.log("subscriptionChangeNetwork error")
      console.warn(error);

    });

    this.subscriptionConnectNetwork = this.network.onConnect().subscribe(() => {
      this.networkActive = true;
      console.log('network was connected :)');
    }, (error) => {
      console.log("subscriptionConnectNetwork error")
      console.warn(error);

    });

  }

  ngOnDestroy() {
    if (this.subscriptionConnectNetwork) {
      this.subscriptionConnectNetwork.unsubscribe();
    }
    if (this.subscriptionDisconnectNetwork) {
      this.subscriptionDisconnectNetwork.unsubscribe();
    }
    if (this.subscriptionChangeNetwork) {
      this.subscriptionChangeNetwork.unsubscribe();
    }
  }

  runFunction(){
      console.log("Service Function")
  }


}
