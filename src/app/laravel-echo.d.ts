declare module 'laravel-echo' {
    class Echo {
      constructor(options: any);
      channel(channelName: string): any;
      listen(event: string, callback: Function): void;
    }
  
    export default Echo;
  }
  