import { useState } from 'react';
import { AbsoluteOrientationSensor } from 'motion-sensors-polyfill'
import qte from 'quaternion-to-euler'

export const useCompass = () => {
    const [alpha, setAlpha] = useState("");

    const options = { frequency: 60, referenceFrame: 'device' };
    const sensor = new AbsoluteOrientationSensor(options);
    sensor.onreading = () => setAlpha(qte(sensor.quaternion)[0] / (2 * Math.PI) * 360);
    sensor.start();
    return alpha
}

export default useCompass