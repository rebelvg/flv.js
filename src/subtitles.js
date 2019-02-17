import * as _ from 'lodash';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const SUBTITLES = {};

socket.on('subtitles', function (data) {
    SUBTITLES[data.timestamp] = data.text;
});

class SubtitlesEmitter {
    constructor() {
        this._events = {};
    }

    on(eventName, eventFnc) {
        const array = _.get(this._events, eventName, []);

        array.push(eventFnc);

        _.set(this._events, eventName, array);
    }

    emit(eventName, args) {
        const fncs = _.get(this._events, eventName, []);

        fncs.forEach((fnc) => {
            fnc(args);
        });
    }
}

const subtitlesEmitter = new SubtitlesEmitter();

const videoPlayerTag = document.getElementsByName('videoElement')[0];

const track = videoPlayerTag.addTextTrack('captions', 'English', 'en');

track.addCue(new VTTCue(0, 60, '[Test]'));
track.addCue(new VTTCue(60, 600, '[Test]1'));
track.addCue(new VTTCue(600, 6000, '[Test]2'));
track.addCue(new VTTCue(6000, 60000, '[Test]3'));

console.log(videoPlayerTag);

subtitlesEmitter.on('packet', (timestamp) => {
    const subtitle = _.get(SUBTITLES, timestamp);

    subtitlesEmitter.emit('subtitle', subtitle);
});

export default subtitlesEmitter;
