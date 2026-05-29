import { Style } from "./style.js";


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
  #useLogging = false;


  constructor(interval: number)
  {
    this.#interval = interval;
    this.#startTime = Date.now();

    this.#startReapLoop();
  }


  #log(msg: any)
  {
    if (!this.#useLogging) return;
    console.log(msg);
  }


  add<T>(key: string, val: T)
  {
    const entry =
    {
      createdAt: Date.now(),
      val: val,
    }

    const offset = Date.now() - this.#startTime;
    const message = `*** Setting key [ ${key} ] with value [ ${val} ] | Time offset: ${offset}`;
    const styled = Style.Go("gray", Style.Go("italic", message));
    this.#log(styled);

    this.#cache.set(key, entry);
  }


  get<T>(key: string): T | undefined
  {
    const offset = Date.now() - this.#startTime;
    const message = `*** Getting key [ ${key} ] | Time offset: ${offset}`;
    const styled = Style.Go("gray", Style.Go("italic", message));
    this.#log(styled);

    const entry = this.#cache.get(key);

    if (entry)
    {
      this.#log(Style.Go("gray", Style.Go("italic", Style.Go("bold", "***** Cache hit"))));
      return entry.val;
    }
    
    this.#log(Style.Go("gray", Style.Go("italic", Style.Go("bold", "***** Cache miss"))));
    return undefined;
    // return entry ? entry.val : undefined;
  }


  #reap()
  {
    if (this.#cache.size <= 0) return;

    const now = Date.now();

    const entries = [...this.#cache.entries()];
    this.#cache = new Map(entries.filter(([k, val], i) => now - val.createdAt < this.#interval));
    this.#startTime = now;
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
