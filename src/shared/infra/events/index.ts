import EventEmitter from 'events'

class SingletonEvents {
  private static instance: EventEmitter.EventEmitter;

  private constructor () { }

  public static getInstance (): EventEmitter.EventEmitter {
    if (!SingletonEvents.instance) {
      SingletonEvents.instance = new EventEmitter.EventEmitter()
    }

    return SingletonEvents.instance
  }
}

export default SingletonEvents
