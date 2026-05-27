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
  #startTime: TimeStamp;


  constructor(interval: number)
  {
    this.#interval = interval;
    this.#startTime = Date.now();

    this.#startReapLoop();
  }


  add<T>(key: string, val: T)
  {
    const entry =
    {
      createdAt: Date.now(),
      val: val,
    }

    const offset = Date.now() - this.#startTime;
    console.log(`*** Setting key [ ${key} ] with value [ ${val} ] | Time offset: ${offset}`);

    this.#cache.set(key, entry);
  }


  get<T>(key: string)
  {
    const offset = Date.now() - this.#startTime;
    console.log(`*** Getting key [ ${key} ] | Time offset: ${offset}`);

    const entry = this.#cache.get(key);

    if (entry)
    {
      console.log("***** Cache hit");
      return entry.val;
    }
    
    console.log("***** Cache miss");
    return undefined;
    // return entry ? entry.val : undefined;
  }


  #reap()
  {
    if (this.#cache.size <= 0) return;

    const now = Date.now();

    const entries = [...this.#cache.entries()];
    this.#cache = new Map(entries.filter(([k, val], i) => now - val.createdAt < this.#interval));
  }


  #startReapLoop()
  {
    this.#reapIntervalId = setInterval(() => { this.#reap() }, this.#interval);
  }


  stopReapLoop()
  {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
