import * as EventEmitter from 'wolfy87-eventemitter';

class SubtitlesEmitter extends EventEmitter {}

const subtitlesEmitter = new SubtitlesEmitter();

subtitlesEmitter.on('packet', (timestamp) => {
    const subtitle = 'TEST SUBTITLE.';

    subtitlesEmitter.emit('subtitle', subtitle);
});

export default subtitlesEmitter;
