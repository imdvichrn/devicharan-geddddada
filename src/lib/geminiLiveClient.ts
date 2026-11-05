/**
 * Client-Side Gemini Live API WebSocket Bridge
 *
 * Connects to the server-side WebSocket proxy at /api/live.
 * All Gemini Live API calls run securely on the server.
 */

export interface LiveClientCallbacks {
  onAudioData: (base64PcmAudio: string) => void;
  onInterrupted?: () => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private callbacks: LiveClientCallbacks;

  constructor(callbacks: LiveClientCallbacks) {
    this.callbacks = callbacks;
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/api/live`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.audio) {
              this.callbacks.onAudioData(data.audio);
            }
            if (data.interrupted && this.callbacks.onInterrupted) {
              this.callbacks.onInterrupted();
            }
            if (data.error && this.callbacks.onError) {
              this.callbacks.onError(data.error);
            }
          } catch (e) {
            console.warn('Error parsing Live server message:', e);
          }
        };

        this.ws.onerror = (e) => {
          if (this.callbacks.onError) {
            this.callbacks.onError('WebSocket connection error');
          }
          reject(e);
        };

        this.ws.onclose = () => {
          if (this.callbacks.onClose) {
            this.callbacks.onClose();
          }
        };
      } catch (err: any) {
        reject(err);
      }
    });
  }

  public sendAudioChunk(base64PcmAudio: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ audio: base64PcmAudio }));
    }
  }

  public disconnect(): void {
    if (this.ws) {
      try {
        this.ws.close();
      } catch {}
      this.ws = null;
    }
  }
}
