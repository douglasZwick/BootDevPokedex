type TimeStamp = number;


type CacheEntry<T> =
{
  createdAt: TimeStamp;
  val: T;
}


export class Cache
{
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;


  constructor(interval: number)
  {
    this.#interval = interval;

    this.#startReapLoop();
  }


  add<T>(key: string, val: T)
  {
    const entry =
    {
      createdAt: Date.now(),
      val: val,
    }

    this.#cache.set(key, entry);
  }


  get<T>(key: string)
  {
    if (!this.#cache.has(key))
      return undefined;

    return this.#cache.get(key);
  }


  #reap()
  {
    const now = Date.now();

    this.#cache = new Map(this.#cache.entries().filter(([k, val], i) =>
      now - val.createdAt < this.#interval));
  }


  #startReapLoop()
  {
    this.#reapIntervalId = setInterval(this.#reap, this.#interval);
  }


  stopReapLoop()
  {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
