import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig){
    console.log('addPending', config);
  }
  removePending(config: InternalAxiosRequestConfig){
    console.log('removePending', config);
  }
}
