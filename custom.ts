/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="" block="AI Gestures"
namespace gesture_palooza {
    let sending_data = false;
    let start_time = 0;
    const timeoutSec = 60;

    /**
     * Indicate that a gesture was performed
     * @param gesture The gesture that was performed
     */
    //% blockId=ai_gestures_send_gesture
    export function send_gesture(gesture: string): void {
        if (sending_data) {
            radio.sendString(gesture)
            music.play(music.stringPlayable("C C5 - - - - - - ", 320), music.PlaybackMode.InBackground)
        }
    }

    /**
     * Begin sending data to the reciever for one minute!
     */
    //% blockId=ai_gestures_start_sending_data
    //% block="start timer"
    export function start_recording() {
        if (sending_data) return;
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showNumber(3)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showNumber(2)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showNumber(1)
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Yes)
        start_time = input.runningTime()
        sending_data = true;
    }

    loops.everyInterval(1000, function() {
        if (sending_data && input.runningTime() - start_time > (timeoutSec * 1000)) {
            sending_data = false;
            music.play(music.tonePlayable(440, 1000), music.PlaybackMode.InBackground)
            basic.showIcon(IconNames.No);
        }
    })
}
