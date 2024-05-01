import { Component } from '@angular/core';
import { SelfieVideo } from 'selfie_module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    protected stream?: MediaStream;
    protected videoDevices: MediaDeviceInfo[] = [];
    protected selectedDevice?: MediaDeviceInfo;
    protected loading: boolean = false;
    private selfieVideoModule: SelfieVideo = new SelfieVideo();

    constructor() {
        this.selfieVideoModule
            .enumerateDevices()
            .then((devices: MediaDeviceInfo[]) => {
                console.log(devices);
                this.videoDevices = devices;
                this.selectedDevice = this.videoDevices[0];
                //
            })
            .catch((error: Error) => alert(error));
    }

    public startSelfie(): void {
        this.loading = true;
        this.selfieVideoModule
            .start(this.selectedDevice?.deviceId)
            .then((stream: MediaStream) => {
                this.loading = false;
                this.stream = stream;
            })
            .catch((error: Error) => alert(error));
    }

    public stopSelfie(): void {
        this.selfieVideoModule.stop();
        this.stream = undefined;
    }

    public changeDevice(newDevice: InputDeviceInfo): void {
        this.selectedDevice = newDevice;
        if (!!this.stream) {
            this.startSelfie();
        }
    }
}
