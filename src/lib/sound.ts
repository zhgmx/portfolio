import { setEnabled } from 'cuelume';

const storageKey = 'cuelume-enabled';

export function readSoundEnabled(): boolean {
	try {
		return localStorage.getItem(storageKey) !== 'false';
	} catch {
		return true;
	}
}

export function setSoundEnabled(enabled: boolean): void {
	setEnabled(enabled);
	try {
		localStorage.setItem(storageKey, String(enabled));
	} catch {
		// Playback still works when browser storage is unavailable.
	}
}
