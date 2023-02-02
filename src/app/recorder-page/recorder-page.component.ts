import { Component, OnInit } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-recorder-page',
  templateUrl: './recorder-page.component.html',
  styleUrls: ['./recorder-page.component.css']
})
export class RecorderPageComponent implements OnInit {

  //Lets initiate Record OBJ
  public record;
  //Will use this flag for detect recording
  public recording = false;
  //Url of Blob
  public url;
  public error;
  public audioElement: any;
  public recorder;
  public device;
  constructor(private domSanitizer: DomSanitizer) {
  }
  ngOnInit(): void {

  }
  sanitize(url: string) {

    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {
    this.audioElement = document.getElementById('audio')
    this.audioElement.load();
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      mimeType: "audio/wav",
      numberOfAudioChannels: 1
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = blob
    // this.url = URL.createObjectURL(blob);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

  play() {
    this.audioElement.play();
  }
  stop() {
    this.audioElement.stop();
  }
}
