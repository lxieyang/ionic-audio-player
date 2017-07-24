import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { FilesystemProvider } from '../../providers/filesystem/filesystem';

@Component({
  selector: 'page-audio-detail',
  templateUrl: 'audio-detail.html',
})
export class AudioDetail {

  item: any;
  filename: any;

  curr_playing_file: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private media: Media,
    private filesystemProvider: FilesystemProvider) {
      this.item = navParams.get('file');
      this.filename = this.item.fileName;

      this.setRecordingToPlay();
  }

  setRecordingToPlay() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.curr_playing_file = this.media.create(this.filesystemProvider.getAudioFileDirectoryLocation() + '/' + this.item.fileId + this.item.extension);

      } else if (this.platform.is('ios')) {
        this.curr_playing_file = this.media.create((this.filesystemProvider.getAudioFileDirectoryLocation()).replace(/^file:\/\//, '') + '/' + this.item.fileId + this.item.extension);
      }
    });
  }

  playRecording() {
    this.curr_playing_file.play();
  }

  pausePlayRecording() {
    this.curr_playing_file.pause();
  }

  stopPlayRecording() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
  }

}
